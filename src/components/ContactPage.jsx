import React, { useState } from 'react';
import { Mail, MessageSquare, Star, Send, ShieldCheck, Heart, Sparkles, ExternalLink } from 'lucide-react';
import GlassCard from './GlassCard';
import { getApiUrl } from '../apiConfig';

const ContactPage = () => {
  // Form states
  const [activeFormTab, setActiveFormTab] = useState('contact'); // 'contact' or 'feedback'
  
  // General Contact Form data
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Client Feedback Form data
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    email: '',
    rating: 5,
    message: ''
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Star Ratings Render helper
  const renderStars = (currentRating, isInteractive = false) => {
    return (
      <div style={{ display: 'flex', gap: '6px' }}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = isInteractive 
            ? (hoverRating || feedbackData.rating) >= star
            : currentRating >= star;
          
          return (
            <Star
              key={star}
              size={24}
              style={{
                cursor: isInteractive ? 'pointer' : 'default',
                color: isFilled ? 'var(--accent)' : 'var(--text-muted)',
                fill: isFilled ? 'var(--accent)' : 'none',
                transition: 'var(--transition-fast)'
              }}
              onMouseEnter={() => isInteractive && setHoverRating(star)}
              onMouseLeave={() => isInteractive && setHoverRating(0)}
              onClick={() => isInteractive && setFeedbackData(prev => ({ ...prev, rating: star }))}
            />
          );
        })}
      </div>
    );
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({ ...prev, [name]: value }));
  };

  const submitContactForm = async (e) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.message) {
      setErrorMsg('Please complete all mandatory fields.');
      return;
    }
    setErrorMsg('');
    setSubmitting(true);

    try {
      const response = await fetch(getApiUrl('/api/contacts'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...contactData,
          type: 'Contact'
        })
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.message || 'Failed to send message.');
      }
    } catch (err) {
      setErrorMsg('Could not connect to the backend server.');
    } finally {
      setSubmitting(false);
    }
  };

  const submitFeedbackForm = async (e) => {
    e.preventDefault();
    if (!feedbackData.name || !feedbackData.email || !feedbackData.message) {
      setErrorMsg('Please complete all fields.');
      return;
    }
    setErrorMsg('');
    setSubmitting(true);

    try {
      const response = await fetch(getApiUrl('/api/contacts'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...feedbackData,
          subject: 'Client Review & Feedback',
          type: 'Feedback'
        })
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.message || 'Failed to log feedback.');
      }
    } catch (err) {
      setErrorMsg('Could not connect to the backend server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={{ padding: '110px 0 100px 0' }} className="fade-in">
      <div className="container" style={{ maxWidth: '1050px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
            Get in <span className="gradient-text-primary">Touch</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Have a custom rigging project in mind, or want to drop feedback about a past design? We'd love to hear from you.
          </p>
        </div>

        {submitted ? (
          /* Submission Success State */
          <GlassCard style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '48px 32px' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'rgba(236, 72, 153, 0.15)',
                border: '2px solid var(--secondary)',
                color: 'var(--secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto',
                boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)'
              }}
            >
              <ShieldCheck size={36} />
            </div>

            <h3 style={{ fontSize: '1.75rem', marginBottom: '12px' }}>
              {activeFormTab === 'contact' ? 'Message Sent Successfully!' : 'Feedback Logged!'}
            </h3>
            
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.6' }}>
              Thank you for communicating with us. {activeFormTab === 'contact' 
                ? "Our support leads will review your inquiry and write back via email within 24 business hours."
                : "We highly value client feedback. Your review has been saved and will assist us in refining future rigging models!"
              }
            </p>

            <button
              className="btn btn-secondary"
              onClick={() => {
                setSubmitted(false);
                setContactData({ name: '', email: '', subject: '', message: '' });
                setFeedbackData({ name: '', email: '', rating: 5, message: '' });
              }}
            >
              Send Another Form
            </button>
          </GlassCard>
        ) : (
          /* Core Tabs + Split Page layout */
          <div style={{ display: 'grid', gridTemplateColumns: '4.5fr 5.5fr', gap: '32px' }} className="contact-split-grid">
            
            {/* Left Side: Contact Cards & Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Email Card */}
              <GlassCard>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(13, 110, 253, 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={18} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '1.02rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>Email Support</h5>
                    <a href="mailto:support@vutuberdesign.studio" style={{ fontSize: '0.85rem', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
                      support@vutuberdesign.studio
                    </a>
                  </div>
                </div>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.5' }}>
                  For general business inquiries, corporate VTuber sponsorships, or invoicing questions.
                </p>
              </GlassCard>

              {/* Discord Card */}
              <GlassCard>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(88, 101, 242, 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MessageSquare size={18} style={{ color: '#5865F2' }} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '1.02rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>Discord Intake</h5>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>
                      discord.gg/vutuberdesign
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#5865F2', fontWeight: 700, display: 'block', marginTop: '2px' }}>
                      @jasmine _vtub_28068
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.5' }}>
                  Join our official design community to chat with our riggers, get live updates, or review commissions.
                </p>
              </GlassCard>

              {/* X (Twitter) Card */}
              <GlassCard>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(29, 155, 240, 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <div>
                    <h5 style={{ fontSize: '1.02rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>X</h5>
                    <a 
                      href="https://x.com/jasmine_vart" 
                      target="_blank" 
                      rel="noreferrer"
                      style={{ fontSize: '0.85rem', color: '#1d9bf0', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      @jasmine_vart <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.5' }}>
                  Follow our official X profile for Live2D rigging updates, WIP teasers, client feedback showcases, and direct inquiries.
                </p>
              </GlassCard>

              {/* Instagram Card */}
              <GlassCard>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(225, 48, 108, 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e1306c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </div>
                  <div>
                    <h5 style={{ fontSize: '1.02rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>Instagram</h5>
                    <a 
                      href="https://www.instagram.com/vutuberdesign?igsh=ZW9yNWp4cDhpMm9y" 
                      target="_blank" 
                      rel="noreferrer"
                      style={{ fontSize: '0.85rem', color: '#e1306c', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      vutuberdesign_official <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.5' }}>
                  Check out our visual design portfolio, Live2D model reels, character illustrations, and mascot artwork.
                </p>
              </GlassCard>

              {/* Facebook Card */}
              <GlassCard>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(24, 119, 242, 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877f2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div>
                    <h5 style={{ fontSize: '1.02rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>Facebook</h5>
                    <a 
                      href="https://www.facebook.com/share/17yHy8C4Gb/" 
                      target="_blank" 
                      rel="noreferrer"
                      style={{ fontSize: '0.85rem', color: '#1877f2', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      Vutuber Design <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.5' }}>
                  Visit our Facebook page to connect with our design community, view announcements, and check client recommendations.
                </p>
              </GlassCard>

              {/* Vutuber Design Pledge */}
              <GlassCard style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(89, 50, 230, 0.02) 100%)' }}>
                <h5 style={{ color: '#ffffff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.98rem', fontWeight: 700 }}>
                  <Heart size={14} style={{ color: 'var(--secondary)' }} fill="var(--secondary)" /> Vutuber Design Pledge
                </h5>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                  Every Live2D model commission features a 30-day post-delivery styling warranty. If any expressions break or mouth-tracking needs adjustments, our developers will update the source files for free!
                </p>
              </GlassCard>
            </div>

            {/* Right Side: Interactive Forms tabbed container */}
            <GlassCard padding={false} style={{ overflow: 'hidden', height: 'fit-content' }}>
              
              {/* Internal Form Tabs */}
              <div
                style={{
                  display: 'flex',
                  borderBottom: '1px solid var(--border-glow)',
                  backgroundColor: 'var(--bg-deep)'
                }}
              >
                <button
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    borderBottom: activeFormTab === 'contact' ? '2.5px solid var(--primary)' : 'none',
                    color: activeFormTab === 'contact' ? '#ffffff' : 'var(--text-secondary)',
                    padding: '16px 20px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                  onClick={() => { setActiveFormTab('contact'); setErrorMsg(''); }}
                >
                  General Contact
                </button>
                <button
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    borderBottom: activeFormTab === 'feedback' ? '2.5px solid var(--primary)' : 'none',
                    color: activeFormTab === 'feedback' ? '#ffffff' : 'var(--text-secondary)',
                    padding: '16px 20px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                  onClick={() => { setActiveFormTab('feedback'); setErrorMsg(''); }}
                >
                  Client Feedback / Review
                </button>
              </div>

              {/* Form Content body */}
              <div style={{ padding: '32px' }}>
                {activeFormTab === 'contact' ? (
                  /* 1. Contact Form */
                  <form onSubmit={submitContactForm} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={contactData.name}
                        onChange={handleContactChange}
                        placeholder="Your name or avatar handle"
                        required
                        style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px 14px', color: '#ffffff', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={contactData.email}
                        onChange={handleContactChange}
                        placeholder="you@email.com"
                        required
                        style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px 14px', color: '#ffffff', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={contactData.subject}
                        onChange={handleContactChange}
                        placeholder="Inquiry subject"
                        style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px 14px', color: '#ffffff', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Message *</label>
                      <textarea
                        name="message"
                        value={contactData.message}
                        onChange={handleContactChange}
                        rows={6}
                        placeholder="Describe your design needs, time deadlines, or custom package questions..."
                        required
                        style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px 14px', color: '#ffffff', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                      />
                    </div>

                    {errorMsg && <div style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 'bold' }}>{errorMsg}</div>}

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={submitting}
                      style={{ width: '100%', marginTop: '8px' }}
                    >
                      {submitting ? 'Sending Message...' : 'Send Message'} <Send size={16} />
                    </button>
                  </form>
                ) : (
                  /* 2. Feedback Form */
                  <form onSubmit={submitFeedbackForm} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div
                      style={{
                        background: 'rgba(6, 182, 212, 0.05)',
                        border: '1px dashed var(--accent)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '8px'
                      }}
                    >
                      <Sparkles size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Client reviews assist VTuber enthusiasts globally! Reviews may appear in our public Testimonials reel.
                      </span>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Name / Channel Title *</label>
                      <input
                        type="text"
                        name="name"
                        value={feedbackData.name}
                        onChange={handleFeedbackChange}
                        placeholder="e.g. Luna Ch."
                        required
                        style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px 14px', color: '#ffffff', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={feedbackData.email}
                        onChange={handleFeedbackChange}
                        placeholder="luna@yahoo.com"
                        required
                        style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px 14px', color: '#ffffff', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Model & Service Rating *</label>
                      {renderStars(feedbackData.rating, true)}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Your Client Review *</label>
                      <textarea
                        name="message"
                        value={feedbackData.message}
                        onChange={handleFeedbackChange}
                        rows={6}
                        placeholder="Write details about your experience. How smooth was the rigging tracking? Did the overlays fit Twitch perfectly?"
                        required
                        style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '10px 14px', color: '#ffffff', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                      />
                    </div>

                    {errorMsg && <div style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 'bold' }}>{errorMsg}</div>}

                    <button
                      type="submit"
                      className="btn btn-secondary"
                      disabled={submitting}
                      style={{ width: '100%', marginTop: '8px' }}
                    >
                      {submitting ? 'Filing Review...' : 'File Client Review'} <Send size={16} />
                    </button>
                  </form>
                )}
              </div>
            </GlassCard>

          </div>
        )}

      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .contact-split-grid {
            grid-template-columns: 1fr !important;
            gap: 24px;
          }
        }
        
        form input:focus, form textarea:focus {
          border-color: var(--primary) !important;
          box-shadow: 0 0 15px var(--primary-glow), inset 0 0 5px var(--primary-glow) !important;
          background-color: rgba(13, 3, 41, 0.8) !important;
        }
      `}</style>
    </section>
  );
};

export default ContactPage;
