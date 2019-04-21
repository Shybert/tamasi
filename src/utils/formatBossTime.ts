export default function formatBossTime(
  timeInMilliseconds: number,
  includeMilliseconds: boolean = true
) {
  const date: Date = new Date(timeInMilliseconds)

  // Convert date to relevant time, then pad it with leading zeroes
  const hours: string = Math.floor(timeInMilliseconds / 3600000)
    .toString()
    .padStart(2, '0')
  const minutes: string = date
    .getUTCMinutes()
    .toString()
    .padStart(2, '0')
  const seconds: string = date
    .getUTCSeconds()
    .toString()
    .padStart(2, '0')
  const milliseconds: string = date
    .getUTCMilliseconds()
    .toString()
    .padStart(3, '0')

  const formattedTime: string = `${hours}:${minutes}:${seconds}${
    includeMilliseconds ? `.${milliseconds}` : ''
  }`

  return formattedTime
}
