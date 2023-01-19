import isYesterday from 'dayjs/plugin/isYesterday'
import isToday from 'dayjs/plugin/isToday'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import dayjs from 'dayjs'

dayjs.extend(isYesterday)
dayjs.extend(isToday)
dayjs.extend(isSameOrAfter)

const dayOfWeek = {
  [0]: 'Sunday',
  [1]: 'Monday',
  [2]: 'Tuesday',
  [3]: 'Wednesday',
  [4]: 'Thursday',
  [5]: 'Friday',
  [6]: 'Saturday'
}

export const useTimestamp = (timestamp: Date) => {
  if (dayjs(timestamp).isToday()) {
    return dayjs(timestamp).format('hh:mm A')
  } else if (dayjs(timestamp).isYesterday()) {
    return 'Yesterday'
  } else if (dayjs(timestamp).add(6, 'day').isSameOrAfter(new Date())) {
    return dayOfWeek[dayjs(timestamp).get('day')]
  }
  return dayjs(timestamp).format('MM.DD.YYYY')
}
