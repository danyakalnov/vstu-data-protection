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
      let encryptedSymbol = encryptSymbol(text[i], resultKey[i])
      cipherText += encryptedSymbol;
    }
  
    return [cipherText, autokey];
}