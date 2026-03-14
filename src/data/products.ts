export interface ProductMetrics {
  [key: string]: string;
}

export interface CaseStudy {
  context: string;
  users: string;
  hypothesis: string;
  solution: string[];
  techDetails: string;
  execution: string[];
  results: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  company: string;
  tagline: string;
  description: string;
  problem: string;
  metrics: ProductMetrics;
  techStack: string[];
  impact: string;
  year: number;
  color: string;
  caseStudy: CaseStudy;
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'voice-ai-clinical-assistant',
    name: 'Voice AI Clinical Assistant',
    category: 'Voice AI',
    company: 'KareFusionAI',
    tagline: 'AI voice agents that handle scheduling, registration, and clinical screening — with zero hold times',
    description:
      'Built a voice AI agent platform that automates the most time-consuming phone-based clinical workflows. Clinics spend 30–40% of staff time handling inbound calls for appointment scheduling, prescription refills, and patient registration. This platform handles those calls autonomously using LLM-powered intent recognition and FHIR-connected workflow automation.',
    problem:
      'Clinics spend 30–40% of staff time handling phone calls — most of which are repetitive: scheduling, prescription refills, and insurance verification. Staff burnout is high, hold times average 8 minutes, and after-hours calls go unanswered.',
    metrics: {
      'Call Automation': '72% of calls handled autonomously',
      'Admin Time Saved': '35% reduction in administrative workload',
      'Patient Satisfaction': '4.7/5 CSAT score',
      'Hold Time': 'Average hold time: 0 seconds',
    },
    techStack: ['LLM Orchestration', 'Whisper STT', 'FHIR R4 APIs', 'Twilio', 'LangChain', 'AWS'],
    impact: 'Reduced administrative workload by 35% across 5 health systems, with zero missed after-hours calls',
    year: 2023,
    color: '#1e40af',
    caseStudy: {
      context:
        'Community health clinics and mid-size hospital systems. Primary users: front-desk staff burdened with inbound call volume, and patients frustrated by long hold times and limited after-hours access.',
      users:
        'Front-desk clinical staff (primary), patients calling for scheduling and prescription needs (end users), clinic administrators measuring operational efficiency (buyers).',
      hypothesis:
        'If we can automate 60%+ of inbound call volume with a voice AI agent that integrates directly into existing EMR scheduling systems via FHIR APIs, we can reduce staff workload materially while improving patient access — without replacing human agents for complex calls.',
      solution: [
        'Voice AI agent with natural language understanding for healthcare-specific intents (scheduling, refills, registration, screening)',
        'FHIR R4 integration layer connecting to major EMRs (Epic, Cerner, Athena) for real-time slot availability and patient data',
        'Intelligent escalation logic routing complex calls to human agents with full conversation context',
        'After-hours autonomous handling with callback scheduling and urgent triage routing',
        'Clinic-configurable workflow rules and persona branding per practice',
      ],
      techDetails:
        'Whisper for speech-to-text → custom intent classifier fine-tuned on clinical call transcripts → LLM orchestration layer (LangChain) → FHIR API calls → TTS response generation → Twilio telephony infrastructure. Average end-to-end latency: 1.4 seconds.',
      execution: [
        'Conducted 40+ shadowing sessions with front-desk staff to map the 12 most common call types',
        'Built intent taxonomy covering 87 distinct clinical call intents across 4 specialties',
        'Ran 3-month pilot with 2 clinics before full rollout, iterating on escalation thresholds',
        'Developed HIPAA-compliant conversation logging and audit trail for compliance review',
        'Launched rollout playbook enabling 2-week implementation per clinic',
      ],
      results: [
        '72% of inbound calls handled autonomously within 6 months of launch',
        '35% reduction in front-desk administrative workload',
        'Average patient hold time dropped from 8 minutes to 0 seconds for automated call types',
        '4.7/5 patient satisfaction score on voice agent interactions',
        'Deployed across 5 health systems covering 200+ clinic locations',
        '$2.1M annualized cost savings across deployed clinics',
      ],
    },
  },
  {
    id: '2',
    slug: 'ai-emr-workflow-automation',
    name: 'AI EMR Workflow Automation',
    category: 'Clinical AI',
    company: 'KareFusionAI',
    tagline: 'Converts physician conversations into structured EMR records in real time — saving 2+ hours per doctor per day',
    description:
      'An ambient AI documentation system that listens to physician-patient encounters and automatically generates structured clinical notes, orders, and billing codes in the EMR. Physicians review and approve rather than type, reducing documentation time by 70% and cutting after-hours chart work entirely.',
    problem:
      'Physicians spend 2–3 hours per day on documentation after patient visits — a leading driver of burnout. Manual note-taking introduces inconsistency, missed billing codes, and compliance gaps.',
    metrics: {
      'Time Saved': '2.5 hrs/day per physician',
      'Note Accuracy': '94% note accuracy vs. manual baseline',
      'Billing Capture': '18% improvement in CPT code capture',
      'Physician NPS': 'Net Promoter Score: 72',
    },
    techStack: ['Whisper', 'GPT-4 fine-tuned', 'FHIR R4', 'Clinical NLP', 'HL7', 'Epic SMART App'],
    impact: 'Saved 400+ physicians 2.5 hours/day on documentation, virtually eliminating after-hours charting',
    year: 2023,
    color: '#059669',
    caseStudy: {
      context:
        'Physicians at community hospitals and large health systems spending 35–40% of their working hours on EHR documentation. Most acute in primary care and internal medicine.',
      users:
        'Physicians and NPs (primary users), medical coders validating billing accuracy (downstream users), Chief Medical Officers focused on burnout reduction and revenue cycle optimization (buyers).',
      hypothesis:
        'If we deploy an ambient AI that captures clinical conversations and structures them into specialty-specific note formats with one-click physician approval, we can reduce documentation time by 70%+ while improving note completeness and billing capture.',
      solution: [
        'Ambient microphone integration capturing physician-patient conversations with HIPAA-compliant processing',
        'Specialty-specific note templates (SOAP, H&P, procedure notes) generated by fine-tuned clinical LLM',
        'Automated ICD-10 and CPT code suggestion based on documented findings and procedures',
        'One-click review and approval interface embedded as an Epic SMART on FHIR app',
        'Discrepancy flagging for notes that deviate from specialty documentation standards',
      ],
      techDetails:
        'Whisper large-v3 for medical-grade transcription → clinical NLP pipeline for entity extraction (diagnoses, medications, procedures) → GPT-4 fine-tuned on 50K de-identified clinical notes → FHIR R4 DocumentReference API for EMR write-back → Epic SMART on FHIR for the physician review UI.',
      execution: [
        'Partnered with 12 physicians across 3 specialties during 6-week co-design process',
        'Built specialty-specific note templates with clinical advisors for primary care, internal medicine, and orthopedics',
        'Implemented de-identification pipeline meeting HIPAA Safe Harbor and Expert Determination standards',
        'Ran accuracy benchmarking against manually-authored notes with physician panel review',
        'Designed incremental trust-building rollout: observation mode → suggestion mode → auto-draft mode',
      ],
      results: [
        '2.5 hours per day saved per physician on average across 400+ deployed users',
        '94% note accuracy compared to manually-authored baseline (physician panel review)',
        '18% improvement in CPT code capture rate, directly improving revenue cycle',
        'After-hours charting reduced to near zero for enrolled physicians',
        'Physician NPS of 72, with 89% saying they would not return to manual documentation',
        'Deployed across 3 health systems with Epic and Cerner EMR integrations',
      ],
    },
  },
  {
    id: '3',
    slug: 'fhir-integration-platform',
    name: 'FHIR Integration Platform',
    category: 'Healthcare Interoperability',
    company: 'KareFusionAI',
    tagline: 'Universal healthcare data layer connecting 5M+ patient records across fragmented EMR systems',
    description:
      'A production-grade FHIR R4 integration platform that normalizes patient data across Epic, Cerner, Athena, and 20+ other EMR systems into a unified data model. Serves as the foundational data infrastructure for all AI products on the platform.',
    problem:
      'Healthcare data is fragmented across dozens of incompatible EMR systems. Building AI products that require patient context requires a custom integration for every health system — making each AI product expensive and slow to deploy.',
    metrics: {
      'Patient Records': '5M+ patient records integrated',
      'EMR Integrations': '20+ EMR systems connected',
      'API Uptime': '99.97% uptime SLA',
      'Query Speed': '<200ms average query time',
    },
    techStack: ['FHIR R4', 'SMART on FHIR', 'HL7v2', 'Node.js', 'PostgreSQL', 'AWS', 'OAuth 2.0'],
    impact: 'Became the data backbone for 4 AI products, reducing new integration time from 3 months to 2 weeks',
    year: 2022,
    color: '#7c3aed',
    caseStudy: {
      context:
        'Healthcare AI startups and digital health companies building clinical tools. The lack of a unified patient data layer forces every AI product team to build their own EMR integration from scratch — a costly, slow, compliance-heavy process.',
      users:
        'Internal AI product teams at KareFusionAI (primary users building on the platform), health system IT departments (integration partners), clinical applications needing real-time patient context.',
      hypothesis:
        'If we build a shared FHIR abstraction layer that normalizes data from all major EMRs into a single API contract, every AI product we build can deploy to any health system in 2 weeks instead of 3 months — and our competitive moat is the depth and quality of that data layer.',
      solution: [
        'Unified FHIR R4 API surface normalizing data from Epic, Cerner, Athena, and 17 additional EMRs',
        'SMART on FHIR authentication supporting all major OAuth 2.0 grant flows for health system SSO',
        'HL7v2 legacy bridge for health systems not yet on FHIR-native APIs',
        'Clinical data normalization layer mapping vendor-specific codes to SNOMED, LOINC, and RxNorm',
        'HIPAA-compliant audit logging and consent management for every data access event',
      ],
      techDetails:
        'Node.js FHIR server (HAPI FHIR-compatible) → EMR-specific adapter layer per vendor → PostgreSQL normalized data store → Redis caching for high-frequency patient lookups → AWS PrivateLink for health system connectivity → automated FHIR conformance testing pipeline.',
      execution: [
        'Led FHIR implementation working group with 4 health system IT teams and Epic/Cerner integration experts',
        'Built conformance test suite covering 200+ FHIR resource types and interaction patterns',
        'Implemented phased rollout: HL7v2 bridge first (legacy systems) → FHIR R4 native → SMART on FHIR',
        'Established shared security review process with each health system CISO and compliance team',
        'Developed health system onboarding playbook reducing integration time from 12 weeks to 2 weeks',
      ],
      results: [
        '5M+ patient records accessible via unified API across 20+ EMR integrations',
        'New health system onboarding reduced from 3 months to 2 weeks',
        '99.97% API uptime with <200ms average query latency',
        'Became the foundational data layer for all 4 AI products in the platform',
        'Passed SOC 2 Type II and HIPAA security audits with zero findings',
        'Enabled $12M in enterprise health system contracts by eliminating integration as a sales blocker',
      ],
    },
  },
  {
    id: '4',
    slug: 'healthcare-ai-data-platform',
    name: 'Healthcare AI Data Platform',
    category: 'ML / Population Health',
    company: 'KareFusionAI',
    tagline: 'Identifies at-risk patients before they become high-cost cases — reducing readmissions by 28%',
    description:
      'An ML-powered population health platform that ingests claims, EHR, and social determinants of health data to predict patient risk, surface care gaps, and enable proactive outreach. Deployed by health systems and ACOs to reduce avoidable hospitalizations under value-based care contracts.',
    problem:
      'Health systems under value-based care contracts need to identify and intervene with high-risk patients before hospitalization — but lack the data infrastructure and predictive models to act proactively. Reactive care is the default because risk is invisible until a claim is filed.',
    metrics: {
      'Patients Monitored': '500K+ patients under active monitoring',
      'Readmission Reduction': '28% reduction in 30-day readmissions',
      'Care Gap Closure': '41% improvement in care gap closure rate',
      'Annual Savings': '$4.2M savings per 100K patients',
    },
    techStack: ['Python', 'XGBoost', 'Apache Spark', 'Snowflake', 'dbt', 'AWS SageMaker', 'Tableau'],
    impact: 'Reduced 30-day readmissions by 28% and generated $4.2M in annual savings per 100K patients',
    year: 2022,
    color: '#0891b2',
    caseStudy: {
      context:
        'Accountable Care Organizations (ACOs) and health systems under value-based care contracts where financial performance is tied to population health outcomes. Care management teams are under-resourced and lack tools to prioritize patient outreach.',
      users:
        'Care coordinators and case managers (daily users), population health directors (strategic users), health system CFOs measuring ROI on care management programs (buyers).',
      hypothesis:
        'If we combine claims, EHR, and SDOH signals into a unified ML risk model, care teams can prioritize outreach to the top 5% of high-risk patients who account for 50%+ of total costs — and intervene before hospitalization rather than managing after the fact.',
      solution: [
        'Multi-source data ingestion: claims, EHR (FHIR), pharmacy, lab results, and SDOH datasets',
        'Ensemble ML model (XGBoost + logistic regression) for 30-day readmission and ED utilization risk scoring',
        'Care gap detection engine surfacing missing preventive care (screenings, vaccinations, chronic disease management)',
        'Care coordinator workbench: prioritized patient lists, outreach task management, and intervention tracking',
        'Automated patient outreach via SMS and IVR for appointment reminders and care gap closure',
      ],
      techDetails:
        'Apache Spark on AWS EMR for large-scale data processing → dbt for data transformation and lineage → Snowflake as the clinical data warehouse → SageMaker for model training and batch inference → custom React care coordinator workbench → Tableau dashboards for population health analytics.',
      execution: [
        'Ran 12-week discovery with 3 ACO care management teams to map current workflow and data gaps',
        'Built model validation framework with clinical advisors to ensure risk scores are clinically meaningful',
        'Implemented iterative model improvement loop: care team feedback → label refinement → monthly retraining',
        'Designed tiered intervention protocol: high-risk (care coordinator call) → medium-risk (automated outreach) → low-risk (portal nudge)',
        'Developed ROI reporting module for health system finance teams to quantify impact on value-based care contracts',
      ],
      results: [
        '28% reduction in 30-day hospital readmissions for actively managed patient population',
        '41% improvement in care gap closure rate for preventive screenings',
        '500K+ patients under active risk monitoring across 3 ACO deployments',
        '$4.2M in annual cost savings per 100K managed patients',
        'Care coordinator productivity improved 3x through prioritized worklist vs. manual chart review',
        'Health system achieved top-quartile quality metrics for CMS Star Ratings program',
      ],
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
