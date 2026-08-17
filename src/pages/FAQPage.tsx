import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'How long does a typical web design and development project take?',
    a: 'Standard web applications take 4–8 weeks. Simple landing pages can be delivered in 2 weeks. Complex enterprise systems with custom APIs, CMS integration, and extensive copywriting can take 12+ weeks. We always provide a fixed timeline at the start.',
  },
  {
    q: 'Do you offer hourly rates or fixed project pricing?',
    a: 'We prefer fixed, value-based pricing for clearly scoped projects. This protects your budget and aligns both parties toward quality results. For ongoing optimization or monthly retainers, we offer flexible hourly packages.',
  },
  {
    q: 'What does post-launch maintenance and support look like?',
    a: 'Every project ships with 30 days of complimentary support. After that, we offer Growth & Maintenance retainer plans covering uptime monitoring, performance tuning, security patches, minor content edits, and automated backup schedules.',
  },
  {
    q: 'Can you redesign our existing brand identity and marketing materials?',
    a: 'Yes — our design team handles complete brand transformations: custom logo systems, UI/UX wireframes, digital and print asset kits, investor decks, and motion graphics. We ensure full consistency across digital and physical touchpoints.',
  },
  {
    q: 'How do you guarantee 60fps on heavy Three.js / WebGL websites?',
    a: 'We use advanced rendering optimisations: geometry caching, compiled custom shaders, capped device pixel ratios (DPR ≤ 1.5), viewport-based render pausing (pauses when out of view), and CSS for all structural layout animations — keeping GPU and CPU overhead minimal.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Absolutely. Bytehawk is fully remote-native and operates across all time zones. We have active clients in the US, UK, UAE, Singapore, and Australia. All communication, delivery, and invoicing is handled digitally with zero friction.',
  },
  {
    q: 'What CRM platforms do you integrate with?',
    a: 'We integrate with Salesforce, HubSpot, Zoho CRM, Monday.com, Pipedrive, Airtable, and more via native APIs or Zapier/Make automation bridges. If you use a custom database, we can build direct webhook integrations.',
  },
];

export default function FAQPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '55px' }}>
          <span className="section-label">Questions & Answers</span>
          <h1 className="section-title text-gradient-white">Frequently Asked Questions</h1>
          <p className="section-desc" style={{ margin: '0 auto', maxWidth: '520px' }}>
            Clear answers to the most common questions about working with Bytehawk.
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

        {/* Bottom CTA */}
        <div className="glass-card-strong" style={{ marginTop: '50px', padding: '36px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-white)', marginBottom: '10px' }}>
            Still have questions?
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            Our team is available to answer any questions not covered above.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:hello@bytehawk.io" className="btn btn-primary">Email Us Directly</a>
            <a href="/contact" className="btn btn-glass">Open Contact Page</a>
          </div>
        </div>
      </div>
    </section>
  );
}
