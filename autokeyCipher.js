const alphabet = []

for (let i = 32; i <= 126; i++) {
  alphabet.push(String.fromCharCode(i))
}

for (let i = 1040; i <= 1103; i++) {
  alphabet.push(String.fromCharCode(i))
}

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
