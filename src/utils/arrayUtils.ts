export function previousArrayValue<ArrayType>(
  array: ArrayType[],
  index: number
): ArrayType {
  if (index === 0) index = array.length
  index -= 1
  return array[index]
}
export function nextArrayValue<ArrayType>(
  array: ArrayType[],
  index: number
): ArrayType {
  index += 1
  index = index % array.length
  return array[index]
}
