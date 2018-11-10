export function number (value: any): string | null {
  if (!(typeof value === 'number')) return 'Value must be a number.'
  return null
}
export function integer (value: any): string | null {
  if (!Number.isInteger(value)) return 'Value must be an integer.'
  return null
}
export function moreThan (value: any, option: number): string | null {
  if (value < option) return `Value cannot be lower than ${option}`
  return null
}
export function lessThan (value: any, option: number): string | null {
  if (value > option) return `Value cannot be higher than ${option}`
  return null
}
