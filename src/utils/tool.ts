export const nameAsterisk = (name: string) => {
  const n = name.substring(1, name.length > 2 ? name.length - 1 : name.length)

  let re = ""
  for (let i = 0; i < n.length; i++) {
    re += "*"
  }

  return name.replace(n, re)
}

export const phoneAsterisk = (phone: string) => phone.replace(phone.substring(3, 7), "****")
