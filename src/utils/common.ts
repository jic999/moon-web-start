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
