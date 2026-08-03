import { useEffect, useMemo, useState } from 'react'
import { LinkVault } from './components/LinkVault'
import { Logo } from './components/Logo'
import { Signature } from './components/Signature'
import { TelegramLink } from './components/TelegramLink'
import { withHearts } from './components/withHearts'
import { groupADays, groupAIntro } from './data/groupA'
import { groupBDays, groupBIntro } from './data/groupB'
import { mathDays, mathIntro } from './data/math'
import type { DayPlan, GroupIntro } from './data/types'
import './App.css'

type Track = 'A' | 'B' | 'math'
type Group = Track | null
type Screen = 'home' | 'links'

const GROUP_KEY = 'konkur1405-group'

const trackMeta: Record<
  Track,
  {
    label: string
    shortLabel: string
    intro: GroupIntro
    days: DayPlan[]
    finaleId: string
    finaleKicker: string
    route: { span: string; title: string }[]
  }
> = {
  A: {
    label: 'گروه A',
    shortLabel: 'گروه A',
    intro: groupAIntro,
    days: groupADays,
    finaleId: '30',
    finaleKicker: '۳۰ مرداد · روز موعود',
    route: [
      { span: '۱۱ تا ۱۶', title: 'فرجه ریاضی + تست' },
      { span: '۱۷ و ۲۰', title: 'نهایی ریاضی و زیست' },
      { span: '۲۱ تا ۲۹', title: 'جامع و تورق' },
      { span: '۳۰ مرداد', title: 'کنکور ۱۴۰۵' },
    ],
  },
  B: {
    label: 'گروه B',
    shortLabel: 'گروه B',
    intro: groupBIntro,
    days: groupBDays,
    finaleId: '30',
    finaleKicker: '۳۰ مرداد · روز موعود',
    route: [
      { span: '۱۱ تا ۱۶', title: 'فرجه ریاضی + تست' },
      { span: '۱۷ و ۲۰', title: 'نهایی ریاضی و زیست' },
      { span: '۲۱ تا ۲۹', title: 'جامع و تورق' },
      { span: '۳۰ مرداد', title: 'کنکور ۱۴۰۵' },
    ],
  },
  math: {
    label: 'رشته ریاضی',
    shortLabel: 'ریاضی',
    intro: mathIntro,
    days: mathDays,
    finaleId: '29',
    finaleKicker: '۲۹ مرداد · روز موعود',
    route: [
      { span: '۱۳ تا ۱۶', title: 'فرجه حسابان + تست' },
      { span: '۱۷ و ۲۰', title: 'نهایی حسابان و گسسته' },
      { span: '۲۱ تا ۲۸', title: 'جامع و تورق' },
      { span: '۲۹ مرداد', title: 'کنکور ۱۴۰۵' },
    ],
  },
}

function doneKey(group: Track) {
  return `konkur1405-done-${group}`
}

function loadDone(group: Track): Record<string, boolean> {
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

function PlanView({ group, onReset }: { group: Track; onReset: () => void }) {
  const meta = trackMeta[group]
  const { intro, days, finaleId, finaleKicker, route, label } = meta
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
            <p className="brand-kicker">pepsino LAB · {label}</p>
            <p className="brand small">برنامه جمع‌بندی کنکور ۱۴۰۵</p>
          </div>
        </div>
        <div className="top-meta">
          <div className="top-dates" aria-hidden="true">
            {route.map((item) => (
              <span key={item.span}>{item.span}</span>
            ))}
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
                عوض کردن برنامه
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="intro">
        <p className="eyebrow">{label}</p>
        <h1>{intro.title}</h1>
        <p>{intro.lead}</p>
        <p>{intro.how}</p>
        <p className="why">{intro.whyGozine2}</p>
        <p className="soft-note">{intro.timeNote}</p>
        <p className="percent-tip">{intro.percentTip}</p>
      </section>

      <section className="route" aria-label="تقویم فرجه">
        {route.map((item) => (
          <div className="route-item" key={item.span}>
            <span>{item.span}</span>
            <strong>{item.title}</strong>
          </div>
        ))}
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
                  className={day.id === finaleId ? 'row-finale' : undefined}
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
          const isFinale = day.id === finaleId
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
                  <p className="finale-kicker">{finaleKicker}</p>
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
        <span>pepsino LAB · برنامه جمع‌بندی کنکور ۱۴۰۵ · {label}</span>
        <Signature tone="dark" />
        <TelegramLink variant="chip" />
      </footer>
    </div>
  )
}

function isTrack(value: string | null): value is Track {
  return value === 'A' || value === 'B' || value === 'math'
}

export default function App() {
  const [group, setGroup] = useState<Group>(() => {
    const saved = localStorage.getItem(GROUP_KEY)
    return isTrack(saved) ? saved : null
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
              <div className="hero-top-logos" aria-label="لوگوها">
                <Logo size="nav" />
                <img
                  className="partner-logo"
                  src={`${import.meta.env.BASE_URL}roozbeh-khaksar-logo.png`}
                  alt="روزبه خاکسار — گروه مشاوره و برنامه‌ریزی"
                  width={148}
                  height={148}
                  decoding="async"
                />
              </div>
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
                    شیمی ۱۰ مرداد تموم می‌شه، ریاضی ۱۷ و زیست/گسسته ۲۰ مرداده، کنکور آخر مرداد.
                    برنامه از فرجه ریاضی تا خود کنکور آماده‌ست — اول رشته‌ت و مسیرت رو انتخاب کن.
                  </p>
                  <div className="hero-cta-row">
                    <button type="button" className="vault-btn" onClick={() => setScreen('links')}>
                      لینک‌دونی آزمون‌ها
                    </button>
                    <TelegramLink variant="hero" />
                  </div>
                </div>
              </div>

              <div className="track-sections">
                <div className="track-block">
                  <p className="track-eyebrow">تجربی</p>
                  <p className="track-hint">دو گروه جدا — بگو کدوم وضعیتی.</p>
                  <div className="group-pick" aria-label="انتخاب گروه تجربی">
                    <button
                      type="button"
                      className="group-btn group-a"
                      onClick={() => setGroup('A')}
                    >
                      <span className="group-tag">گروه A</span>
                      <strong>پایه رو برای کنکور خوندم</strong>
                      <p>الان نیاز به مرور دارم برای زنده کردن توانایی‌هام توی پایه دهم و یازدهم.</p>
                    </button>

                    <button
                      type="button"
                      className="group-btn group-b"
                      onClick={() => setGroup('B')}
                    >
                      <span className="group-tag">گروه B</span>
                      <strong>پایه رو خوب نخوندم</strong>
                      <p>سرمایه‌گذاری‌م روی دوازدهم بوده برای درصد گرفتن از کنکور.</p>
                    </button>
                  </div>
                </div>

                <div className="track-block track-math">
                  <p className="track-eyebrow">ریاضی</p>
                  <p className="track-hint">بدون گروه‌بندی — یه برنامه واحد برای رشته ریاضی.</p>
                  <button
                    type="button"
                    className="group-btn group-math"
                    onClick={() => setGroup('math')}
                    aria-label="برنامه رشته ریاضی"
                  >
                    <span className="group-tag">رشته ریاضی</span>
                    <strong>دوازدهم رو برای نهایی خوندم، پایه رو مدت‌ها سراغش نرفتم</strong>
                    <p>
                      توی فرجه حسابان و گسسته با دوپینگ و گزینه‌۲ پایه رو زنده می‌کنیم، بعدش می‌ریم
                      سراغ جامع و استراتژی کنکور.
                    </p>
                  </button>
                </div>
              </div>
            </div>

            <div className="hero-dates" aria-label="تقویم فرجه">
              <div>
                <span>۱۳ تا ۱۶</span>
                <strong>فرجه + تست پایه</strong>
              </div>
              <div>
                <span>۱۷ و ۲۰</span>
                <strong>نهایی‌ها</strong>
              </div>
              <div>
                <span>۲۱ تا ۲۸</span>
                <strong>جامع و تورق</strong>
              </div>
              <div>
                <span>۲۹ / ۳۰</span>
                <strong>کنکور ۱۴۰۵</strong>
              </div>
            </div>

            <Signature tone="light" />
          </div>
        </section>
      </div>
    )
  }

  return <PlanView group={group} onReset={resetGroup} />
}
