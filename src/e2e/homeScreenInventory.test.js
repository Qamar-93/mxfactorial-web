const puppeteer = require('puppeteer')

const BASE_URL = 'http://localhost:3000'
let browser
let page
const waitOpts = { waitUntil: 'load' }

beforeAll(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox']
    //,headless: false //for visible browser test automation
  })
  page = await browser.newPage()
})

test('1 account label displays', async () => {
  const accountLabelCopy = 'account'
  await page.goto(BASE_URL + '/account')
  await page.waitForSelector('.add-item')
  const accountIndicatorHandle = await page.$('.account-label')
  const accountIndicatorHtml = await accountIndicatorHandle.getProperty(
    'innerHTML'
  )
  const accountIndicatorCopy = await accountIndicatorHtml.jsonValue()
  expect(accountIndicatorCopy).toBe(accountLabelCopy)
})

test('1 debitor-account-balance-display-cell displays', async () => {
  await page.goto(BASE_URL + '/account')
  await page.waitForSelector('.add-item')
  const debitorAccountBalanceDisplayCell = await page.$$(
    '.debitor-account-balance-display-cell'
  )
  expect(debitorAccountBalanceDisplayCell).toHaveLength(1)
})

test('1 recipient-account-input displays', async () => {
  await page.goto(BASE_URL + '/account')
  await page.waitForSelector('.add-item')
  const recipientAccountInput = await page.$$('.recipient-account-input')
  expect(recipientAccountInput).toHaveLength(1)
})

test('1 total display cell displays', async () => {
  await page.goto(BASE_URL + '/account')
  await page.waitForSelector('.add-item')
  const emptySumTransactionItemValueDisplayCell = await page.$$(
    '.empty-sum-transaction-item-value-display-cell'
  )
  expect(emptySumTransactionItemValueDisplayCell).toHaveLength(1)
})

test('debit and credit buttons display', async () => {
  await page.goto(BASE_URL + '/account')
  await page.waitForSelector('.add-item')
  const debitCreditButtonGroup = await page.$$('.debit-credit-buttons')
  const debitButton = await page.$$('.debit-button')
  const creditButton = await page.$$('.credit-button')
  expect(debitCreditButtonGroup).toHaveLength(1)
  expect(debitButton).toHaveLength(1)
  expect(creditButton).toHaveLength(1)
})

test('subtract and add icons display', async () => {
  await page.goto(BASE_URL + '/account')
  await page.waitForSelector('.add-item')
  const subtractIcon = await page.$$('.debit-button-icon')
  const addIcon = await page.$$('.credit-button-icon')
  expect(subtractIcon).toHaveLength(1)
  expect(addIcon).toHaveLength(1)
})

test('credit button active', async () => {
  await page.goto(BASE_URL + '/account')
  await page.waitForSelector('.add-item')
  const classUnderTest = 'inactive'
  const creditButtonCssClasses = await page.evaluate(() => {
    let data = []
    let elements = document.getElementsByClassName('credit-button')
    for (var element of elements) data.push(element.className)
    return data
  })
  const classString = await creditButtonCssClasses[0]
  const classList = await classString.split(' ')
  const testForClass = await classList.filter(
    className => className === classUnderTest
  )
  expect(testForClass).toHaveLength(0)
})

test('debit button inactive', async () => {
  await page.goto(BASE_URL + '/account')
  await page.waitForSelector('.add-item')
  const classUnderTest = 'inactive'
  const debitButtonCssClasses = await page.evaluate(() => {
    let data = []
    let elements = document.getElementsByClassName('debit-button')
    for (var element of elements) data.push(element.className)
    return data
  })
  const classString = await debitButtonCssClasses[0]
  const classList = await classString.split(' ')
  const testForClass = await classList.filter(
    className => className === classUnderTest
  )
  expect(testForClass).toHaveLength(1)
})

test('1 remove icon displays', async () => {
  await page.goto(BASE_URL + '/account')
  await page.waitForSelector('.add-item')
  const removeIcon = await page.$$('.remove-icon')
  expect(removeIcon).toHaveLength(1)
})

test('1 transaction-item-name displays', async () => {
  await page.goto(BASE_URL + '/account')
  await page.waitForSelector('.add-item')
  const transactionItemNameInput = await page.$$('.transaction-item-name')
  expect(transactionItemNameInput).toHaveLength(1)
})

test('1 transaction-item-value displays', async () => {
  await page.goto(BASE_URL + '/account')
  await page.waitForSelector('.add-item')
  const transactionItemValueInput = await page.$$('.transaction-item-value')
  expect(transactionItemValueInput).toHaveLength(1)
})

test('1 transaction-item-quantity displays', async () => {
  await page.goto(BASE_URL + '/account')
  await page.waitForSelector('.add-item')
  const transactionItemQuantityInput = await page.$$(
    '.transaction-item-quantity'
  )
  expect(transactionItemQuantityInput).toHaveLength(1)
})

test('1 quantity-label and copy displays', async () => {
  await page.goto(BASE_URL + '/account')
  await page.waitForSelector('.add-item')
  const copyUnderTest = 'Quantity'
  const quantityLabelList = await page.$$('.quantity-label')
  const quantityLabel = await quantityLabelList[0]
  const quantityLabelHandle = await quantityLabel.getProperty('innerHTML')
  const quantityLabelCopy = await quantityLabelHandle.jsonValue()
  expect(quantityLabelList.length).toBeGreaterThan(0)
  expect(quantityLabelCopy).toBe(copyUnderTest)
})

test('1 add-item button and copy displays', async () => {
  await page.goto(BASE_URL + '/account')
  await page.waitForSelector('.add-item')
  const copyUnderTest = ' item'
  const addItemButtonList = await page.$$('.add-item')
  const addItemButton = await addItemButtonList[0]
  const addItemButtonHandle = await addItemButton.getProperty('innerHTML')
  const addItemButtonCopy = await addItemButtonHandle.jsonValue()
  expect(addItemButtonList).toHaveLength(1)
  expect(addItemButtonCopy.substr(-5)).toBe(copyUnderTest)
})

test('1 request button and copy displays', async () => {
  await page.goto(BASE_URL + '/account')
  await page.waitForSelector('.add-item')
  const copyUnderTest = 'Request'
  const requestButtonList = await page.$$('.request')
  const requestButton = await requestButtonList[0]
  const requestButtonHandle = await requestButton.getProperty('innerHTML')
  const requestButtonCopy = await requestButtonHandle.jsonValue()
  expect(requestButtonList).toHaveLength(1)
  expect(requestButtonCopy).toBe(copyUnderTest)
})

test('transact button NOT displayed', async () => {
  await page.goto(BASE_URL + '/account')
  await page.waitForSelector('.add-item')
  const transactButtonList = await page.$$('.transact')
  expect(transactButtonList).toHaveLength(0)
})

test('mobile nav button displays', async () => {
  await page.goto(BASE_URL + '/account')
  await page.waitForSelector('.add-item')
  const mobileNavMenuButtonList = await page.$$('.mobile-nav')
  const solidCircleIcon = await page.$$('.circle')
  const hamburgerIconList = await page.$$('.hamburger')

  expect(mobileNavMenuButtonList).toHaveLength(1)
  expect(solidCircleIcon).toHaveLength(1)
  expect(hamburgerIconList).toHaveLength(1)
})

test('mobile nav button displays inactive default', async () => {
  await page.goto(BASE_URL + '/account')
  await page.waitForSelector('.add-item')
  const classUnderTest = 'is-active'
  const hamburgerButtonCssClasses = await page.evaluate(() => {
    let data = []
    let elements = document.getElementsByClassName('hamburger')
    for (var element of elements) data.push(element.className)
    return data
  })
  const classString = await hamburgerButtonCssClasses[0]
  const classList = await classString.split(' ')
  const testForClass = await classList.filter(
    className => className === classUnderTest
  )
  expect(testForClass).toHaveLength(0)
})
