type LogoProps = {
  size?: 'hero' | 'nav'
}

export function Logo({ size = 'hero' }: LogoProps) {
  return (
    <img
      className={`logo logo-${size}`}
      src="/pepsino-lab-logo.png"
      alt="pepsino LAB"
      width={size === 'hero' ? 220 : 48}
      height={size === 'hero' ? 220 : 48}
      decoding="async"
    />
  )
}
