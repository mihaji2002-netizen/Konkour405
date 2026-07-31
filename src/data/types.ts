export type ScheduleBlock = {
  time: string
  title: string
  detail?: string
}

export type DayPlan = {
  id: string
  dayName: string
  dateLabel: string
  shortLabel: string
  tableSummary: string
  note?: string
  tip?: string
  blocks: ScheduleBlock[]
}

export type GroupIntro = {
  title: string
  lead: string
  how: string
  whyGozine2: string
  timeNote: string
  percentTip: string
}
