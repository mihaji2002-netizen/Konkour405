import { useEffect, useMemo, useState } from 'react'
import { LinkVault } from './components/LinkVault'
import { Logo } from './components/Logo'
import { Signature } from './components/Signature'
import { TelegramLink } from './components/TelegramLink'
import { withHearts } from './components/withHearts'
import { groupADays, groupAIntro } from './data/groupA'
import { groupBDays, groupBIntro } from './data/groupB'
import type { DayPlan, GroupIntro } from './data/types'
import './App.css'

type Group = 'A' | 'B' | null
type Screen = 'home' | 'links'

const GROUP_KEY = 'konkur1405-group'

function doneKey(group: 'A' | 'B') {
  return `konkur1405-done-${group}`
}

function loadDone(group: 'A' | 'B'): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(doneKey(group)) || '{}')
  } catch {
    return {}
  }
}

function scrollToDay(id: string) {
  document.getElementById(`day-${id}`)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

function PlanView({
  group,
  intro,
  days,
  onReset,
}: {
  group: 'A' | 'B'
  intro: GroupIntro
  days: DayPlan[]
  onReset: () => void
}) {
  const [done, setDone] = useState<Record<string, boolean>>(() => loadDone(group))
  const [activeDay, setActiveDay] = useState(days[0].id)

  useEffect(() => {
    setDone(loadDone(group))
    setActiveDay(days[0].id)
  }, [group, days])

  useEffect(() => {
    localStorage.setItem(doneKey(group), JSON.stringify(done))
  }, [done, group])

  const totalBlocks = useMemo(() => days.reduce((n, d) => n + d.blocks.length, 0), [days])
  const doneCount = Object.values(done).filter(Boolean).length
  const progress = totalBlocks ? Math.round((doneCount / totalBlocks) * 100) : 0

  function toggleBlock(key: string) {
    setDone((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="shell plan">
      <header className="topbar">
        <div className="topbar-glow" aria-hidden="true" />
        <div className="brand-lockup">
          <Logo size="nav" />
          <div>
            <p className="brand-kicker">pepsino LAB · گروه {group}</p>
            <p className="brand small">برنامه جمع‌بندی کنکور ۱۴۰۵</p>
          </div>
        </div>
        <div className="top-meta">
          <div className="top-dates" aria-hidden="true">
            <span>۱۱–۱۶ ریاضی</span>
            <span>۱۷و۲۰ نهایی</span>
            <span>۲۱–۲۹ جامع</span>
            <span>۳۰ کنکور</span>
          </div>
          <div className="top-actions">
            <div className="progress-wrap" aria-label="پیشرفت برنامه">
              <span>
                {doneCount} از {totalBlocks}
              </span>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="top-btns">
              <a className="ghost link-chip" href="#link-vault">
                لینک‌دونی
              </a>
              <TelegramLink variant="chip" />
              <button type="button" className="ghost" onClick={onReset}>
                عوض کردن گروه
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="intro">
        <p className="eyebrow">گروه {group}</p>
        <h1>{intro.title}</h1>
        <p>{intro.lead}</p>
        <p>{intro.how}</p>
        <p className="why">{intro.whyGozine2}</p>
        <p className="soft-note">{intro.timeNote}</p>
        <p className="percent-tip">{intro.percentTip}</p>
      </section>

      <section className="route" aria-label="تقویم فرجه">
        <div className="route-item">
          <span>۱۱ تا ۱۶</span>
          <strong>فرجه ریاضی + تست</strong>
        </div>
        <div className="route-item">
          <span>۱۷ و ۲۰</span>
          <strong>نهایی ریاضی و زیست</strong>
        </div>
        <div className="route-item">
          <span>۲۱ تا ۲۹</span>
          <strong>جامع و تورق</strong>
        </div>
        <div className="route-item">
          <span>۳۰ مرداد</span>
          <strong>کنکور ۱۴۰۵</strong>
        </div>
      </section>

      <section className="table-wrap" id="overview">
        <div className="section-head">
          <h2>کل برنامه در یک نگاه</h2>
          <p>اول کل مسیر رو ببین، بعد برو سراغ جزئیات هر روز.</p>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th className="col-num">#</th>
                <th>روز</th>
                <th>تاریخ</th>
                <th>خلاصه کار</th>
              </tr>
            </thead>
            <tbody>
              {days.map((day, index) => (
                <tr
                  key={day.id}
                  className={day.id === '30' ? 'row-finale' : undefined}
                  onClick={() => {
                    setActiveDay(day.id)
                    scrollToDay(day.id)
                  }}
                >
                  <td className="col-num">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </td>
                  <td className="col-day">
                    <button type="button" className="linkish">
                      {day.dayName}
                    </button>
                  </td>
                  <td className="col-date">{day.dateLabel}</td>
                  <td className="col-summary">{day.tableSummary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <nav className="day-nav" aria-label="روزهای برنامه">
        {days.map((day) => (
          <button
            key={day.id}
            type="button"
            className={activeDay === day.id ? 'active' : ''}
            onClick={() => {
              setActiveDay(day.id)
              scrollToDay(day.id)
            }}
          >
            {day.shortLabel}
          </button>
        ))}
      </nav>

      <LinkVault embedded />

      <section className="days">
        <div className="section-head">
          <h2>اجرای روزبه‌روز</h2>
          <p>برای هر روز جزئیات کامل اومده؛ تیک بزن که جا نمونی.</p>
        </div>

        {days.map((day, dayIndex) => {
          const isFinale = day.id === '30'
          return (
            <article
              key={day.id}
              id={`day-${day.id}`}
              className={`day-panel ${activeDay === day.id ? 'is-active' : ''} ${isFinale ? 'is-finale' : ''}`}
            >
              <header className="day-head">
                <span className="day-index">{String(dayIndex + 1).padStart(2, '0')}</span>
                <div>
                  <p className="day-date">
                    {day.dayName} · {day.dateLabel}
                  </p>
                  <h3>{withHearts(day.tableSummary)}</h3>
                </div>
              </header>

              {day.note && <p className="soft-note">{withHearts(day.note)}</p>}
              {!isFinale && day.tip && <p className="day-tip">{withHearts(day.tip)}</p>}

              {isFinale ? (
                <div className="finale-card">
                  <p className="finale-kicker">۳۰ مرداد · روز موعود</p>
                  {day.blocks.map((block, index) => {
                    const key = `${day.id}-${index}`
                    const checked = Boolean(done[key])
                    return (
                      <label key={key} className={`finale-main ${checked ? 'done' : ''}`}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleBlock(key)}
                        />
                        <span>
                          <strong className="finale-title">{withHearts(block.title)}</strong>
                          {block.detail && (
                            <span className="finale-letter">{withHearts(block.detail)}</span>
                          )}
                        </span>
                      </label>
                    )
                  })}
                  <Signature tone="light" />
                </div>
              ) : (
                <ol className="blocks">
                  {day.blocks.map((block, index) => {
                    const key = `${day.id}-${index}`
                    const checked = Boolean(done[key])
                    return (
                      <li key={key} className={checked ? 'done' : ''}>
                        <label>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleBlock(key)}
                          />
                          <span className="block-body">
                            <span className="block-time">{block.time}</span>
                            <span className="block-title">{withHearts(block.title)}</span>
                            {block.detail && (
                              <span className="block-detail">{withHearts(block.detail)}</span>
                            )}
                          </span>
                        </label>
                      </li>
                    )
                  })}
                </ol>
              )}
            </article>
          )
        })}
      </section>

      <footer className="foot">
        <Logo size="nav" />
        <span>pepsino LAB · برنامه جمع‌بندی کنکور ۱۴۰۵ · گروه {group}</span>
        <Signature tone="dark" />
        <TelegramLink variant="chip" />
      </footer>
    </div>
  )
}

export default function App() {
  const [group, setGroup] = useState<Group>(() => {
    const saved = localStorage.getItem(GROUP_KEY)
    return saved === 'A' || saved === 'B' ? saved : null
  })
  const [screen, setScreen] = useState<Screen>('home')

  useEffect(() => {
    if (group) localStorage.setItem(GROUP_KEY, group)
  }, [group])

  function resetGroup() {
    setGroup(null)
    setScreen('home')
    localStorage.removeItem(GROUP_KEY)
  }

  if (screen === 'links') {
    return (
      <div className="shell links-page">
        <header className="topbar">
          <div className="topbar-glow" aria-hidden="true" />
          <div className="brand-lockup">
            <Logo size="nav" />
            <div>
              <p className="brand-kicker">pepsino LAB</p>
              <p className="brand small">لینک‌دونی آزمون‌ها</p>
            </div>
          </div>
          <div className="top-btns">
            <TelegramLink variant="chip" />
            <button type="button" className="ghost" onClick={() => setScreen('home')}>
              برگشت
            </button>
          </div>
        </header>
        <LinkVault onBack={() => setScreen('home')} />
        <footer className="foot">
          <Signature tone="dark" />
        </footer>
      </div>
    )
  }

  if (!group) {
    return (
      <div className="landing">
        <section className="hero-bleed">
          <div className="hero-mesh" aria-hidden="true" />
          <div className="hero-core">
            <div className="hero-topbar">
              <span className="hero-top-brand">pepsino LAB</span>
              <div className="hero-top-actions">
                <button type="button" className="vault-btn" onClick={() => setScreen('links')}>
                  لینک‌دونی آزمون‌ها
                </button>
                <TelegramLink variant="hero" />
              </div>
            </div>
            <div className="hero-main">
              <div className="hero-brand-row">
                <Logo size="hero" />
                <div className="hero-brand-copy">
                  <p className="brand-kicker light">GET ACTIVE TO GROW</p>
                  <p className="brand">برنامه جمع‌بندی کنکور ۱۴۰۵</p>
                  <p className="hero-lead">
                    شیمی ۱۰ مرداد تموم می‌شه، ریاضی ۱۷ و زیست ۲۰ مرداده، کنکور ۳۰ مرداد. برنامه از
                    فرجه ریاضی تا خود کنکور آماده‌ست — اول بگو جزو کدوم گروهی.
                  </p>
                  <div className="hero-cta-row">
                    <button type="button" className="vault-btn" onClick={() => setScreen('links')}>
                      لینک‌دونی آزمون‌ها
                    </button>
                    <TelegramLink variant="hero" />
                  </div>
                </div>
              </div>

              <div className="group-pick" aria-label="انتخاب گروه">
                <button type="button" className="group-btn group-a" onClick={() => setGroup('A')}>
                  <span className="group-tag">گروه A</span>
                  <strong>پایه رو برای کنکور خوندم</strong>
                  <p>الان نیاز به مرور دارم برای زنده کردن توانایی‌هام توی پایه دهم و یازدهم.</p>
                </button>

                <button type="button" className="group-btn group-b" onClick={() => setGroup('B')}>
                  <span className="group-tag">گروه B</span>
                  <strong>پایه رو خوب نخوندم</strong>
                  <p>سرمایه‌گذاری‌م روی دوازدهم بوده برای درصد گرفتن از کنکور.</p>
                </button>
              </div>
            </div>

            <div className="hero-dates" aria-label="تقویم فرجه">
              <div>
                <span>۱۱ تا ۱۶</span>
                <strong>فرجه ریاضی + تست</strong>
              </div>
              <div>
                <span>۱۷ و ۲۰</span>
                <strong>نهایی ریاضی و زیست</strong>
              </div>
              <div>
                <span>۲۱ تا ۲۹</span>
                <strong>جامع و تورق کنکور</strong>
              </div>
              <div>
                <span>۳۰ مرداد</span>
                <strong>کنکور ۱۴۰۵</strong>
              </div>
            </div>

            <Signature tone="light" />
          </div>
        </section>
      </div>
    )
  }

  if (group === 'A') {
    return (
      <PlanView group="A" intro={groupAIntro} days={groupADays} onReset={resetGroup} />
    )
  }

  return <PlanView group="B" intro={groupBIntro} days={groupBDays} onReset={resetGroup} />
}
