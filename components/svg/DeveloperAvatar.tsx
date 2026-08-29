import React from "react";

export function DeveloperAvatar({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 280 280"
    >
      {/* Pastel backdrop blob */}
      <circle
        cx="140"
        cy="140"
        fill="#F9E37D"
        r="125"
        stroke="#17172A"
        strokeWidth="3"
      />

      {/* Decorative stars behind head */}
      <path
        d="M50 60 L53 68 L61 70 L53 72 L50 80 L47 72 L39 70 L47 68 Z"
        fill="#F6B8B8"
        stroke="#17172A"
        strokeWidth="1.5"
      />
      <path
        d="M230 75 L232 82 L240 84 L232 86 L230 93 L228 86 L220 84 L228 82 Z"
        fill="#DCC8F6"
        stroke="#17172A"
        strokeWidth="1.5"
      />

      {/* Purple hoodie body */}
      <path
        d="M55 260 C 55 200, 90 175, 140 175 C 190 175, 225 200, 225 260 Z"
        fill="#7653D8"
        stroke="#17172A"
        strokeLinejoin="round"
        strokeWidth="3.5"
      />
      {/* Hoodie drawstring & collar */}
      <path
        d="M110 176 Q 140 215 170 176"
        fill="#5E3EB5"
        stroke="#17172A"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <line stroke="#FFFDFC" strokeLinecap="round" strokeWidth="3" x1="130" x2="128" y1="195" y2="225" />
      <line stroke="#FFFDFC" strokeLinecap="round" strokeWidth="3" x1="150" x2="152" y1="195" y2="225" />

      {/* Neck */}
      <rect
        fill="#F7D9BB"
        height="32"
        stroke="#17172A"
        strokeWidth="3"
        width="38"
        x="121"
        y="152"
      />

      {/* Head / Face */}
      <ellipse
        cx="140"
        cy="125"
        fill="#F7D9BB"
        rx="44"
        ry="48"
        stroke="#17172A"
        strokeWidth="3.2"
      />

      {/* Ears */}
      <circle cx="94" cy="125" fill="#F7D9BB" r="10" stroke="#17172A" strokeWidth="2.8" />
      <circle cx="186" cy="125" fill="#F7D9BB" r="10" stroke="#17172A" strokeWidth="2.8" />

      {/* Curly black hair */}
      <path
        d="M92 110 C 85 90, 100 65, 125 60 C 140 50, 165 55, 180 65 C 195 75, 195 95, 188 112 C 180 100, 165 95, 140 95 C 115 95, 100 102, 92 110 Z"
        fill="#17172A"
        stroke="#17172A"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      {/* Extra curls */}
      <circle cx="108" cy="72" fill="#17172A" r="12" />
      <circle cx="135" cy="62" fill="#17172A" r="14" />
      <circle cx="165" cy="68" fill="#17172A" r="13" />

      {/* Eyebrows */}
      <path d="M112 108 Q 124 104 130 108" fill="none" stroke="#17172A" strokeLinecap="round" strokeWidth="3" />
      <path d="M150 108 Q 156 104 168 108" fill="none" stroke="#17172A" strokeLinecap="round" strokeWidth="3" />

      {/* Glasses */}
      <rect
        fill="#FFFDFC"
        fillOpacity="0.3"
        height="22"
        rx="5"
        stroke="#17172A"
        strokeWidth="3.2"
        width="26"
        x="108"
        y="114"
      />
      <rect
        fill="#FFFDFC"
        fillOpacity="0.3"
        height="22"
        rx="5"
        stroke="#17172A"
        strokeWidth="3.2"
        width="26"
        x="146"
        y="114"
      />
      <line stroke="#17172A" strokeWidth="3.2" x1="134" x2="146" y1="123" y2="123" />
      <line stroke="#17172A" strokeWidth="2.8" x1="96" x2="108" y1="120" y2="123" />
      <line stroke="#17172A" strokeWidth="2.8" x1="172" x2="184" y1="123" y2="120" />

      {/* Eyes behind glasses */}
      <circle cx="121" cy="125" fill="#17172A" r="3.2" />
      <circle cx="159" cy="125" fill="#17172A" r="3.2" />
      <circle cx="122.5" cy="123.5" fill="#FFFDFC" r="1" />
      <circle cx="160.5" cy="123.5" fill="#FFFDFC" r="1" />

      {/* Friendly Smile */}
      <path
        d="M126 146 Q 140 158 154 146"
        fill="none"
        stroke="#17172A"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}

