export type DownloadLink = {
  title: string
  url: string
  note?: string
}

export type LinkTrack = 'tajrobi' | 'math'

export type LinkGroup = {
  id: string
  title: string
  track: LinkTrack
  items: DownloadLink[]
}

export const linkGroups: LinkGroup[] = [
  {
    id: 'maz-28',
    title: 'ماز ۲۸ خرداد',
    track: 'tajrobi',
    items: [
      {
        title: 'ماز ۲۸ خرداد دفترچه یک',
        url: 'https://s27.uupload.ir/files/drhajiii/ماز%20۲۸%20خرداددفترچه%20یک.pdf',
      },
      { title: 'ماز ۲۸ خرداد دفترچه دو', url: 'https://my.uupload.ir/dl/yoWO2Ybk' },
      { title: 'ماز ۲۸ خرداد دفترچه سه', url: 'https://my.uupload.ir/dl/NdwXgKBo' },
      { title: 'ماز ۲۸ خرداد پاسخنامه', url: 'https://my.uupload.ir/dl/wZK2J8MW' },
    ],
  },
  {
    id: 'kheili-sabz',
    title: 'خیلی سبز',
    track: 'tajrobi',
    items: [
      { title: 'آزمون ۱۲ تیر خیلی سبز', url: 'https://my.uupload.ir/dl/yoWO28wJ' },
      { title: 'پاسخ آزمون ۱۲ تیر خیلی سبز', url: 'https://my.uupload.ir/dl/dx9VnkZN' },
    ],
  },
  {
    id: 'doping-25',
    title: 'دوپینگ ۲۵ خرداد',
    track: 'tajrobi',
    items: [
      { title: 'دوپینگ زیست ۲۵ خرداد', url: 'https://my.uupload.ir/dl/NdwXg2YR' },
      { title: 'پاسخ دوپینگ زیست ۲۵ خرداد', url: 'https://my.uupload.ir/dl/JgwyW2N2' },
      { title: 'دوپینگ ریاضی ۲۵ خرداد', url: 'https://my.uupload.ir/dl/0jk598dX' },
      { title: 'پاسخ دوپینگ ریاضی ۲۵ خرداد', url: 'https://my.uupload.ir/dl/NdwXg2kD' },
    ],
  },
  {
    id: 'doping-21',
    title: 'دوپینگ ۲۱ خرداد',
    track: 'tajrobi',
    items: [
      { title: 'آزمون دوپینگ ۲۱ خرداد زیست', url: 'https://my.uupload.ir/dl/0jk5952p' },
      { title: 'پاسخ دوپینگ ۲۱ خرداد زیست', url: 'https://my.uupload.ir/dl/JgwyWywN' },
      { title: 'دوپینگ شیمی ۲۱ خرداد', url: 'https://my.uupload.ir/dl/mbJGxG0z' },
      { title: 'پاسخ دوپینگ شیمی ۲۱ خرداد', url: 'https://my.uupload.ir/dl/yoWO2Og7' },
      { title: 'دوپینگ فیزیک ۲۱ خرداد', url: 'https://my.uupload.ir/dl/1Ldz70L9' },
      { title: 'پاسخ دوپینگ فیزیک ۲۱ خرداد', url: 'https://my.uupload.ir/dl/aG5XAgEg' },
      { title: 'دوپینگ ریاضی ۲۱ خرداد', url: 'https://my.uupload.ir/dl/5L15G828' },
      { title: 'پاسخ دوپینگ ریاضی ۲۱ خرداد', url: 'https://my.uupload.ir/dl/eyJKWmVx' },
    ],
  },
  {
    id: 'doping-11',
    title: 'دوپینگ ۱۱ خرداد',
    track: 'tajrobi',
    items: [
      { title: 'دوپینگ ۱۱ خرداد زیست', url: 'https://my.uupload.ir/dl/dx9VnQmd' },
      { title: 'پاسخ دوپینگ ۱۱ خرداد زیست', url: 'https://my.uupload.ir/dl/mbJGxQxv' },
      { title: 'دوپینگ ۱۱ خرداد فیزیک', url: 'https://my.uupload.ir/dl/wZK2JrzB' },
      { title: 'پاسخ دوپینگ ۱۱ خرداد فیزیک', url: 'https://my.uupload.ir/dl/zbmRJr99' },
      { title: 'دوپینگ ۱۱ خرداد شیمی', url: 'https://my.uupload.ir/dl/VXw7j0yo' },
      { title: 'پاسخ دوپینگ ۱۱ خرداد شیمی', url: 'https://my.uupload.ir/dl/mbJGxkbb' },
      { title: 'دوپینگ ۱۱ خرداد ریاضی', url: 'https://my.uupload.ir/dl/BvxmDN9B' },
      { title: 'پاسخ دوپینگ ۱۱ خرداد ریاضی', url: 'https://my.uupload.ir/dl/wZK2JABW' },
    ],
  },
  {
    id: 'doping-6',
    title: 'دوپینگ ۶ خرداد',
    track: 'tajrobi',
    items: [
      { title: 'دوپینگ زیست ۶ خرداد', url: 'https://my.uupload.ir/dl/VXw7jzMW' },
      { title: 'پاسخ دوپینگ زیست ۶ خرداد', url: 'https://my.uupload.ir/dl/eyJKWAnr' },
      { title: 'دوپینگ ۶ خرداد شیمی', url: 'https://my.uupload.ir/dl/n2JvyEYQ' },
      { title: 'پاسخ دوپینگ ۶ خرداد شیمی', url: 'https://my.uupload.ir/dl/n2JvyEbe' },
      { title: 'دوپینگ فیزیک ۶ خرداد', url: 'https://my.uupload.ir/dl/v9Vpw0rY' },
      { title: 'پاسخ دوپینگ فیزیک ۶ خرداد', url: 'https://my.uupload.ir/dl/dx9Vn1WQ' },
      { title: 'دوپینگ ۶ خرداد ریاضی', url: 'https://my.uupload.ir/dl/mbJGxkKn' },
      { title: 'پاسخ دوپینگ ۶ خرداد ریاضی', url: 'https://my.uupload.ir/dl/eyJKWAyQ' },
    ],
  },
  {
    id: 'doping-2',
    title: 'دوپینگ ۲ خرداد',
    track: 'tajrobi',
    items: [
      { title: 'دوپینگ زیست ۲ خرداد', url: 'https://my.uupload.ir/dl/kjLgGGge' },
      { title: 'پاسخ دوپینگ زیست ۲ خرداد', url: 'https://my.uupload.ir/dl/1Ldz77dV' },
      { title: 'دوپینگ شیمی ۲ خرداد', url: 'https://my.uupload.ir/dl/wZK2JJD9' },
      { title: 'پاسخ دوپینگ شیمی ۲ خرداد', url: 'https://my.uupload.ir/dl/mbJGxxMb' },
      { title: 'دوپینگ فیزیک ۲ خرداد', url: 'https://my.uupload.ir/dl/4eX5EEQD' },
      { title: 'پاسخ دوپینگ فیزیک ۲ خرداد', url: 'https://my.uupload.ir/dl/mbJGxxrg' },
      { title: 'دوپینگ ریاضی ۲ خرداد', url: 'https://my.uupload.ir/dl/5L15GGLd' },
      { title: 'پاسخ دوپینگ ریاضی ۲ خرداد', url: 'https://my.uupload.ir/dl/mbJGxx9N' },
    ],
  },
  {
    id: 'doping-29',
    title: 'دوپینگ ۲۹ اردیبهشت',
    track: 'tajrobi',
    items: [
      { title: 'دوپینگ زیست ۲۹ اردیبهشت', url: 'https://my.uupload.ir/dl/0jk599VX' },
      { title: 'پاسخ دوپینگ زیست ۲۹ اردیبهشت', url: 'https://my.uupload.ir/dl/JgwyWWdA' },
      { title: 'دوپینگ فیزیک ۲۹ اردیبهشت', url: 'https://my.uupload.ir/dl/wZK2JJz9' },
      { title: 'پاسخ دوپینگ فیزیک ۲۹ اردیبهشت', url: 'https://my.uupload.ir/dl/v9Vpww5Y' },
      { title: 'دوپینگ ریاضی ۲۹ اردیبهشت', url: 'https://my.uupload.ir/dl/ODw1EEoK' },
      { title: 'پاسخ دوپینگ ریاضی ۲۹ اردیبهشت', url: 'https://my.uupload.ir/dl/zbmRJJnb' },
    ],
  },
  {
    id: 'gozine2',
    title: 'گزینه‌۲',
    track: 'tajrobi',
    items: [
      { title: 'گزینه‌۲ ۱۲ دی + پاسخ', url: 'https://my.uupload.ir/dl/dx9VngZz' },
      {
        title: 'گزینه‌۲ ۲۶ دی',
        url: 'https://my.uupload.ir/dl/n2Jvy5JK',
        note: 'به علت شرایط ۳ بهمن برگزار شد',
      },
      { title: 'گزینه‌۲ ۷ فروردین + پاسخ', url: 'https://my.uupload.ir/dl/zbmRJLN9' },
      { title: 'گزینه‌۲ ۱۴ فروردین + پاسخ', url: 'https://my.uupload.ir/dl/NdwXgkk0' },
      { title: 'گزینه‌۲ ۲۱ فروردین + پاسخ', url: 'https://my.uupload.ir/dl/dx9Vngoz' },
      { title: 'گزینه‌۲ ۴ اردیبهشت + پاسخ', url: 'https://my.uupload.ir/dl/NdwX2rKA' },
      { title: 'گزینه‌۲ ۱۱ اردیبهشت + پاسخ', url: 'https://my.uupload.ir/dl/VXw72E1o' },
      { title: 'گزینه‌۲ ۱۸ اردیبهشت + پاسخ', url: 'https://my.uupload.ir/dl/v9VpbKr6' },
    ],
  },

  // ——— رشته ریاضی ———
  {
    id: 'math-maz-28',
    title: 'ماز ۲۸ خرداد ریاضی',
    track: 'math',
    items: [
      { title: 'ماز ۲۸ خرداد رشته ریاضی دفترچه یک', url: 'https://my.uupload.ir/dl/BvxQL5AW' },
      { title: 'ماز ۲۸ خرداد رشته ریاضی دفترچه دو', url: 'https://my.uupload.ir/dl/BvxQL5GR' },
      { title: 'پاسخ ماز ۲۸ خرداد رشته ریاضی', url: 'https://my.uupload.ir/dl/4eX0JaQD' },
    ],
  },
  {
    id: 'math-kheili-sabz',
    title: 'خیلی سبز ریاضی',
    track: 'math',
    items: [
      { title: 'خیلی سبز ۱۶ تیر رشته ریاضی', url: 'https://my.uupload.ir/dl/0jkOjmOG' },
    ],
  },
  {
    id: 'math-doping',
    title: 'دوپینگ ریاضی',
    track: 'math',
    items: [
      { title: 'دوپینگ ۲۱ خرداد رشته ریاضی', url: 'https://my.uupload.ir/dl/mbJAOALv' },
      {
        title: 'دوپینگ ۲۱ خرداد رشته ریاضی + پاسخ',
        url: 'https://my.uupload.ir/dl/NdwQzr9R',
      },
      {
        title: 'دوپینگ ۶ خرداد رشته ریاضی + پاسخ',
        url: 'https://s33.uupload.ir/files/drhajiii/12R-دوپینگ%206%20خرداد.zip',
        note: 'فایل زیپ',
      },
    ],
  },
  {
    id: 'math-gozine2',
    title: 'گزینه‌۲ ریاضی',
    track: 'math',
    items: [
      { title: 'گزینه‌۲ ۱۲ دی رشته ریاضی', url: 'https://my.uupload.ir/dl/EOkwOW9M' },
      { title: 'گزینه‌۲ ۷ فروردین رشته ریاضی', url: 'https://my.uupload.ir/dl/wZKGZpby' },
      { title: 'گزینه‌۲ ۱۴ فروردین رشته ریاضی', url: 'https://my.uupload.ir/dl/n2JV2WZK' },
      { title: 'گزینه‌۲ ۲۱ فروردین رشته ریاضی', url: 'https://my.uupload.ir/dl/eyJxy24V' },
    ],
  },
]
