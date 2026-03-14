'use client';

import { useEffect, useRef, useState } from 'react';

const skillGroups = [
  {
    label: 'AI / Healthcare',
    skills: [
      'LLM Orchestration',
      'Voice AI Agents',
      'Clinical NLP',
      'FHIR R4 / HL7',
      'RAG Systems',
      'AI Safety & Governance',
      'HIPAA Compliance',
      'Epic & Cerner APIs',
    ],
  },
  {
    label: 'Product Management',
    skills: [
      '0→1 Product Building',
      'B2B SaaS',
      'OKR Setting',
      'Go-to-Market',
      'Pricing Strategy',
      'Platform Products',
      'User Research',
      'Value-Based Care',
    ],
  },
  {
    label: 'Technical',
    skills: [
      'Python',
      'SQL',
      'REST & FHIR APIs',
      'Vector Databases',
      'MLOps',
      'AWS / GCP',
      'Whisper / GPT-4',
      'LangChain',
    ],
  },
  {
    label: 'Leadership',
    skills: [
      'Cross-functional Teams',
      'P&L Ownership',
      'Executive Stakeholders',
      'Team Building (30+)',
      'Clinical Advisors',
      'Health System Sales',
      'Board Reporting',
      'Fundraising Narrative',
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">Expertise</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-10">
            Skills & Capabilities
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm text-slate-700 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
