export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  startYear: number;
  endYear: number | null;
  highlights: string[];
  description: string;
  tags: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: '1',
    title: 'VP of Product',
    company: 'KareFusionAI',
    period: '2022 – Present',
    startYear: 2022,
    endYear: null,
    description:
      'Leading product strategy for an AI-native healthcare operations platform. Defining the vision for automating clinical workflows end-to-end — from ambient voice documentation to AI-driven call center automation and predictive care management. Managing a cross-functional team across product, engineering, and clinical informatics.',
    highlights: [
      'Built voice AI platform that saves 400+ physicians 2.5 hours/day on documentation',
      'Led AI healthcare product strategy from 0→1 across 5 core product lines',
      'Delivered clinical workflow automation system deployed across 5 health systems',
      'Grew from 0 to 5M+ patient records on the FHIR integration platform',
      'Secured $12M in enterprise health system contracts in year one',
    ],
    tags: ['Voice AI', 'FHIR', 'Clinical NLP', 'Healthcare Operations', 'Platform'],
  },
  {
    id: '2',
    title: 'Senior Director, AI/ML Products',
    company: '[Enterprise Tech Company]',
    period: '2020 – 2022',
    startYear: 2020,
    endYear: 2022,
    description:
      'Built and scaled the AI/ML product practice. Owned the full product lifecycle for ML platforms, conversational AI, and enterprise data products. Partnered with the CTO to define the company-wide AI product roadmap.',
    highlights: [
      'Shipped enterprise LLM platform (0→1) to 50K+ users, achieving $45M ARR in 18 months',
      'Built conversational AI system handling 3M+ interactions/month at 91% resolution',
      'Established MLOps practice, cutting model deployment time from weeks to hours',
      'Led cross-functional AI org of 25+ PMs, engineers, and data scientists',
      'Drove AI investment roadmap, securing $30M in incremental budget',
    ],
    tags: ['LLM', 'GenAI', 'MLOps', 'Executive Leadership', 'Enterprise SaaS'],
  },
  {
    id: '3',
    title: 'Director of Product, Machine Learning',
    company: '[Consumer Tech Company]',
    period: '2018 – 2020',
    startYear: 2018,
    endYear: 2020,
    description:
      'Led ML product strategy for NLP and recommendation systems powering a core consumer product. Drove personalization and content intelligence products from beta to 2M active users.',
    highlights: [
      'Grew ML-powered product from private beta to 2M monthly active users',
      'Shipped NLP features used by 500K+ daily active users',
      'Launched personalization engine increasing session length 34% and retention 18%',
      'Defined the company\'s first AI ethics and responsible AI framework',
      'Built and mentored ML PM team from 2 to 8 product managers',
    ],
    tags: ['NLP', 'Recommendations', 'Personalization', 'Consumer AI', 'AI Ethics'],
  },
  {
    id: '4',
    title: 'Senior Product Manager',
    company: '[SaaS Company]',
    period: '2015 – 2018',
    startYear: 2015,
    endYear: 2018,
    description:
      'First PM for data and analytics products. Defined the product strategy for business intelligence, data platform, and early AI-powered features across enterprise customers.',
    highlights: [
      'First PM for data products, building the vision from scratch',
      'Launched self-serve analytics platform used by 1,000+ enterprise customers',
      'Shipped conversational AI features driving 40% improvement in task completion',
      'Defined data product pricing model that became a $20M revenue line',
      'Led team of 4 PMs through 3 major releases with zero schedule slippage',
    ],
    tags: ['Data Products', 'Analytics', 'B2B SaaS', 'Platform', 'Enterprise'],
  },
  {
    id: '5',
    title: 'Product Manager',
    company: '[Mobile Startup]',
    period: '2013 – 2015',
    startYear: 2013,
    endYear: 2015,
    description:
      'Early PM on mobile and ML features at a fast-growing startup. Shipped multiple 0→1 mobile features and contributed to the company\'s first machine learning integrations.',
    highlights: [
      'Early PM on mobile product, shipping 0→1 features adopted by 500K+ users',
      'Contributed to first ML-powered features: smart notifications and feed ranking',
      'Conducted 200+ user research sessions shaping the mobile product roadmap',
      'Reduced onboarding drop-off by 45% through iterative experimentation',
      'Collaborated with founding team on product-market fit positioning',
    ],
    tags: ['Mobile', 'Early Stage', 'User Research', 'ML Features', 'Growth'],
  },
];
