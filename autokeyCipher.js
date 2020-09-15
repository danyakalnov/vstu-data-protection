const ruAlphabet = []
const enAlphabet = []
const specialChars = []

for (let i = 32; i <= 64; i++) specialChars.push(String.fromCharCode(i))
for (let i = 91; i <= 96; i++) specialChars.push(String.fromCharCode(i))
for (let i = 123; i <= 126; i++) specialChars.push(String.fromCharCode(i))

for (let i = 1040; i <= 1103; i++) {
  ruAlphabet.push(String.fromCharCode(i))
}

for (let i = 65; i <= 90; i++) enAlphabet.push(String.fromCharCode(i))
for (let i = 97; i <= 122; i++) enAlphabet.push(String.fromCharCode(i))

let alphabet = specialChars.concat(ruAlphabet).concat(enAlphabet)

const alphabetPower = alphabet.length

const cipher = (text, key) => {
  const autokey = text.slice(0, -key.length)
  const resultKey = key.concat(autokey)
  let cipherText = ''

  const encryptSymbol = (textSymbol, keySymbol) => {
    let encryptedSymbolIndex =
      (alphabet.indexOf(keySymbol) + alphabet.indexOf(textSymbol)) % alphabetPower
    let encryptedSymbol = alphabet[encryptedSymbolIndex]
    if (!encryptedSymbol) {
      console.log(
        alphabet.indexOf(keySymbol),
        alphabet.indexOf(textSymbol),
        'Рез-тат: ',
        encryptedSymbolIndex,
      )
    }

    return encryptedSymbol
  }

  for (let i = 0; i < text.length; i++) {
    let encryptedSymbol = encryptSymbol(text[i], resultKey[i])
    cipherText += encryptedSymbol
  }

  return [cipherText, autokey]
}

const decipher = (encryptedText, key) => {
  let decryptedText = ''
  let currentKey = key

  const decryptSymbol = (textSymbol, keySymbol) => {
    let decryptedSymbolIndex =
      (alphabet.indexOf(textSymbol) - alphabet.indexOf(keySymbol)) % alphabetPower
    if (decryptedSymbolIndex < 0) decryptedSymbolIndex += alphabetPower
    let decryptedSymbol = alphabet[decryptedSymbolIndex]

    return decryptedSymbol
  }

  for (let i = 0; i < encryptedText.length; i++) {
    let decryptedSymbol = decryptSymbol(encryptedText[i], currentKey[i])
    decryptedText += decryptedSymbol
    currentKey += decryptedSymbol
  }

  return decryptedText
}

module.exports = {
  cipher,
  decipher,
}
