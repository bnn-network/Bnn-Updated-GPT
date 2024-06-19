export function random() {
  const rand = crypto.randomUUID().substring(0, 31)
  return rand
}
