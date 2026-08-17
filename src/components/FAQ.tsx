import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How long does a typical website design and development project take?",
      answer: "A standard web application or design project takes between 4 to 8 weeks. Simple landing pages can take as little as 2 weeks, while complex enterprise systems with advanced CMS integration, custom APIs, and extensive copywriting can take 12+ weeks."
    },
    {
      question: "Do you offer hourly rates or fixed project pricing?",
      answer: "We prefer fixed, value-based pricing for clearly scoped projects. This protects your budget and aligns our goals to deliver quality results rather than drag out timelines. For exploratory R&D, ongoing optimization, or monthly support, we offer hourly retainers."
    },
    {
      question: "What does your post-launch maintenance and support look like?",
      answer: "Every project comes with 30 days of complimentary support. After that, we offer customized Growth & Maintenance retainer plans that cover uptime monitoring, speed optimization, security updates, minor content tweaks, and routine backups."
    },
    {
      question: "Can you redesign our existing brand, logo, and marketing collateral?",
      answer: "Absolutely! Our graphic design team handles complete brand identity development—including custom logo refinement, UI/UX design wireframes, digital design assets, and marketing kits. We ensure your offline and online presence are fully unified."
    },
    {
      question: "How do you guarantee 'zero lag' on interactive, heavy 3D websites?",
      answer: "We employ advanced rendering optimizations in Three.js and WebGL. This includes caching geometries, compiling custom shaders, capping device pixel ratios (DPR) on high-density screens, implementing viewport-based render toggling, and utilizing CSS animations for structural layouts, keeping GPU and main thread overhead to a minimum."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section dark-theme" style={{ position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .faq-container {
          max-width: 800px;
          margin: 40px auto 0 auto;
          width: 100%;
        }
        .faq-item {
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
          border-radius: 16px;
          margin-bottom: 15px;
          overflow: hidden;
          transition: var(--transition-smooth);
        }
        .faq-item:hover {
          border-color: rgba(124, 58, 237, 0.4);
          transform: translateY(-2px);
        }
        .faq-trigger {
          width: 100%;
          padding: 24px 30px;
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          cursor: pointer;
          color: var(--text-dark);
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 600;
          gap: 15px;
        }
        .faq-icon-box {
          background: rgba(124, 58, 237, 0.1);
          color: var(--primary-purple);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: var(--transition-fast);
        }
        .faq-item:hover .faq-icon-box {
          background: var(--primary-purple);
          color: white;
        }
        .faq-panel {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), padding 0.4s;
          padding: 0 30px;
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.6;
        }
        .faq-panel.open {
          max-height: 250px;
          padding-bottom: 24px;
        }
      `}</style>

      <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', zIndex: 10 }}>
        <span className="text-gradient" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.9rem', display: 'block', marginBottom: '10px' }}>
          Questions & Answers
        </span>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '15px' }} className="text-gradient-white">
          Frequently Asked Questions
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Got questions? We've got answers. Explore our detailed responses to our most common inquiries below.
        </p>
      </div>

      <div className="faq-container" style={{ zIndex: 10 }}>
        {faqs.map((faq, idx) => (
          <div key={idx} className="faq-item">
            <button className="faq-trigger" onClick={() => toggleFAQ(idx)}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <HelpCircle size={20} style={{ color: 'var(--primary-purple)', opacity: 0.8 }} />
                {faq.question}
              </span>
              <div className="faq-icon-box">
                {activeIndex === idx ? <Minus size={16} /> : <Plus size={16} />}
              </div>
            </button>
            <div className={`faq-panel ${activeIndex === idx ? 'open' : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
