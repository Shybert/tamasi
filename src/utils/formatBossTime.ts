export default function formatBossTime(
  timeInMilliseconds: number,
  includeMilliseconds = true
) {
  const date: Date = new Date(timeInMilliseconds)

  // Convert date to relevant time, then pad it with leading zeroes
  const hours = Math.floor(timeInMilliseconds / 3600000)
    .toString()
    .padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  const seconds = date.getUTCSeconds().toString().padStart(2, '0')
  const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0')

  const formattedTime = `${hours}:${minutes}:${seconds}${
    includeMilliseconds ? `.${milliseconds}` : ''
  }`

  return formattedTime
}
