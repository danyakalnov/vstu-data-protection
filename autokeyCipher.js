const alphabet = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ы', 'Ъ', 'Э', 'Ю', 'Я'];
const alphabetPower = alphabet.length;

const cipher = (text, key) => {
    const autokey = text.slice(0, -key.length);
    const resultKey = key.concat(autokey);
    let cipherText = '';
  
    const encryptSymbol = (textSymbol, keySymbol) => {
      let encryptedSymbolIndex = (alphabet.indexOf(keySymbol) + alphabet.indexOf(textSymbol)) % alphabetPower;
      let encryptedSymbol = alphabet[encryptedSymbolIndex];
  
      return encryptedSymbol;
    }
  
    for (let i = 0; i < text.length; i++) {
      let encryptedSymbol = encryptSymbol(text[i], resultKey[i]);
      cipherText += encryptedSymbol;
    }
  
    return [cipherText, autokey];
}

const decipher = (encryptedText, key) => {
  let decryptedText = '';
  let currentKey = key;

  const decryptSymbol = (textSymbol, keySymbol) => {
    let decryptedSymbolIndex = (alphabet.indexOf(textSymbol) - alphabet.indexOf(keySymbol)) % alphabetPower;
    if (decryptedSymbolIndex < 0) decryptedSymbolIndex += alphabetPower;
    let decryptedSymbol = alphabet[decryptedSymbolIndex];

    return decryptedSymbol;
  }

  for (let i = 0; i < encryptedText.length; i++) {
    let decryptedSymbol = decryptSymbol(text[i], key[i]);
    decryptedText += decryptedSymbol;
    currentKey += decryptedSymbol;
  }

  return decryptedText;
}

