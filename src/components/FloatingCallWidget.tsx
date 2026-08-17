import { Calendar } from 'lucide-react';

export default function FloatingCallWidget() {
  const handleClick = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      
      // Temporarily highlight the calendly widget
      setTimeout(() => {
        const widget = document.querySelector('.calendly-widget');
        if (widget) {
          widget.classList.add('pulse-highlight');
          setTimeout(() => widget.classList.remove('pulse-highlight'), 2000);
        }
      }, 800);
    }
  };

  return (
    <>
      <style>{`
        .pulse-highlight {
          animation: borderGlow 2s ease;
        }
        @keyframes borderGlow {
          0%, 100% { border-color: var(--glass-border); box-shadow: 0 10px 30px var(--glass-shadow); }
          50% { border-color: var(--primary-purple); box-shadow: 0 0 25px rgba(124, 58, 237, 0.4); }
        }
      `}</style>
      <button 
        className="floating-call" 
        onClick={handleClick}
        title="Schedule Call"
        aria-label="Schedule Discovery Call"
      >
        <Calendar size={24} />
      </button>
    </>
  );
}
