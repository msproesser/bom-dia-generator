
export function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function randomItem(list) {
  return list[randomInt(list.length)]
}