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

export function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++)
    color += letters[Math.floor(Math.random() * 16)]

  return color
}
