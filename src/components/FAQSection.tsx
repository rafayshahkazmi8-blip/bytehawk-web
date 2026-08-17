import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'How long does a typical web design project take?',
    a: 'Standard web apps take 4–8 weeks. Simple landing pages can be delivered in 2 weeks. Complex enterprise systems can take 12+ weeks. We always lock in a fixed timeline at the start.',
  },
  {
    q: 'Do you offer fixed pricing or hourly rates?',
    a: 'We prefer fixed, value-based pricing for clearly scoped projects — protects your budget and aligns us toward quality. For ongoing optimization or retainers, we offer flexible hourly packages.',
  },
  {
    q: 'What does post-launch maintenance look like?',
    a: 'Every project ships with 30 days of complimentary support. After that, Growth & Maintenance retainer plans cover uptime monitoring, security patches, performance tuning, and content edits.',
  },
  {
    q: 'How do you guarantee 60fps on heavy Three.js websites?',
    a: 'We use geometry caching, custom shaders, capped DPR (≤1.5), viewport-based render pausing, and CSS for structural animations — keeping both GPU and CPU overhead minimal at all times.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Absolutely. Bytehawk is fully remote-native across all time zones — active clients in the US, UK, UAE, Singapore, and Australia. All communication, delivery, and invoicing is handled digitally.',
  },
  {
    q: 'What CRM platforms do you integrate with?',
    a: 'Salesforce, HubSpot, Zoho CRM, Monday.com, Pipedrive, Airtable, and more via native APIs or Zapier/Make bridges. Custom database? We can build direct webhook integrations.',
  },
];

export default function FAQSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section style={{ padding: '100px 8%', position: 'relative' }}>
      <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)', marginBottom: '80px' }} />

      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <span className="section-label">Questions & Answers</span>
          <h2 className="section-title text-gradient-white">Frequently Asked Questions</h2>
          <p className="section-desc" style={{ margin: '0 auto', maxWidth: '500px' }}>
            Clear, honest answers to the most common questions about working with Bytehawk.
          </p>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className="faq-trigger" onClick={() => setActive(active === i ? null : i)}>
                <span>{faq.q}</span>
                <div className="faq-icon">
                  {active === i ? <Minus size={14} /> : <Plus size={14} />}
                </div>
              </button>
              <div className={`faq-panel ${active === i ? 'open' : ''}`}>
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
