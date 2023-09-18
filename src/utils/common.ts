import type { CommonProperties } from '@/types'

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

// ! get common props
export function getCommonProps<T extends object, U extends object>(obj1: T, obj2: U): CommonProperties<T, U> {
  const commonProps = {} as CommonProperties<T, U>
  Object.keys(obj1).forEach((key) => {
    const K = key as keyof CommonProperties<T, U>
    if (obj1[K] !== undefined && obj2[K] !== undefined)
      commonProps[K] = obj2[K]
  })
  return commonProps
}
