import React, { useId } from 'react';

// Traditional Japanese seigaiha (wave) pattern rendered as a tiled SVG.
export default function SeigaihaPattern({ className, color = '#D4AF37', strokeWidth = 2 }) {
  const raw = useId();
  const pid = `seigaiha-${raw.replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id={pid} width="56" height="28" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth={strokeWidth}>
            <circle cx="28" cy="28" r="27" />
            <circle cx="28" cy="28" r="20" />
            <circle cx="28" cy="28" r="13" />
            <circle cx="0" cy="28" r="27" />
            <circle cx="0" cy="28" r="20" />
            <circle cx="0" cy="28" r="13" />
            <circle cx="56" cy="28" r="27" />
            <circle cx="56" cy="28" r="20" />
            <circle cx="56" cy="28" r="13" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  );
}