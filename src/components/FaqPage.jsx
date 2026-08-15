import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, BookOpen, Clock, ShieldCheck, Heart } from 'lucide-react';
import GlassCard from './GlassCard';

const FaqPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const categories = [
    { id: 'all', label: 'All Questions', icon: <BookOpen size={16} /> },
    { id: 'art-rigging', label: 'Art & Rigging', icon: <HelpCircle size={16} /> },
    { id: 'timeline-pricing', label: 'Timelines & Cost', icon: <Clock size={16} /> },
    { id: 'rights-tech', label: 'Licensing & Technical', icon: <ShieldCheck size={16} /> }
  ];

  const faqs = [
    {
      question: 'What is your standard canvas size and file delivery format?',
      answer: 'Our elite illustrators draw all custom models on a massive native canvas of 8000x8000px at 300 DPI. We deliver the final rigged model folder containing the compilation files (.moc3, .model3.json, .physics3.json, and high-res texture atlases) optimized for instant import into VTube Studio or VSeeFace. We also include the fully organized, raw layered Photoshop PSD source file.',
      category: 'rights-tech'
    },
    {
      question: 'How many layers are included in your custom VTuber cuts?',
      answer: 'For fluid, lifelike movements, details matter. Our character designs are deconstructed into 400 to 1,200+ distinct layers depending on complexity. Every eyelid detail, lash crease, hair strand segment, clothing fold, highlight, and secondary accessory is isolated and hand-sliced. This prevents graphical tearing and allows for extreme rotation angles without bald spots.',
      category: 'art-rigging'
    },
    {
      question: 'What dynamic physics groups are configured in the standard rigs?',
      answer: 'We build up to 42 custom rigging and physics groups. This covers realistic multi-layered hair swing and gravity physics, clothing and accessory sway, dynamic breast bounce with dampening controls, eye shine and pupil dilation tracking, and physical response to character jumps/leans.',
      category: 'art-rigging'
    },
    {
      question: 'Do your models come with commercial broadcasting and merchandise rights?',
      answer: 'Yes! All packages (Starter, Standard, Premium) include full commercial broadcasting rights for streaming, video content creation, and promotional branding. Additionally, raw high-res source files are provided. For large-scale physical merchandise printing (clothing, figures, keychains) using the model illustration, we offer an optional extended merch add-on which can be toggled in the Quote Calculator.',
      category: 'rights-tech'
    },
    {
      question: 'What is your typical commission turnaround time?',
      answer: 'Average turnaround times range from 3 to 6 weeks. A Starter Package takes 2 to 3 weeks, Standard takes 3 to 5 weeks, and a full Premium VTuber package takes 4 to 6 weeks. Because we prioritize exceptional, AAA-grade quality, each stage (concept sketches, sliced art, base rigging, physics rigging, and final QA) is presented to you for direct review and feedback before proceeding.',
      category: 'timeline-pricing'
    },
    {
      question: 'What post-delivery support and warranty do you offer?',
      answer: 'We stand by our work. Every commission is covered by a 30-day post-delivery technical warranty. If you experience mouth-sync clipping, double-layer blinking errors, or physics tracking problems in VTube Studio, our dedicated engineers will adjust the files and issue a revised package free of charge. Long-term support, outfit additions, and expression upgrades are also available.',
      category: 'rights-tech'
    },
    {
      question: 'How do expression hotkeys work and what emotions are supported?',
      answer: 'Expressions are configured as native hotkey parameters inside VTube Studio. Standard rigs include up to 4 custom expressions (e.g. Blush, Tears, Shock, Heart-eyes), while Standard and Premium rigs include 6 to 12 expressions plus custom toggle accessories (removable hats, glasses, coats). These map perfectly to any numpad or stream-deck shortcut.',
      category: 'art-rigging'
    },
    {
      question: 'Can you work with an existing character sheet or reference art?',
      answer: 'Absolutely! We frequently adapt pre-existing 2D illustrations, reference sheets, or 3D references. If your artist has already provided a sliced PSD file, we can skip the illustration phase and perform direct rigging diagnostics, saving you time and cost. We will inspect the PSD layers to ensure compliance with our structural rigging guidelines first.',
      category: 'timeline-pricing'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section style={{ padding: '110px 0 100px 0' }} className="fade-in">
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0, 242, 254, 0.08)',
              border: '1px solid rgba(0, 242, 254, 0.2)',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: '600',
              color: 'var(--accent)',
              marginBottom: '16px',
              boxShadow: '0 0 12px rgba(0, 242, 254, 0.1)'
            }}
          >
            <HelpCircle size={14} /> Help Center & Support
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
            Frequently Asked <span className="gradient-text-accent">Questions</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Got questions about Live2D illustration, slicing rules, rigging, commercial pricing, or technical setups? We have compiled detailed answers below.
          </p>
        </div>

        {/* Search Bar & Category Navigation Panel */}
        <div 
          style={{ 
            background: 'var(--bg-glass)', 
            border: '1px solid var(--border-glow)', 
            borderRadius: 'var(--radius-lg)', 
            padding: '24px', 
            marginBottom: '32px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
          }}
          className="faq-controls"
        >
          {/* Glowing Search Box */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <Search 
              size={18} 
              style={{ 
                position: 'absolute', 
                left: '16px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: 'var(--text-muted)' 
              }} 
            />
            <input
              type="text"
              placeholder="Search rigging specs, commercial licenses, warranty, canvas resolution..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: 'rgba(5, 7, 12, 0.6)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px 14px 48px',
                color: '#ffffff',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'var(--transition-fast)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary)';
                e.target.style.boxShadow = '0 0 15px var(--primary-glow), inset 0 2px 4px rgba(0,0,0,0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-light)';
                e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.3)';
              }}
            />
          </div>

          {/* Navigation Category Pill Filter */}
          <div 
            style={{ 
              display: 'flex', 
              gap: '12px', 
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setExpandedIndex(null);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: activeCategory === cat.id ? 'var(--primary)' : 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid',
                  borderColor: activeCategory === cat.id ? 'var(--primary)' : 'var(--border-glow)',
                  borderRadius: '30px',
                  padding: '8px 18px',
                  color: activeCategory === cat.id ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)',
                  boxShadow: activeCategory === cat.id ? '0 4px 12px var(--primary-glow)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== cat.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== cat.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                    e.currentTarget.style.borderColor = 'var(--border-glow)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div 
                  key={idx}
                  style={{
                    backgroundColor: isExpanded ? 'rgba(9, 15, 36, 0.8)' : 'var(--bg-card)',
                    border: '1px solid',
                    borderColor: isExpanded ? 'var(--accent)' : 'var(--border-glow)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    transition: 'var(--transition-smooth)',
                    boxShadow: isExpanded ? '0 10px 25px rgba(0,0,0,0.3), 0 0 15px rgba(0, 242, 254, 0.08)' : 'none',
                    transform: isExpanded ? 'translateY(-2px)' : 'translateY(0)'
                  }}
                >
                  {/* Collapsible Header */}
                  <div
                    onClick={() => toggleAccordion(idx)}
                    style={{
                      padding: '22px 28px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      userSelect: 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isExpanded) {
                        e.currentTarget.parentElement.style.borderColor = 'rgba(255,255,255,0.15)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isExpanded) {
                        e.currentTarget.parentElement.style.borderColor = 'var(--border-glow)';
                      }
                    }}
                  >
                    <h4 
                      style={{ 
                        fontSize: '1.05rem', 
                        color: isExpanded ? '#ffffff' : 'var(--text-primary)', 
                        fontWeight: '600', 
                        margin: 0,
                        textAlign: 'left',
                        flexGrow: 1,
                        paddingRight: '20px',
                        transition: 'var(--transition-fast)'
                      }}
                    >
                      {faq.question}
                    </h4>
                    <div 
                      style={{ 
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', 
                        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
                        color: isExpanded ? 'var(--accent)' : 'var(--text-muted)',
                        flexShrink: 0
                      }}
                    >
                      <ChevronDown size={18} />
                    </div>
                  </div>

                  {/* Answer Block */}
                  <div
                    style={{
                      maxHeight: isExpanded ? '1000px' : '0px',
                      opacity: isExpanded ? 1 : 0,
                      visibility: isExpanded ? 'visible' : 'hidden',
                      transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, padding 0.3s ease',
                      borderTop: isExpanded ? '1px solid var(--border-glow)' : 'none',
                      backgroundColor: 'rgba(5, 7, 12, 0.3)'
                    }}
                  >
                    <div style={{ padding: '24px 28px', color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: '1.7', textAlign: 'left' }}>
                      <p style={{ margin: 0 }}>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <GlassCard style={{ textAlign: 'center', padding: '48px 32px' }}>
              <div 
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '50%', 
                  backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#ef4444', 
                  margin: '0 auto 16px auto' 
                }}
              >
                <HelpCircle size={24} />
              </div>
              <h4 style={{ marginBottom: '8px' }}>No matches found</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '380px', margin: '0 auto' }}>
                We couldn't find any FAQs matching "{searchQuery}". Try searching with broader keywords like "rigging", "PSD", "merch", or "warranty".
              </p>
            </GlassCard>
          )}
        </div>

        {/* Live Support Portal Accents */}
        <div 
          style={{ 
            marginTop: '48px', 
            background: 'linear-gradient(135deg, rgba(13, 110, 253, 0.05) 0%, rgba(0, 180, 216, 0.05) 100%)',
            border: '1px dashed var(--border-light)', 
            borderRadius: 'var(--radius-lg)', 
            padding: '32px',
            textAlign: 'center'
          }}
        >
          <h4 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Still have questions?</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px', maxWidth: '520px', margin: '0 auto 20px auto', lineHeight: '1.5' }}>
            We work closely with VTuber projects to build highly bespoke layouts, unique expression rigs, and live assets. Our team is ready to map out your digital requirements.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 'bold' }}>
              <Heart size={14} fill="var(--accent)" /> Average response time: &lt; 12 hours
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FaqPage;
