type SignatureProps = {
  tone?: 'light' | 'dark'
}

export function Signature({ tone = 'light' }: SignatureProps) {
  return (
    <div className={`signature signature-${tone}`}>
      <p className="signature-dedicate">تقدیم به صبور ترین نسل کنکور ایران</p>
      <p className="signature-name">
        Dr.haji <span className="signature-heart" aria-hidden="true">♥</span>
      </p>
    </div>
  )
}
