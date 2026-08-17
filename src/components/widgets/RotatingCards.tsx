import styled from 'styled-components';

// UIverse rotating cards widget — themed dark purple for Bytehawk
const RotatingCards = () => {
  return (
    <StyledWrapper>
      <div className="wrap_card">
        {/* Card 1 — Cloud / Web Hosting */}
        <div className="card card1">
          <div className="content">
            <span>W</span>
            <svg fill="none" viewBox="0 0 24 24" height={48} width={48} className="icon" xmlns="http://www.w3.org/2000/svg">
              <path fill="url(#g1)" d="M15.2 1C12.4 1 9.9 2.5 8.5 4.8C8 4.7 7.5 4.6 7 4.6C3.7 4.6 1 7.3 1 10.6C1 13.9 3.7 16.6 7 16.6H15.2C19.5 16.6 23 13.1 23 8.8C23 4.5 19.5 1 15.2 1Z" />
              <path fill="url(#g1)" d="M12.4 17.5C11.9 17.3 11.3 17.4 11.1 17.9L9.3 21.5C9 22 9.2 22.6 9.7 22.9C9.8 23 10 23 10.2 23C10.6 23 10.9 22.8 11.1 22.5L12.9 18.9C13.1 18.3 12.9 17.7 12.4 17.5Z" />
              <path fill="url(#g1)" d="M17 17.5C16.5 17.3 15.9 17.4 15.7 17.9L13.9 21.5C13.7 22 13.8 22.6 14.3 22.8C14.4 22.9 14.6 22.9 14.8 22.9C15.2 22.9 15.5 22.7 15.7 22.4L17.5 18.8C17.7 18.3 17.5 17.7 17 17.5Z" />
            </svg>
          </div>
        </div>

        {/* Card 2 — 3D / Design */}
        <div className="card card2">
          <div className="content">
            <span>D</span>
            <svg fill="none" viewBox="0 0 24 24" height={48} width={48} className="icon" xmlns="http://www.w3.org/2000/svg">
              <path fill="url(#g1)" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="0"/>
              <path stroke="url(#g1)" fill="none" strokeWidth="1.5" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
        </div>

        {/* Card 3 — Growth / Analytics */}
        <div className="card card3">
          <div className="content">
            <span>G</span>
            <svg fill="none" viewBox="0 0 24 24" height={48} width={48} className="icon" xmlns="http://www.w3.org/2000/svg">
              <path fill="url(#g1)" d="M3 3v18h18M7 16l4-4 4 4 4-6" strokeWidth="0"/>
              <path stroke="url(#g1)" fill="none" strokeWidth="1.8" strokeLinecap="round" d="M3 21h18M3 3v18M7 16l4-4 4 4 5-6"/>
            </svg>
          </div>
        </div>

        {/* Gradient defs */}
        <svg style={{ visibility: 'hidden', width: 0, height: 0 }}>
          <defs>
            <linearGradient id="g1" x1="0%" y1="0%" x2="120%" y2="120%">
              <stop offset="0%" stopColor="#E9D5FF" />
              <stop offset="100%" stopColor="#A855F700" />
            </linearGradient>
          </defs>
        </svg>

        <div className="lines">
          <div className="line" />
          <div className="line" />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .wrap_card {
    position: relative;
    overflow: hidden;
    width: var(--w-wrap-card);
    height: calc(var(--h-card) / 1.25);
    display: flex;
    align-items: center;
    justify-content: center;
    --w-card: 150px;
    --h-card: 200px;
    --rotate-card: 15deg;
    --insetX-card: 28px;
    --t-card: calc(var(--insetX-card) * 1.25);
    --w-wrap-card: calc(var(--w-card) + calc(calc(var(--w-card) / 2) * 2));
  }

  .content {
    background-color: rgba(139, 92, 246, 0.2);
    overflow: hidden;
    position: relative;
    width: calc(100% - calc(var(--pd) * 2));
    height: calc(100% - calc(var(--pd) * 2));
    border-radius: calc(var(--round) - var(--pd));
  }

  .content > span {
    font-size: 300px;
    font-weight: 800;
    line-height: 0.75;
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 50% 0 0 50%;
    transform: translate(-50%, -50%);
    background-clip: text;
    -webkit-text-stroke-width: 3px;
    color: transparent;
    opacity: 0;
    background-image: linear-gradient(-45deg, rgba(167, 139, 250, 0.15) 0%, rgba(216, 180, 254, 0.7) 100%);
    animation: opacity 0s cubic-bezier(1, 0, 0, 1) forwards var(--delay) reverse;
  }

  .content > svg {
    height: 66px;
    width: 66px;
    position: absolute;
    inset: 50% 0 0 50%;
    opacity: 1;
    animation: opacity 8.4s cubic-bezier(1, 0, 0, 1) forwards calc(var(--delay) - 4.3s);
    transform: translate(-50%, -50%);
  }

  .card1 { --delay: 4.3s; }
  .card2 { --delay: 7.3s; }
  .card3 { --delay: 10.3s; }

  @keyframes opacity {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  .card {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    overflow: hidden;
    animation: rotating 9s cubic-bezier(0.75, 0, 0, 1.01) infinite 0s;
    border-radius: var(--round);
    background: var(--bg);
    order: var(--order);
    width: var(--w-card);
    height: var(--h-card);
    z-index: var(--z1);
    top: var(--t1);
    left: var(--l1);
    right: var(--r1);
    transform: var(--trans1);
    --pd: 4px;
    --round: 20px;
    --x1: var(--insetX-card);
    --x2: calc(var(--w-wrap-card) - calc(var(--w-card) + var(--insetX-card)));
    --to-left: rotate(calc(var(--rotate-card) * -1));
    --to-center: calc(var(--w-card) / 2);
    --to-right: rotate(calc(var(--rotate-card) * 1));
  }

  /* Card 1 - Deep Purple */
  .card1 {
    --order: 2;
    --bg: radial-gradient(circle, #7C3AED 0%, #4C1D95 50%, #2E1065 100%);
    --z1: 2; --t1: 0; --l1: var(--to-center); --r1: var(--to-center); --trans1: rotate(0deg);
    --z2: 0; --t2: var(--t-card); --l2: var(--x1); --r2: var(--x2); --trans2: var(--to-left);
    --z3: 0; --t3: var(--t-card); --l3: var(--x2); --r3: var(--x1); --trans3: var(--to-right);
  }

  /* Card 2 - Violet-Indigo */
  .card2 {
    --order: 3;
    --bg: radial-gradient(circle, #A78BFA 0%, #7C3AED 45%, #4338CA 100%);
    --z1: 0; --t1: var(--t-card); --l1: var(--x2); --r1: var(--x1); --trans1: var(--to-right);
    --z2: 2; --t2: 0; --l2: var(--to-center); --r2: var(--to-center); --trans2: rotate(0deg);
    --z3: 0; --t3: var(--t-card); --l3: var(--x1); --r3: var(--x2); --trans3: var(--to-left);
  }

  /* Card 3 - Pink-Purple */
  .card3 {
    --order: 1;
    --bg: radial-gradient(circle, #E879F9 0%, #D946EF 45%, #A21CAF 100%);
    --z1: 0; --t1: var(--t-card); --l1: var(--x1); --r1: var(--x2); --trans1: var(--to-left);
    --z2: 0; --t2: var(--t-card); --l2: var(--x2); --r2: var(--x1); --trans2: var(--to-right);
    --z3: 2; --t3: 0; --l3: var(--to-center); --r3: var(--to-center); --trans3: rotate(0deg);
  }

  @keyframes rotating {
    0%, 99.99% {
      z-index: var(--z1); top: var(--t1); left: var(--l1); right: var(--r1); transform: var(--trans1);
    }
    33.33% {
      z-index: var(--z2); top: var(--t2); left: var(--l2); right: var(--r2); transform: var(--trans2);
    }
    66.66% {
      z-index: var(--z3); top: var(--t3); left: var(--l3); right: var(--r3); transform: var(--trans3);
    }
  }

  .lines {
    position: absolute;
    inset: auto 0 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
  }

  .lines::after {
    content: "";
    width: 100%;
    height: 0px;
    position: absolute;
    z-index: 2;
    inset: 0;
    background: #06020F;
    mask-image: radial-gradient(50% 200px at top, transparent 20%, #06020F);
  }

  .line {
    position: absolute;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .line::before, .line::after {
    content: "";
    position: absolute;
    inset: auto;
    background: linear-gradient(to right, var(--gradient-a-line, #0000), var(--gradient-b-line, #0000), var(--gradient-c-line, #0000));
    filter: var(--blur-line);
    width: var(--w-line);
    height: var(--h-line);
  }

  .line:nth-child(1)::before {
    --blur-line: blur(4px); --w-line: 100%; --h-line: 5px; --gradient-b-line: #7C3AED;
  }
  .line:nth-child(1)::after {
    --w-line: 100%; --h-line: 1px; --gradient-b-line: #A78BFA;
  }
  .line:nth-child(2)::before {
    --blur-line: blur(4px); --w-line: 50%; --h-line: 5px; --gradient-b-line: #D946EF;
  }
  .line:nth-child(2)::after {
    --w-line: 50%; --h-line: 1px; --gradient-b-line: #E879F9;
  }
`;

export default RotatingCards;
