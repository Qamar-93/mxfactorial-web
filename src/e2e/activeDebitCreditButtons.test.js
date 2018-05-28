const puppeteer = require('puppeteer')

const BASE_URL = 'http://localhost:3000'
let browser
let page
const waitOpts = { waitUntil: 'load' }

test('credit button active', async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox']
  })
  page = await browser.newPage()
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

test('selecting debit button displays active debit button', async () => {
  const classUnderTest = 'inactive'
  const debitButton = await page.$('.debit-button')
  await debitButton.click()
  await page.waitFor(() => !document.querySelector('.debit-button.inactive'))
  const debitButtonClasses = await page.evaluate(() => {
    let data = []
    let elements = document.getElementsByClassName('debit-button')
    for (var element of elements) data.push(element.className)
    return data
  })
  const classString = debitButtonClasses[0]
  const classList = classString.split(' ')
  const testForClass = classList.filter(
    className => className === classUnderTest
  )
  //elminate risk of returning 0 from failed getElementsByClassName()
  expect(debitButtonClasses.length).toBeGreaterThan(0)
  expect(testForClass).toHaveLength(0)
})

test('selecting debit button displays transact button', async () => {
  const classUnderTest = 'transact'
  const transactButtonClasses = await page.evaluate(() => {
    let data = []
    let elements = document.getElementsByClassName('transact')
    for (var element of elements) data.push(element.className)
    return data
  })
  const transactButtonClassString = await transactButtonClasses[0]
  const transactButtonClassList = await transactButtonClassString.split(' ')
  const testForMainClass = await transactButtonClassList.filter(
    className => className === classUnderTest
  )
  expect(testForMainClass).toHaveLength(1)
  const expectedCopy = 'Transact'
  const transactButtonList = await page.$$('.transact')
  const transactButton = await transactButtonList[0]
  const transactButtonHandle = await transactButton.getProperty('innerHTML')
  const transactButtonCopy = await transactButtonHandle.jsonValue()
  expect(transactButtonCopy).toBe(expectedCopy)
})

test('selecting credit button from active debit state switches credit button to active', async () => {
  const classUnderTest = 'inactive'
  const creditButton = await page.$('.credit-button')
  await creditButton.click()
  await page.waitFor(() => !document.querySelector('.credit-button.inactive'))
  const debitButtonClasses = await page.evaluate(() => {
    let data = []
    let elements = document.getElementsByClassName('debit-button')
    for (var element of elements) data.push(element.className)
    return data
  })
  const classString = debitButtonClasses[0]
  const classList = classString.split(' ')
  const testForInactiveDebitClass = classList.filter(
    className => className === classUnderTest
  )
  //elminate risk of returning 0 from failed getElementsByClassName()
  expect(debitButtonClasses.length).toBeGreaterThan(0)
  expect(testForInactiveDebitClass).toHaveLength(1)
  const creditButtonClasses = await page.evaluate(() => {
    let data = []
    let elements = document.getElementsByClassName('credit-button')
    for (var element of elements) data.push(element.className)
    return data
  })
  const creditClassString = creditButtonClasses[0]
  const creditClassList = creditClassString.split(' ')
  const testForActiveCreditClass = creditClassList.filter(
    className => className === classUnderTest
  )
  expect(testForActiveCreditClass).toHaveLength(0)
})

test('request button and copy displays after switching to active credit button state', async () => {
  const copyUnderTest = 'Request'
  const requestButtonList = await page.$$('.request')
  const requestButton = await requestButtonList[0]
  const requestButtonHandle = await requestButton.getProperty('innerHTML')
  const requestButtonCopy = await requestButtonHandle.jsonValue()
  expect(requestButtonList).toHaveLength(1)
  expect(requestButtonCopy).toBe(copyUnderTest)
})

test('transact button NOT displayed', async () => {
  const transactButtonList = await page.$$('.transact')
  expect(transactButtonList).toHaveLength(0)
})
