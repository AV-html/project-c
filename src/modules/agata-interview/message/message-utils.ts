import dayjs from 'dayjs'

export const getShortMonth = (date: string) => {
  const month = dayjs(date).format('MMM')
  return month.slice(0, 3)
}

export const getFormattedDate = (date: string) => {
  if (!date) return ''

  return `${dayjs(date).format('D')} ${getShortMonth(date)}, ${dayjs(date).format('HH:mm')}`
}
