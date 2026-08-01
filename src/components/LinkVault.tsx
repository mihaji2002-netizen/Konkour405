import { linkGroups } from '../data/links'

type LinkVaultProps = {
  onBack?: () => void
  embedded?: boolean
}

export function LinkVault({ onBack, embedded = false }: LinkVaultProps) {
  const total = linkGroups.reduce((n, g) => n + g.items.length, 0)

  return (
    <section className={`link-vault ${embedded ? 'is-embedded' : ''}`} id="link-vault">
      <div className="link-vault-head">
        <div>
          <p className="eyebrow">لینک‌دونی</p>
          <h2>دانلود مستقیم آزمون‌ها</h2>
          <p>
            اینا همون فایل‌هایی‌ان که برای اجرای برنامه لازم داری — آزمون و پاسخنامه. بزن روشون
            مستقیم دانلود می‌شه.
          </p>
          <p className="link-count">{total} لینک آماده</p>
        </div>
        {onBack && (
          <button type="button" className="ghost" onClick={onBack}>
            برگشت
          </button>
        )}
      </div>

      <div className="link-groups">
        {linkGroups.map((group) => (
          <div key={group.id} className="link-group">
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item.url}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" download>
                    <span className="link-icon" aria-hidden="true">
                      ↓
                    </span>
                    <span className="link-copy">
                      <strong>{item.title}</strong>
                      {item.note && <em>{item.note}</em>}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
