import styled from 'styled-components';

// UIverse social card widget — re-themed dark purple for Bytehawk footer
const SocialCard = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="background" />
        <div className="logo">
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.05rem',
            fontWeight: 900,
            letterSpacing: '0.04em',
            color: '#ffffff',
            textTransform: 'uppercase',
            textShadow: '0 0 12px rgba(167, 139, 250, 0.4)'
          }}>
            Connect
          </span>
        </div>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="box box1">
          <span className="icon">
            <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className="svg">
              <path d="M9.998 3C6.139 3 3 6.142 3 10.002L3 20.002C3 23.861 6.142 27 10.002 27L20.002 27C23.861 27 27 23.858 27 19.998L27 9.998C27 6.139 23.858 3 19.998 3L9.998 3zM22 7C22.552 7 23 7.448 23 8C23 8.552 22.552 9 22 9C21.448 9 21 8.552 21 8C21 7.448 21.448 7 22 7zM15 9C18.309 9 21 11.691 21 15C21 18.309 18.309 21 15 21C11.691 21 9 18.309 9 15C9 11.691 11.691 9 15 9zM15 11A4 4 0 0 0 11 15A4 4 0 0 0 15 19A4 4 0 0 0 19 15A4 4 0 0 0 15 11z" />
            </svg>
          </span>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="box box2">
          <span className="icon">
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="svg">
              <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
            </svg>
          </span>
        </a>
        <a href="https://discord.com" target="_blank" rel="noreferrer" className="box box3">
          <span className="icon">
            <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" className="svg">
              <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
            </svg>
          </span>
        </a>
        <div className="box box4" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 180px;
    height: 180px;
    background: #0D0720;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(124, 58, 237, 0.35), 0 0 0 1px rgba(139, 92, 246, 0.2);
    transition: all 0.8s ease-in-out;
  }

  .card:hover {
    transform: scale(1.08);
    box-shadow: 0 16px 48px rgba(124, 58, 237, 0.55), 0 0 0 1px rgba(167, 139, 250, 0.4);
  }

  .background {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 100% 107%, rgba(217, 70, 239, 0.6) 0%, rgba(124, 58, 237, 0.5) 35%, rgba(67, 56, 202, 0.4) 70%, rgba(6, 2, 15, 0.1) 100%);
  }

  .logo {
    position: absolute;
    right: 50%;
    bottom: 50%;
    transform: translate(50%, 50%);
    transition: all 0.6s ease-in-out;
  }

  .logo .logo-svg {
    fill: white;
    width: 28px;
    height: 28px;
  }

  .icon {
    display: inline-block;
    width: 20px;
    height: 20px;
  }

  .icon .svg {
    fill: rgba(255, 255, 255, 0.85);
    width: 100%;
    transition: all 0.4s ease-in-out;
  }

  .box {
    position: absolute;
    padding: 10px;
    text-align: right;
    background: rgba(139, 92, 246, 0.2);
    border-top: 2px solid rgba(167, 139, 250, 0.5);
    border-right: 1px solid rgba(167, 139, 250, 0.3);
    border-radius: 10% 13% 42% 0%/10% 12% 75% 0%;
    box-shadow: rgba(124, 58, 237, 0.3) -5px 5px 20px 0px;
    transform-origin: bottom left;
    transition: all 0.8s ease-in-out;
    text-decoration: none;
    cursor: pointer;
  }

  .box::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    opacity: 0;
    transition: all 0.4s ease-in-out;
  }

  .box:hover .svg { fill: white; filter: drop-shadow(0 0 6px rgba(255,255,255,0.8)); }

  /* Box 1 — Instagram — purple */
  .box1 { width: 70%; height: 70%; bottom: -70%; left: -70%; }
  .box1::before { background: radial-gradient(circle at 30% 107%, #7C3AED 0%, #D946EF 60%, #A855F7 100%); }
  .box1:hover::before { opacity: 1; }

  /* Box 2 — Twitter — violet */
  .box2 { width: 50%; height: 50%; bottom: -50%; left: -50%; transition-delay: 0.15s; }
  .box2::before { background: radial-gradient(circle at 30% 107%, #818CF8 0%, #6D28D9 90%); }
  .box2:hover::before { opacity: 1; }

  /* Box 3 — Discord — pink */
  .box3 { width: 30%; height: 30%; bottom: -30%; left: -30%; transition-delay: 0.3s; }
  .box3::before { background: radial-gradient(circle at 30% 107%, #E879F9 0%, #A21CAF 90%); }
  .box3:hover::before { opacity: 1; }

  .box4 { width: 10%; height: 10%; bottom: -10%; left: -10%; transition-delay: 0.45s; }

  .card:hover .box { bottom: -1px; left: -1px; }
  .card:hover .logo { transform: translate(0, 0); bottom: 16px; right: 16px; }
`;

export default SocialCard;
