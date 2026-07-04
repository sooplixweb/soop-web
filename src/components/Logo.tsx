type LogoProps = {
  variant?: 'light' | 'dark';
};

export function Logo({ variant = 'light' }: LogoProps) {
  return (
    <div className={`brand-lockup brand-lockup--${variant}`} aria-label="Sooplix web">
      <span className="brand-lockup__mark">
        <svg viewBox="405 220 690 540" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="sooplixTop" x1="520" y1="250" x2="1024" y2="412" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F5F7FB" />
              <stop offset="0.48" stopColor="#5F7EF3" />
              <stop offset="1" stopColor="#4338CA" />
            </linearGradient>
            <linearGradient id="sooplixBottom" x1="1008" y1="466" x2="480" y2="708" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5F7EF3" />
              <stop offset="0.48" stopColor="#4338CA" />
              <stop offset="1" stopColor="#F5F7FB" />
            </linearGradient>
          </defs>
          <path
            d="M972 284 C842 258 675 274 606 344 C551 400 579 464 672 504 C770 546 842 577 824 634 C802 705 640 700 520 676"
            fill="none"
            stroke="url(#sooplixTop)"
            strokeWidth="68"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M662 394 C790 414 957 450 990 552 C1016 634 930 705 792 728 C668 748 558 724 488 700"
            fill="none"
            stroke="url(#sooplixBottom)"
            strokeWidth="68"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g>
            <g transform="rotate(45 996 284)">
              <rect
                x="970"
                y="258"
                width="52"
                height="52"
                rx="16"
                fill="#0A0F1F"
                fillOpacity=".56"
                stroke="#CDD5E2"
                strokeOpacity=".24"
                strokeWidth="1.4"
              />
              <rect x="986" y="274" width="20" height="20" rx="6" fill="#F5F7FB" fillOpacity=".82" />
            </g>
            <rect
              className="sooplix-terminal-contour"
              x="964"
              y="252"
              width="64"
              height="64"
              rx="20"
              transform="rotate(45 996 284)"
              fill="none"
              stroke="#FFE8A8"
              strokeWidth="1.05"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity=".2"
            />
          </g>
          <g fill="#5F7EF3">
            <rect x="480" y="258" width="18" height="18" rx="3" />
            <rect x="520" y="284" width="16" height="16" rx="3" />
            <rect x="552" y="250" width="18" height="18" rx="3" />
            <rect x="516" y="328" width="26" height="26" rx="4" />
            <rect x="468" y="304" width="12" height="12" rx="2" />
            <rect x="552" y="304" width="13" height="13" rx="2" />
          </g>
          <g fill="#4338CA">
            <rect x="980" y="656" width="22" height="22" rx="4" />
            <rect x="1026" y="696" width="16" height="16" rx="3" />
            <rect x="936" y="722" width="18" height="18" rx="3" />
            <rect x="1010" y="734" width="13" height="13" rx="2" />
          </g>
          <g stroke="#CDD5E2" strokeWidth="1.35" strokeLinecap="round" opacity=".34">
            <line x1="451" y1="681" x2="424" y2="681" />
            <line x1="446" y1="694" x2="412" y2="694" />
            <line x1="450" y1="707" x2="420" y2="707" />
            <line x1="459" y1="718" x2="434" y2="718" />
          </g>
        </svg>
      </span>
      <span className="brand-lockup__word">
        <span className="brand-lockup__main">
          <strong>Sooplix</strong>
          <span>web</span>
        </span>
        <span className="brand-lockup__tagline">SOLUÇÕES DIGITAIS</span>
      </span>
    </div>
  );
}
