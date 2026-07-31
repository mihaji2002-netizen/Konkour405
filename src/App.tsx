import { useEffect, useMemo, useState } from 'react'
import { Logo } from './components/Logo'
import { groupADays, groupAIntro } from './data/groupA'
import { groupBDays, groupBIntro } from './data/groupB'
import type { DayPlan, GroupIntro } from './data/types'
import './App.css'

type Group = 'A' | 'B' | null

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
        <div className="brand-lockup">
          <Logo size="nav" />
          <div>
            <p className="brand-kicker">pepsino LAB · گروه {group}</p>
            <p className="brand small">فرجه ۱۴۰۵</p>
          </div>
        </div>
        <div className="top-meta">
          <div className="top-dates" aria-hidden="true">
            <span>۱۰ شیمی</span>
            <span className="hot">۱۱–۱۶ فرجه</span>
            <span>۱۷ ریاضی</span>
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
            <button type="button" className="ghost" onClick={onReset}>
              عوض کردن گروه
            </button>
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
          <span>۱۰ مرداد</span>
          <strong>پایان شیمی</strong>
        </div>
        <div className="route-item is-now">
          <span>۱۱ تا ۱۶</span>
          <strong>فرجه ریاضی + تست</strong>
        </div>
        <div className="route-item">
          <span>۱۷ مرداد</span>
          <strong>نهایی ریاضی</strong>
        </div>
        <div className="route-item">
          <span>۳۰ مرداد</span>
          <strong>کنکور</strong>
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
                <th>روز</th>
                <th>تاریخ</th>
                <th>خلاصه کار</th>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day.id}>
                  <td>
                    <button
                      type="button"
                      className="linkish"
                      onClick={() => {
                        setActiveDay(day.id)
                        scrollToDay(day.id)
                      }}
                    >
                      {day.dayName}
                    </button>
                  </td>
                  <td>{day.dateLabel}</td>
                  <td>{day.tableSummary}</td>
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

      <section className="days">
        <div className="section-head">
          <h2>اجرای روزبه‌روز</h2>
          <p>برای هر روز جزئیات کامل اومده؛ تیک بزن که جا نمونی.</p>
        </div>

        {days.map((day, dayIndex) => (
          <article
            key={day.id}
            id={`day-${day.id}`}
            className={`day-panel ${activeDay === day.id ? 'is-active' : ''}`}
          >
            <header className="day-head">
              <span className="day-index">{String(dayIndex + 1).padStart(2, '0')}</span>
              <div>
                <p className="day-date">
                  {day.dayName} · {day.dateLabel}
                </p>
                <h3>{day.tableSummary}</h3>
              </div>
            </header>

            {day.note && <p className="soft-note">{day.note}</p>}
            {day.tip && <p className="day-tip">{day.tip}</p>}

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
                        <span className="block-title">{block.title}</span>
                        {block.detail && <span className="block-detail">{block.detail}</span>}
                      </span>
                    </label>
                  </li>
                )
              })}
            </ol>
          </article>
        ))}
      </section>

      <footer className="foot">
        <Logo size="nav" />
        <span>pepsino LAB · فرجه ۱۴۰۵ · گروه {group}</span>
      </footer>
    </div>
  )
}

export default function App() {
  const [group, setGroup] = useState<Group>(() => {
    const saved = localStorage.getItem(GROUP_KEY)
    return saved === 'A' || saved === 'B' ? saved : null
  })

  useEffect(() => {
    if (group) localStorage.setItem(GROUP_KEY, group)
  }, [group])

  function resetGroup() {
    setGroup(null)
    localStorage.removeItem(GROUP_KEY)
  }

  if (!group) {
    return (
      <div className="landing">
        <section className="hero-bleed">
          <div className="hero-mesh" aria-hidden="true" />
          <div className="hero-core">
            <div className="hero-brand-row">
              <Logo size="hero" />
              <div className="hero-brand-copy">
                <p className="brand-kicker light">pepsino LAB · GET ACTIVE TO GROW</p>
                <p className="brand">فرجه ۱۴۰۵</p>
                <p className="hero-lead">
                  شیمی ۱۰ مرداد تموم می‌شه، ریاضی ۱۷ مرداده، کنکور ۳۰ مرداد. از این فرجه هم نهایی رو
                  جمع می‌کنیم هم تست می‌زنیم — اول بگو جزو کدوم گروهی.
                </p>
              </div>
            </div>

            <div className="hero-dates" aria-label="تقویم فرجه">
              <div>
                <span>۱۰ مرداد</span>
                <strong>پایان شیمی</strong>
              </div>
              <div className="is-hot">
                <span>۱۱ تا ۱۶</span>
                <strong>فرجه ریاضی + تست</strong>
              </div>
              <div>
                <span>۱۷ مرداد</span>
                <strong>نهایی ریاضی</strong>
              </div>
              <div>
                <span>۳۰ مرداد</span>
                <strong>کنکور</strong>
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
