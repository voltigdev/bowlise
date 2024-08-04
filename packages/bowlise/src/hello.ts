export type Output = {
  name: string
}

export function helloWorld(name: string): Output {
  return { name }
}

console.log(helloWorld("world"))
