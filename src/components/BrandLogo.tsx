export function BrandLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="Burguer Amostra"
      className="shrink-0"
    >
      <rect x="1" y="1" width="46" height="46" rx="10" className="fill-primary" />
      <path d="M11 18c0-5 6-8 13-8s13 3 13 8H11z" className="fill-primary-foreground" />
      <rect x="10" y="21" width="28" height="5" rx="2.5" className="fill-secondary" />
      <path
        d="M11 30h26c0 5-6 8-13 8s-13-3-13-8z"
        className="fill-primary-foreground"
      />
    </svg>
  );
}
