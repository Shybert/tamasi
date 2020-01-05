export function previousArrayIndex(array: any[], index: number): number {
  if (index === 0) return array.length - 1
  return index - 1
}
export function nextArrayIndex(array: any[], index: number): number {
  return (index + 1) % array.length
}
