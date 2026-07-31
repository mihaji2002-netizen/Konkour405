type TelegramLinkProps = {
  variant?: 'hero' | 'nav' | 'chip'
}

export function TelegramLink({ variant = 'nav' }: TelegramLinkProps) {
  return (
    <a
      className={`tg-link tg-${variant}`}
      href="https://t.me/pepsinogenacademy"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="ورود به کانال تلگرام پپسینوژن"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
        <path
          fill="currentColor"
          d="M9.04 15.46 8.87 19c.24 0 .34-.1.47-.23l2.24-2.15 4.64 3.4c.85.47 1.46.22 1.69-.79l3.06-14.4h.01c.27-1.26-.46-1.75-1.29-1.44L2.3 9.27c-1.22.48-1.2 1.16-.21 1.47l4.71 1.47 10.95-6.9c.52-.31.99-.14.6.2"
        />
      </svg>
      <span>{variant === 'chip' ? 'کانال' : 'ورود به کانال'}</span>
    </a>
  )
}
