type LogoProps = {
  size?: 'hero' | 'nav'
}

export function Logo({ size = 'hero' }: LogoProps) {
  return (
    <span className={`logo-wrap logo-wrap-${size}`} aria-hidden={false}>
      <span className="logo-ring" aria-hidden="true" />
      <span className="logo-ring logo-ring-delay" aria-hidden="true" />
      <img
        className={`logo logo-${size}`}
        src="/pepsino-lab-logo.png"
        alt="pepsino LAB"
        width={size === 'hero' ? 220 : 48}
        height={size === 'hero' ? 220 : 48}
        decoding="async"
      />
    </span>
  )
}
