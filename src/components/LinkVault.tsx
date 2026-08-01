import { linkGroups } from '../data/links'

type LinkVaultProps = {
  onBack?: () => void
  embedded?: boolean
}

export function LinkVault({ onBack, embedded = false }: LinkVaultProps) {
  const total = linkGroups.reduce((n, g) => n + g.items.length, 0)

  return (
    <section className={`link-vault ${embedded ? 'is-embedded' : ''}`} id="link-vault">
      <div className="link-vault-glow" aria-hidden="true" />

      <div className="link-vault-head">
        <div className="link-vault-intro">
          <p className="eyebrow">لینک‌دونی</p>
          <h2>دانلود مستقیم آزمون‌ها</h2>
          <p>
            اینا همون فایل‌هایی‌ان که برای اجرای برنامه لازم داری — آزمون و پاسخنامه. بزن روشون
            مستقیم دانلود می‌شه.
          </p>
          <div className="link-vault-stats" aria-label="آمار لینک‌دونی">
            <span>
              <strong>{total}</strong>
              لینک آماده
            </span>
            <span>
              <strong>{linkGroups.length}</strong>
              دسته آزمون
            </span>
          </div>
        </div>
        {onBack && (
          <button type="button" className="ghost" onClick={onBack}>
            برگشت
          </button>
        )}
      </div>

      <nav className="link-jump" aria-label="دسته‌بندی آزمون‌ها">
        {linkGroups.map((group) => (
          <a key={group.id} className="link-jump-chip" href={`#vault-${group.id}`}>
            <span>{group.title}</span>
            <em>{group.items.length}</em>
          </a>
        ))}
      </nav>

      <div className="link-groups">
        {linkGroups.map((group, groupIndex) => (
          <div
            key={group.id}
            className="link-group"
            id={`vault-${group.id}`}
            style={{ animationDelay: `${0.05 + groupIndex * 0.04}s` }}
          >
            <div className="link-group-head">
              <span className="link-group-index" aria-hidden="true">
                {String(groupIndex + 1).padStart(2, '0')}
              </span>
              <div>
                <h3>{group.title}</h3>
                <p>{group.items.length} فایل دانلود</p>
              </div>
            </div>
            <ul>
              {group.items.map((item, itemIndex) => (
                <li key={`${item.url}-${item.title}`}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" download>
                    <span className="link-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                        <path
                          d="M12 4v11m0 0 4.5-4.5M12 15l-4.5-4.5M5 19h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="link-copy">
                      <strong>{item.title}</strong>
                      {item.note && <em>{item.note}</em>}
                    </span>
                    <span className="link-action">دانلود</span>
                    <span className="link-row-num" aria-hidden="true">
                      {itemIndex + 1}
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
