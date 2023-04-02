export const randomCuit = () => {
  const rand_cuit: any = "20" + String(Math.floor(Math.random() * (99999999 - 10000000)) + 10000000)
  let suma = 0;
  for (let i = 0; i < rand_cuit.length; i++) {
    const factor = rand_cuit.length - i + 1 > 7 ? (rand_cuit.length - i + 1) % 7 + 1 : rand_cuit.length - i + 1;
    suma += rand_cuit[i] * factor
  }
  const verif = (11 - suma % 11) % 11
  return rand_cuit + String(verif)

}
