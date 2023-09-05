export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object')
    return obj

  let clone: any
  if (Array.isArray(obj))
    clone = []
  else
    clone = Object.create(null)

  for (const key of Object.keys(obj))
    (clone as any)[key] = deepClone(obj[key as keyof typeof obj])
  return clone
}

export function getRandomNeutralColor(): string {
  const red = Math.floor(Math.random() * 86 + 85)
  const green = Math.floor(Math.random() * 86 + 85)
  const blue = Math.floor(Math.random() * 86 + 85)
  const color = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
  return color
}
