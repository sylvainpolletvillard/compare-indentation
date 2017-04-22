const age = 27,
  name = "Jack",
  hobbies = [
    "bikeshedding",
    "ping pong"
  ]

function greet(name) {
  if (name) {
    return `Hello ${name} !`
  }
  return greet(
    prompt(`Who are you ?`)
  )
}