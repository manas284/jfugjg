import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 50"
      width="100"
      height="40"
      {...props}
    >
      <rect x="2" y="5" width="46" height="40" rx="8" fill="hsl(var(--primary))" />
      <rect x="12" y="2" width="26" height="8" rx="4" fill="hsl(var(--primary))" />
      <path d="M12 10 h26" stroke="hsl(var(--background))" strokeWidth="3" />

      <path d="M15 20 h 20" stroke="hsl(var(--primary-foreground))" strokeWidth="3" strokeLinecap="round" />
      <path d="M15 28 h 20" stroke="hsl(var(--primary-foreground))" strokeWidth="3" strokeLinecap="round" />
      
      <path d="M28 35 l4 4 l8 -8" stroke="hsl(var(--accent))" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      <text
        x="60"
        y="35"
        fontFamily="Inter, sans-serif"
        fontSize="30"
        fontWeight="bold"
        fill="hsl(var(--foreground))"
      >
        Testo
      </text>
    </svg>
  );
}
