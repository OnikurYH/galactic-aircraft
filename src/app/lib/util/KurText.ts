export module KurText {
  export function padLeft (num: number, padStr: string) {
    let str = "" + num;
    return padStr.substring(0, padStr.length - str.length) + str
  }
}