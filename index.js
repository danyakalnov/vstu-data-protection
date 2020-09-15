const inquirer = require('inquirer')
const chalk = require('chalk')
const cipherUtils = require('./autokeyCipher.js')

const operationTypes = {
  'Зашифровать текст': 'cipher',
  'Расшифровать текст': 'decipher',
}

const askUserForOperationType = () => {
  const questions = [
    {
      type: 'checkbox',
      name: 'operationType',
      message: 'Выберите направление операции: ',
      choices: Object.keys(operationTypes),
    },
  ]

  return inquirer.prompt(questions)
}

const askUserForInput = (operationType) => {
  const questions = [
    {
      name: 'text',
      type: 'input',
      message: `Введите текст для ${operationType === 'decipher' ? 'де' : ''}шифрования: `,
    },
    {
      name: 'key',
      type: 'input',
      message: 'Введите первичный ключ: ',
    },
  ]

  return inquirer.prompt(questions)
}

const run = () => {
  askUserForOperationType().then((value) => {
    const operationType = operationTypes[value.operationType[0]]
    askUserForInput(operationType).then((inputData) => {
      if (operationType === 'cipher') {
        const [encryptedText, autoKey] = cipherUtils.cipher(inputData.text, inputData.key)
        console.log('Автоключ: ', chalk.green(autoKey))
        console.log('Зашифрованный текст: ', chalk.green(encryptedText))
      } else if (operationType === 'decipher') {
        const decryptedText = cipherUtils.decipher(inputData.text, inputData.key)
        console.log('Расшифрованный текст: ', chalk.green(decryptedText))
      }
    })
  })
}

run()
