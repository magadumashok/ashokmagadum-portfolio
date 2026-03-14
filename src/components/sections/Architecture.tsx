'use client';

import { useEffect, useRef, useState } from 'react';

const architectures = [
  {
    title: 'Voice AI Agent Architecture',
    subtitle: 'How autonomous voice agents handle clinical phone calls end-to-end',
    color: '#1e40af',
    steps: [
      { label: 'Incoming Patient Call', icon: '📞', note: 'Twilio telephony — PSTN / VoIP' },
      { label: 'Speech Recognition', icon: '🎙️', note: 'Whisper STT — medical vocabulary fine-tuned' },
      { label: 'Intent Detection', icon: '🧠', note: 'Fine-tuned LLM — 87 clinical call intents' },
      { label: 'Workflow Engine', icon: '⚙️', note: 'Scheduling, refills, registration logic' },
      { label: 'FHIR API Layer', icon: '🔗', note: 'Real-time EMR data read/write' },
      { label: 'EMR System', icon: '🏥', note: 'Epic · Cerner · Athena' },
    ],
  },
  {
    title: 'Ambient Documentation Architecture',
    subtitle: 'From physician conversation to structured EMR note in real time',
    color: '#059669',
    steps: [
      { label: 'Physician-Patient Encounter', icon: '👨‍⚕️', note: 'Ambient microphone — HIPAA-compliant capture' },
      { label: 'Medical Transcription', icon: '📝', note: 'Whisper large-v3 — medical acoustic model' },
      { label: 'Clinical NLP Pipeline', icon: '🔬', note: 'Entity extraction: Dx · Rx · procedures' },
      { label: 'LLM Note Generation', icon: '🤖', note: 'GPT-4 fine-tuned on 50K clinical notes' },
      { label: 'Physician Review UI', icon: '✅', note: 'SMART on FHIR — one-click approval' },
      { label: 'EMR Write-back', icon: '💾', note: 'FHIR R4 DocumentReference API' },
    ],
  },
  {
    title: 'FHIR Integration Platform',
    subtitle: 'Normalizing fragmented healthcare data into a unified AI-ready layer',
    color: '#7c3aed',
    steps: [
      { label: 'Health System EMRs', icon: '🏥', note: 'Epic · Cerner · Athena · 17 others' },
      { label: 'HL7v2 / FHIR Adapters', icon: '🔌', note: 'Per-vendor normalization layer' },
      { label: 'FHIR R4 API Server', icon: '🌐', note: 'HAPI FHIR-compatible · OAuth 2.0' },
      { label: 'Clinical Data Store', icon: '🗄️', note: 'PostgreSQL + SNOMED / LOINC mapping' },
      { label: 'AI Product APIs', icon: '⚡', note: 'Voice AI · Docs AI · Population Health' },
      { label: 'Clinical Applications', icon: '📱', note: 'Web + mobile + EHR-embedded' },
    ],
  },
];

export default function Architecture() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const active = architectures[openIndex];

  return (
    <section
      id="architecture"
      ref={sectionRef}
      className="py-28 bg-white"
      style={{ borderBottom: '1px solid #e2e8f0' }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#c9a227' }}>
            Product Architecture
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#0f172a' }}>
            How the AI Systems Work
          </h2>
          <p className="text-base text-slate-500 mb-10 max-w-xl">
            Technical product leaders think in systems. Here&apos;s how each platform is architected — from data input to clinical outcome.
          </p>

          {/* Tab selector */}
          <div className="flex flex-wrap gap-2 mb-10">
            {architectures.map((arch, i) => (
              <button
                key={arch.title}
                onClick={() => setOpenIndex(i)}
                className="px-4 py-2 text-sm rounded-lg transition-all duration-200 font-medium"
                style={
                  openIndex === i
                    ? { backgroundColor: arch.color, color: '#fff' }
                    : { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: '#64748b' }
                }
                onMouseEnter={(e) => { if (openIndex !== i) (e.currentTarget as HTMLButtonElement).style.borderColor = '#cbd5e1'; }}
                onMouseLeave={(e) => { if (openIndex !== i) (e.currentTarget as HTMLButtonElement).style.borderColor = '#e2e8f0'; }}
              >
                {arch.title.split(' ').slice(0, 3).join(' ')}
              </button>
            ))}
          </div>

          {/* Diagram */}
          <div
            className="rounded-2xl p-8"
            style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}
          >
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-1" style={{ color: '#0f172a' }}>{active.title}</h3>
              <p className="text-sm text-slate-500">{active.subtitle}</p>
            </div>

            <div className="space-y-2">
              {active.steps.map((step, i) => (
                <div key={step.label} className="flex items-stretch gap-4">
                  <div className="flex flex-col items-center" style={{ width: 28 }}>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                      style={{ backgroundColor: active.color }}
                    >
                      {i + 1}
                    </div>
                    {i < active.steps.length - 1 && (
                      <div className="w-px flex-1 mt-1" style={{ backgroundColor: `${active.color}30`, minHeight: 12 }} />
                    )}
                  </div>

                  <div
                    className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl mb-2 bg-white border border-slate-200"
                  >
                    <span className="text-lg flex-shrink-0">{step.icon}</span>
                    <div>
                      <span className="text-sm font-semibold text-slate-800">{step.label}</span>
                      <span className="text-xs text-slate-400 ml-2">— {step.note}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: active.color }} />
              <span className="text-xs font-mono text-slate-400">end-to-end latency: ~1–2 seconds</span>
            </div>
          </div>

          <div
            className="mt-5 p-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500 leading-relaxed"
          >
            <span className="font-semibold text-slate-700">Why I include this section: </span>
            Senior AI PM roles require fluency in the technical architecture of the products you own. I can speak to system design tradeoffs, model selection rationale, integration patterns, and performance constraints — not just user stories.
          </div>

        </div>
      </div>
    </section>
  );
}
