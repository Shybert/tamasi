export default function formatBossTime(timeInMilliseconds: number) {
  const date = new Date(timeInMilliseconds)

  const hours = Math.floor(timeInMilliseconds / 3600000)
  const hoursString = hours ? `${hours}h` : ''

  const minutes = date.getUTCMinutes()
  const minutesString = minutes ? `${minutes}m` : ''

  const seconds = date.getUTCSeconds()
  const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0')
  const secondsString = `${seconds}.${milliseconds}s`

  return [hoursString, minutesString, secondsString].join(' ')
}
