export type Output = {
  name: string
}

export function helloWorld(name: string): Output {
  return { name }
}
