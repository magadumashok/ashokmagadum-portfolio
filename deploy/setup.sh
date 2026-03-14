#!/usr/bin/env bash
# =============================================================================
# setup.sh — Deploy ashokmagadum.com on Ubuntu 22.04 EC2 (t2.micro)
#
# Run as: bash setup.sh
#
# What it does:
#   1. Updates system packages
#   2. Installs Node.js 18 LTS via nvm
#   3. Installs PM2 globally
#   4. Installs and configures Nginx
#   5. Creates the app directory and copies files
#   6. Installs dependencies and builds the Next.js app
#   7. Starts the app with PM2
#   8. Configures Nginx as reverse proxy
#   9. Sets up SSL via Certbot (Let's Encrypt)
#   10. Enables PM2 on system startup
# =============================================================================

set -euo pipefail

# ─── Variables ────────────────────────────────────────────────────────────────
DOMAIN="ashokmagadum.com"
APP_DIR="/var/www/${DOMAIN}"
NGINX_CONF="/etc/nginx/sites-available/${DOMAIN}"
NODE_VERSION="18"
NVM_VERSION="v0.39.7"
LOG_FILE="/var/log/portfolio-setup.log"
PM2_LOG_DIR="/var/log/pm2"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ─── Helper functions ──────────────────────────────────────────────────────────
log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
    exit 1
}

step() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}  STEP: $1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

# ─── Pre-flight checks ─────────────────────────────────────────────────────────
if [ "$EUID" -ne 0 ]; then
    error "Please run as root: sudo bash setup.sh"
fi

log "Starting deployment of ${DOMAIN}"
mkdir -p "$(dirname "$LOG_FILE")"
touch "$LOG_FILE"

# ─── Step 1: System update ────────────────────────────────────────────────────
step "1 — Updating system packages"
apt-get update -y
apt-get upgrade -y
apt-get install -y \
    curl \
    wget \
    git \
    unzip \
    build-essential \
    software-properties-common \
    ufw \
    fail2ban
log "System packages updated."

# ─── Step 2: Install nvm + Node.js 18 LTS ────────────────────────────────────
step "2 — Installing nvm and Node.js ${NODE_VERSION} LTS"

# Install nvm for ubuntu user
sudo -u ubuntu bash << NVMEOF
    export HOME=/home/ubuntu
    curl -o- "https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh" | bash
    export NVM_DIR="\$HOME/.nvm"
    [ -s "\$NVM_DIR/nvm.sh" ] && \. "\$NVM_DIR/nvm.sh"
    nvm install ${NODE_VERSION}
    nvm use ${NODE_VERSION}
    nvm alias default ${NODE_VERSION}
    node --version
    npm --version
NVMEOF

# Add nvm to ubuntu's .bashrc if not already there
BASHRC="/home/ubuntu/.bashrc"
if ! grep -q "NVM_DIR" "$BASHRC"; then
    cat >> "$BASHRC" << 'EOF'

# NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
EOF
fi

log "Node.js ${NODE_VERSION} LTS installed via nvm."

# ─── Step 3: Install PM2 ──────────────────────────────────────────────────────
step "3 — Installing PM2"
sudo -u ubuntu bash -c '
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    npm install -g pm2
    pm2 --version
'
mkdir -p "$PM2_LOG_DIR"
chown ubuntu:ubuntu "$PM2_LOG_DIR"
log "PM2 installed."

# ─── Step 4: Install and configure Nginx ─────────────────────────────────────
step "4 — Installing Nginx"
apt-get install -y nginx
systemctl enable nginx
systemctl start nginx
log "Nginx installed and started."

# ─── Step 5: Configure firewall ──────────────────────────────────────────────
step "5 — Configuring UFW firewall"
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable
ufw status
log "UFW firewall configured."

# ─── Step 6: Configure fail2ban ──────────────────────────────────────────────
step "6 — Configuring fail2ban"
systemctl enable fail2ban
systemctl start fail2ban
log "fail2ban configured."

# ─── Step 7: Create app directory and copy files ─────────────────────────────
step "7 — Setting up application directory"
mkdir -p "$APP_DIR"
chown -R ubuntu:ubuntu "$APP_DIR"

# Option A: If running this script from within the repo directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"

if [ -f "${REPO_ROOT}/package.json" ]; then
    log "Copying files from ${REPO_ROOT} to ${APP_DIR}"
    rsync -av --exclude='.git' --exclude='node_modules' --exclude='.next' \
        "${REPO_ROOT}/" "${APP_DIR}/"
else
    # Option B: Clone from git (update URL before running)
    warn "No local repo found. Cloning from git..."
    # UPDATE THIS URL:
    GIT_REPO="https://github.com/YOUR_USERNAME/ashok-portfolio.git"
    sudo -u ubuntu git clone "$GIT_REPO" "$APP_DIR"
fi

chown -R ubuntu:ubuntu "$APP_DIR"
log "Application files in place."

# ─── Step 8: Install dependencies and build ──────────────────────────────────
step "8 — Installing npm dependencies and building Next.js"
sudo -u ubuntu bash -c "
    export NVM_DIR=\"\$HOME/.nvm\"
    [ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\"
    cd ${APP_DIR}
    npm ci --production=false
    NODE_ENV=production npm run build
"
log "Next.js app built successfully."

# ─── Step 9: Start app with PM2 ──────────────────────────────────────────────
step "9 — Starting app with PM2"
sudo -u ubuntu bash -c "
    export NVM_DIR=\"\$HOME/.nvm\"
    [ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\"
    cd ${APP_DIR}
    pm2 stop ashok-portfolio 2>/dev/null || true
    pm2 start deploy/ecosystem.config.js
    pm2 save
"
log "App started with PM2."

# ─── Step 10: PM2 startup on boot ────────────────────────────────────────────
step "10 — Enabling PM2 startup on system boot"
# Generate startup script for ubuntu user
PM2_STARTUP=$(sudo -u ubuntu bash -c '
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
    pm2 startup systemd -u ubuntu --hp /home/ubuntu 2>&1 | tail -1
')
# Execute the generated command
eval "$PM2_STARTUP" || warn "PM2 startup command may need manual setup"
log "PM2 startup configured."

# ─── Step 11: Configure Nginx ────────────────────────────────────────────────
step "11 — Configuring Nginx reverse proxy"

# Copy nginx config (without SSL first, for HTTP)
cat > "$NGINX_CONF" << 'NGINXEOF'
# Temporary HTTP-only config (SSL will be added by Certbot)
upstream nextjs_app {
    server localhost:3000;
    keepalive 32;
}

limit_req_zone $binary_remote_addr zone=portfolio_limit:10m rate=20r/s;

server {
    listen 80;
    listen [::]:80;
    server_name ashokmagadum.com www.ashokmagadum.com;

    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    location /_next/static/ {
        proxy_pass http://nextjs_app;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location / {
        proxy_pass http://nextjs_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINXEOF

# Enable site
ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/${DOMAIN}"
rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
nginx -t && systemctl reload nginx
log "Nginx configured and reloaded."

# ─── Step 12: SSL with Certbot ───────────────────────────────────────────────
step "12 — Setting up SSL with Certbot (Let's Encrypt)"
apt-get install -y certbot python3-certbot-nginx

# Run Certbot (update email below)
CERTBOT_EMAIL="ashok@ashokmagadum.com"
certbot --nginx \
    -d "$DOMAIN" \
    -d "www.${DOMAIN}" \
    --non-interactive \
    --agree-tos \
    --email "$CERTBOT_EMAIL" \
    --redirect || warn "Certbot failed — DNS may not be pointed to this server yet. Run certbot manually after DNS is configured."

# Auto-renewal
systemctl enable certbot.timer
systemctl start certbot.timer
log "SSL configured (or skipped — run certbot manually if DNS isn't ready)."

# ─── Step 13: Apply full nginx config ────────────────────────────────────────
step "13 — Copying full production Nginx config"
if [ -f "${APP_DIR}/deploy/nginx.conf" ]; then
    cp "${APP_DIR}/deploy/nginx.conf" "$NGINX_CONF"
    nginx -t && systemctl reload nginx
    log "Full Nginx config applied."
else
    warn "Full nginx.conf not found. HTTP-only config remains active."
fi

# ─── Final summary ────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  Deployment Complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "  Site:          https://${DOMAIN}"
echo "  App directory: ${APP_DIR}"
echo "  Nginx config:  ${NGINX_CONF}"
echo "  PM2 logs:      ${PM2_LOG_DIR}"
echo ""
echo "  Useful commands:"
echo "    pm2 logs ashok-portfolio      # View app logs"
echo "    pm2 monit                     # Monitor app"
echo "    pm2 reload ashok-portfolio    # Zero-downtime restart"
echo "    sudo nginx -t                 # Test nginx config"
echo "    sudo certbot renew --dry-run  # Test SSL renewal"
echo ""
log "Setup script completed. Log saved to ${LOG_FILE}"
