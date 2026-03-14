export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  readTime: string;
  category: string;
  date: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'ai-agents-replace-healthcare-call-centers',
    title: 'How AI Agents Will Replace Healthcare Call Centers',
    subtitle: 'The $50B healthcare call center industry is about to be automated',
    excerpt:
      'Healthcare call centers handle 900M calls annually in the US. Most are repetitive: scheduling, prescription refills, insurance verification. AI agents can handle 70%+ of this volume today — with better patient experience, zero hold times, and a fraction of the cost. Here\'s the product architecture for making it happen.',
    readTime: '8 min read',
    category: 'Product Strategy',
    date: 'February 2025',
    tags: ['AI Agents', 'Healthcare Operations', 'Call Center', 'Automation'],
  },
  {
    id: '2',
    slug: 'building-voice-interfaces-clinical-systems',
    title: 'Building Voice Interfaces for Clinical Systems',
    subtitle: 'From ambient listening to structured EMR data in 30 seconds',
    excerpt:
      'Voice is the most natural interface for clinical documentation. But converting free-form physician conversations into structured, accurate, billable records requires more than speech-to-text. This post covers the full stack: Whisper for transcription, LLM summarization for clinical structure, FHIR APIs for EMR integration, and the accuracy validation loop that makes it production-ready.',
    readTime: '10 min read',
    category: 'Technical Architecture',
    date: 'January 2025',
    tags: ['Voice AI', 'Whisper', 'Clinical NLP', 'EMR', 'FHIR'],
  },
  {
    id: '3',
    slug: 'llm-fhir-architecture-emrs',
    title: 'LLM + FHIR Architecture for EMRs',
    subtitle: 'The technical blueprint for AI-native clinical documentation',
    excerpt:
      'FHIR is the interoperability standard for modern healthcare. LLMs are the AI layer that can finally make sense of unstructured clinical data. This post walks through how to design a production architecture that combines both: from SMART on FHIR authentication, to CDS Hooks for real-time AI recommendations, to the data normalization layer that makes cross-system AI possible.',
    readTime: '12 min read',
    category: 'Technical Architecture',
    date: 'December 2024',
    tags: ['LLM', 'FHIR', 'Healthcare API', 'EMR Integration', 'Architecture'],
  },
  {
    id: '4',
    slug: 'ai-safety-healthcare-systems',
    title: 'AI Safety in Healthcare Systems',
    subtitle: 'How to ship AI that clinicians trust and regulators approve',
    excerpt:
      'Healthcare AI fails in one of three ways: clinical inaccuracy, alert fatigue, or regulatory non-compliance. Each is a product problem, not just a model problem. This essay covers the safety frameworks, validation pipelines, and human-in-the-loop architectures that make clinical AI safe enough for production deployment in FDA-regulated and HIPAA-compliant environments.',
    readTime: '9 min read',
    category: 'AI Strategy',
    date: 'November 2024',
    tags: ['AI Safety', 'HIPAA', 'FDA', 'Clinical Validation', 'Responsible AI'],
  },
];
