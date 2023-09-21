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

export function getRandomDarkColor() {
  const ranges = [64, 128, 256]
  const rRange = ranges[Math.floor(Math.random() * ranges.length)]
  const gRange = ranges[Math.floor(Math.random() * ranges.length)]
  const bRange = ranges[Math.floor(Math.random() * ranges.length)]
  const r = Math.floor(Math.random() * rRange).toString(16).padStart(2, '0')
  const g = Math.floor(Math.random() * (gRange === 256 ? gRange * 0.8 : gRange)).toString(16).padStart(2, '0')
  const b = Math.floor(Math.random() * bRange).toString(16).padStart(2, '0')
  return `#${r}${g}${b}`
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

// 防抖
export function debounce<T extends (...args: any[]) => any>(fn: T, delay = 100) {
  let timer: NodeJS.Timeout
  return function (this: any, ...args: any[]) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  } as T
}

export function getRandomComplexNumber() {
  const random = Math.random()
  const randomStr = random.toString().split('.')[1]
  const randomLength = randomStr.length
  const randomComplexNumber = Number(randomStr) / 10 ** randomLength
  return randomComplexNumber
}
