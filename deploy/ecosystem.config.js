/**
 * PM2 Ecosystem Config for ashokmagadum.com
 *
 * Usage:
 *   pm2 start ecosystem.config.js
 *   pm2 reload ecosystem.config.js --update-env
 *   pm2 stop ashok-portfolio
 *   pm2 logs ashok-portfolio
 *   pm2 monit
 */

module.exports = {
  apps: [
    {
      name: 'ashok-portfolio',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/ashokmagadum.com',

      // Process settings
      instances: 1, // Use 'max' for multi-core if you upgrade from t2.micro
      exec_mode: 'fork', // Use 'cluster' with instances: 'max' on larger servers

      // Environment
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_PUBLIC_SITE_URL: 'https://ashokmagadum.com',
      },

      // Logging
      out_file: '/var/log/pm2/ashok-portfolio-out.log',
      error_file: '/var/log/pm2/ashok-portfolio-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,

      // Restart policy
      autorestart: true,
      watch: false, // Never watch files in production
      max_memory_restart: '400M', // Restart if memory exceeds 400MB (safe for t2.micro's 1GB)
      restart_delay: 3000,

      // Graceful shutdown
      kill_timeout: 10000, // 10 seconds to finish in-flight requests
      listen_timeout: 10000,
      shutdown_with_message: true,

      // Health & performance
      min_uptime: '10s', // Consider a restart stable if it runs 10s+
      max_restarts: 10,

      // Node.js flags for performance
      node_args: '--max-old-space-size=384', // Limit Node heap for t2.micro
    },
  ],

  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ashokmagadum.com',
      ref: 'origin/main',
      repo: 'git@github.com:YOUR_USERNAME/ashok-portfolio.git',
      path: '/var/www/ashokmagadum.com',
      'pre-deploy-local': '',
      'post-deploy':
        'nvm use 18 && npm ci && npm run build && pm2 reload ecosystem.config.js --update-env',
      'pre-setup': '',
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};
