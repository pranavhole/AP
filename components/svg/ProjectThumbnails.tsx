import React from "react";

export function BusinessLandingPageSvg({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 400 240"
    >
      {/* Background canvas */}
      <rect fill="#FFF8E8" height="240" width="400" />
      {/* Browser window */}
      <rect
        fill="#FFFDFC"
        height="200"
        rx="8"
        stroke="#17172A"
        strokeWidth="2.5"
        width="360"
        x="20"
        y="20"
      />
      {/* Browser header */}
      <line stroke="#17172A" strokeWidth="2.5" x1="20" x2="380" y1="52" y2="52" />
      <circle cx="38" cy="36" fill="#F6B8B8" r="4" stroke="#17172A" strokeWidth="1.5" />
      <circle cx="52" cy="36" fill="#F9E37D" r="4" stroke="#17172A" strokeWidth="1.5" />
      <circle cx="66" cy="36" fill="#CFEBD8" r="4" stroke="#17172A" strokeWidth="1.5" />

      {/* URL bar */}
      <rect
        fill="#FFF8E8"
        height="18"
        rx="9"
        stroke="#17172A"
        strokeWidth="1.5"
        width="180"
        x="90"
        y="27"
      />
      <text fill="#575467" fontFamily="sans-serif" fontSize="8" fontWeight="bold" x="120" y="39">
        agency-landing.dev
      </text>

      {/* Nav items in site */}
      <rect fill="#17172A" height="10" rx="3" width="28" x="40" y="70" />
      <rect fill="#575467" height="6" rx="2" width="24" x="250" y="72" />
      <rect fill="#575467" height="6" rx="2" width="24" x="282" y="72" />
      <rect fill="#F6B8B8" height="14" rx="4" stroke="#17172A" strokeWidth="1.5" width="45" x="315" y="68" />

      {/* Hero content left */}
      <rect fill="#CFEBD8" height="12" rx="4" stroke="#17172A" strokeWidth="1.5" width="120" x="40" y="100" />
      <rect fill="#17172A" height="18" rx="4" width="140" x="40" y="120" />
      <rect fill="#575467" height="8" rx="2" width="110" x="40" y="145" />
      <rect fill="#575467" height="8" rx="2" width="90" x="40" y="158" />

      {/* Hero CTA button */}
      <rect fill="#F9E37D" height="20" rx="6" stroke="#17172A" strokeWidth="2" width="75" x="40" y="178" />
      <text fill="#17172A" fontFamily="sans-serif" fontSize="9" fontWeight="bold" x="52" y="191">
        Get Started →
      </text>

      {/* Hero illustration right: Potted plant & creative card */}
      <g transform="translate(230, 95)">
        {/* Card backdrop */}
        <rect
          fill="#DCC8F6"
          height="100"
          rx="8"
          stroke="#17172A"
          strokeWidth="2"
          width="125"
          x="0"
          y="10"
        />
        <rect
          fill="#FFFDFC"
          height="80"
          rx="6"
          stroke="#17172A"
          strokeWidth="1.8"
          width="110"
          x="8"
          y="20"
        />
        {/* Plant in pot */}
        <ellipse cx="62" cy="72" fill="#F9E37D" rx="14" ry="10" stroke="#17172A" strokeWidth="2" />
        <path d="M52 70 L55 90 L69 90 L72 70 Z" fill="#F6B8B8" stroke="#17172A" strokeWidth="2" />
        {/* Leaves */}
        <path d="M62 62 Q 50 45 42 50 Q 52 58 62 62" fill="#CFEBD8" stroke="#17172A" strokeWidth="1.8" />
        <path d="M62 62 Q 62 38 64 36 Q 66 48 62 62" fill="#BFDFAE" stroke="#17172A" strokeWidth="1.8" />
        <path d="M62 62 Q 74 45 82 50 Q 72 58 62 62" fill="#CFEBD8" stroke="#17172A" strokeWidth="1.8" />
      </g>
    </svg>
  );
}

export function ECommerceStoreSvg({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 400 240"
    >
      {/* Background canvas */}
      <rect fill="#FFF0B0" height="240" width="400" />

      {/* Decorative sparkles */}
      <path d="M50 40 L53 50 L63 53 L53 56 L50 66 L47 56 L37 53 L47 50 Z" fill="#F6B8B8" stroke="#17172A" strokeWidth="1.5" />
      <path d="M340 50 L342 58 L350 60 L342 62 L340 70 L338 62 L330 60 L338 58 Z" fill="#DCC8F6" stroke="#17172A" strokeWidth="1.5" />
      <path d="M80 180 L82 186 L88 188 L82 190 L80 196 L78 190 L72 188 L78 186 Z" fill="#CFEBD8" stroke="#17172A" strokeWidth="1.5" />

      {/* Pedestal */}
      <ellipse cx="200" cy="205" fill="#17172A" opacity="0.12" rx="140" ry="18" />

      {/* Shopping Bag (Main center) */}
      <g transform="translate(130, 60)">
        {/* Handles */}
        <path
          d="M35 35 C 35 10, 75 10, 75 35"
          fill="none"
          stroke="#17172A"
          strokeLinecap="round"
          strokeWidth="3.5"
        />
        {/* Bag body */}
        <polygon
          points="15,35 95,35 105,135 5,135"
          fill="#F6B8B8"
          stroke="#17172A"
          strokeLinejoin="round"
          strokeWidth="2.8"
        />
        {/* Bag pocket / fold line */}
        <line stroke="#17172A" strokeWidth="2" x1="15" x2="95" y1="35" y2="35" />
        <rect fill="#FFFDFC" height="40" rx="6" stroke="#17172A" strokeWidth="2" width="50" x="30" y="60" />
        {/* Tag on bag */}
        <circle cx="55" cy="74" fill="#F9E37D" r="8" stroke="#17172A" strokeWidth="1.8" />
        <path d="M52 74 L55 77 L60 71" fill="none" stroke="#17172A" strokeLinecap="round" strokeWidth="1.8" />
        <line stroke="#17172A" strokeLinecap="round" strokeWidth="2" x1="38" x2="72" y1="90" y2="90" />
      </g>

      {/* Gift box on the right */}
      <g transform="translate(235, 110)">
        {/* Box shadow */}
        <rect
          fill="#CFEBD8"
          height="75"
          rx="4"
          stroke="#17172A"
          strokeWidth="2.5"
          width="85"
          x="0"
          y="15"
        />
        {/* Lid */}
        <rect
          fill="#DCC8F6"
          height="18"
          rx="4"
          stroke="#17172A"
          strokeWidth="2.5"
          width="95"
          x="-5"
          y="5"
        />
        {/* Ribbon vertical */}
        <rect fill="#F9E37D" height="75" stroke="#17172A" strokeWidth="1.8" width="16" x="34" y="15" />
        <rect fill="#F9E37D" height="18" stroke="#17172A" strokeWidth="1.8" width="16" x="34" y="5" />
        {/* Ribbon bow */}
        <path d="M42 5 C 30 -10, 15 2, 40 5" fill="#F9E37D" stroke="#17172A" strokeWidth="2" />
        <path d="M42 5 C 54 -10, 69 2, 44 5" fill="#F9E37D" stroke="#17172A" strokeWidth="2" />
      </g>

      {/* Small floating tag */}
      <g transform="translate(70, 95) rotate(-12)">
        <polygon points="0,15 35,0 70,15 70,45 0,45" fill="#FFFDFC" stroke="#17172A" strokeWidth="2" />
        <circle cx="35" cy="12" fill="#17172A" r="3" />
        <text fill="#17172A" fontFamily="sans-serif" fontSize="12" fontWeight="bold" x="14" y="34">
          $49
        </text>
      </g>
    </svg>
  );
}

export function AIDashboardSvg({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 400 240"
    >
      {/* Background canvas */}
      <rect fill="#DCC8F6" height="240" width="400" />

      {/* Dashboard frame */}
      <rect
        fill="#FFFDFC"
        height="200"
        rx="8"
        stroke="#17172A"
        strokeWidth="2.5"
        width="360"
        x="20"
        y="20"
      />

      {/* Window bar */}
      <line stroke="#17172A" strokeWidth="2.2" x1="20" x2="380" y1="50" y2="50" />
      <circle cx="38" cy="35" fill="#F6B8B8" r="4" stroke="#17172A" strokeWidth="1.5" />
      <circle cx="52" cy="35" fill="#F9E37D" r="4" stroke="#17172A" strokeWidth="1.5" />
      <circle cx="66" cy="35" fill="#CFEBD8" r="4" stroke="#17172A" strokeWidth="1.5" />

      {/* Top title label */}
      <rect fill="#FFF0B0" height="18" rx="4" stroke="#17172A" strokeWidth="1.5" width="130" x="90" y="26" />
      <text fill="#17172A" fontFamily="sans-serif" fontSize="9" fontWeight="bold" x="105" y="38">
        AI Analytics Hub ⚡
      </text>

      {/* Left sidebar */}
      <line stroke="#17172A" strokeWidth="2" x1="85" x2="85" y1="50" y2="220" />
      <rect fill="#CFEBD8" height="12" rx="3" stroke="#17172A" strokeWidth="1.2" width="45" x="30" y="65" />
      <rect fill="#DCC8F6" height="12" rx="3" stroke="#17172A" strokeWidth="1.2" width="45" x="30" y="85" />
      <rect fill="#F6B8B8" height="12" rx="3" stroke="#17172A" strokeWidth="1.2" width="45" x="30" y="105" />
      <rect fill="#FFF0B0" height="12" rx="3" stroke="#17172A" strokeWidth="1.2" width="45" x="30" y="125" />

      {/* Top 3 KPI Cards */}
      <g transform="translate(95, 62)">
        {/* KPI 1: Green */}
        <rect fill="#CFEBD8" height="42" rx="6" stroke="#17172A" strokeWidth="1.8" width="80" x="0" y="0" />
        <text fill="#17172A" fontFamily="sans-serif" fontSize="7" fontWeight="bold" x="8" y="14">
          Accuracy
        </text>
        <text fill="#17172A" fontFamily="sans-serif" fontSize="14" fontWeight="bold" x="8" y="32">
          99.4%
        </text>

        {/* KPI 2: Yellow */}
        <rect fill="#FFF0B0" height="42" rx="6" stroke="#17172A" strokeWidth="1.8" width="85" x="90" y="0" />
        <text fill="#17172A" fontFamily="sans-serif" fontSize="7" fontWeight="bold" x="98" y="14">
          Tokens / sec
        </text>
        <text fill="#17172A" fontFamily="sans-serif" fontSize="14" fontWeight="bold" x="98" y="32">
          1,480
        </text>

        {/* KPI 3: Pink */}
        <rect fill="#F6B8B8" height="42" rx="6" stroke="#17172A" strokeWidth="1.8" width="80" x="185" y="0" />
        <text fill="#17172A" fontFamily="sans-serif" fontSize="7" fontWeight="bold" x="193" y="14">
          Automations
        </text>
        <text fill="#17172A" fontFamily="sans-serif" fontSize="14" fontWeight="bold" x="193" y="32">
          2,450+
        </text>
      </g>

      {/* Main Chart Area */}
      <g transform="translate(95, 115)">
        <rect
          fill="#FFF8E8"
          height="92"
          rx="6"
          stroke="#17172A"
          strokeWidth="2"
          width="265"
          x="0"
          y="0"
        />
        {/* Grid lines */}
        <line stroke="#17172A" strokeDasharray="3 4" strokeOpacity="0.2" strokeWidth="1" x1="15" x2="250" y1="25" y2="25" />
        <line stroke="#17172A" strokeDasharray="3 4" strokeOpacity="0.2" strokeWidth="1" x1="15" x2="250" y1="50" y2="50" />
        <line stroke="#17172A" strokeDasharray="3 4" strokeOpacity="0.2" strokeWidth="1" x1="15" x2="250" y1="75" y2="75" />

        {/* Purple line chart area */}
        <path
          d="M20 70 Q 55 55 85 45 T 150 50 T 210 25 T 250 18 L 250 82 L 20 82 Z"
          fill="#DCC8F6"
          opacity="0.6"
        />
        <path
          d="M20 70 Q 55 55 85 45 T 150 50 T 210 25 T 250 18"
          fill="none"
          stroke="#7653D8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.2"
        />

        {/* Nodes on chart */}
        <circle cx="85" cy="45" fill="#FFFDFC" r="4" stroke="#7653D8" strokeWidth="2.2" />
        <circle cx="150" cy="50" fill="#FFFDFC" r="4" stroke="#7653D8" strokeWidth="2.2" />
        <circle cx="210" cy="25" fill="#F9E37D" r="5" stroke="#17172A" strokeWidth="2" />
      </g>
    </svg>
  );
}

