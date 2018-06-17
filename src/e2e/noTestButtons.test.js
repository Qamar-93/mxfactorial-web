const puppeteer = require('puppeteer')

//these tests prevent deployment of versions containing
//buttons used for exepdient development and testing

const BASE_URL = 'http://localhost:3000'
let browser
let page
const waitOpts = { waitUntil: 'load' }

beforeAll(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox']
  })
  page = await browser.newPage()
})

test(
  '0 test elements on landing screen',
  async () => {
    await page.goto(BASE_URL)
    const inputCount = await page.$$eval('input', inputs => inputs.length)
    const buttonCount = await page.$$eval('button', buttons => buttons.length)
    const testButtons = await page.$$eval(
      '.test-button',
      testButtons => testButtons.length
    )
    expect(inputCount).toBe(2)
    expect(buttonCount).toBe(2)
    expect(testButtons).toBe(0)
  },
  10000
)

test('0 test elements on /account/create/1 (TermsOfUseCopy1)', async () => {
  await page.goto(BASE_URL + '/account/create/1')
  const inputCount = await page.$$eval('input', inputs => inputs.length)
  const buttonCount = await page.$$eval('button', buttons => buttons.length)
  const testButtons = await page.$$eval(
    '.test-button',
    testButtons => testButtons.length
  )
  expect(inputCount).toBe(0)
  expect(buttonCount).toBe(1)
  expect(testButtons).toBe(0)
})

test('0 test elements on /account/create/2 (TermsOfUseCopy2)', async () => {
  await page.goto(BASE_URL + '/account/create/2')
  const inputCount = await page.$$eval('input', inputs => inputs.length)
  const buttonCount = await page.$$eval('button', buttons => buttons.length)
  const testButtons = await page.$$eval(
    '.test-button',
    testButtons => testButtons.length
  )
  expect(inputCount).toBe(0)
  expect(buttonCount).toBe(1)
  expect(testButtons).toBe(0)
})

test('0 test elements on /account/create/3 (TermsOfUseCopy3)', async () => {
  await page.goto(BASE_URL + '/account/create/3')
  const inputCount = await page.$$eval('input', inputs => inputs.length)
  const buttonCount = await page.$$eval('button', buttons => buttons.length)
  const testButtons = await page.$$eval(
    '.test-button',
    testButtons => testButtons.length
  )
  expect(inputCount).toBe(0)
  expect(buttonCount).toBe(1)
  expect(testButtons).toBe(0)
})

test('0 test elements on /account/create/4 (CreateAccountForm1)', async () => {
  await page.goto(BASE_URL + '/account/create/4')
  const inputCount = await page.$$eval('input', inputs => inputs.length)
  const buttonCount = await page.$$eval('button', buttons => buttons.length)
  const testButtons = await page.$$eval(
    '.test-button',
    testButtons => testButtons.length
  )
  expect(inputCount).toBe(4)
  expect(buttonCount).toBe(1)
  expect(testButtons).toBe(0)
})

test('0 test elements on /account/create/5 (CreateAccountForm2)', async () => {
  await page.goto(BASE_URL + '/account/create/5')
  const inputCount = await page.$$eval('input', inputs => inputs.length)
  const buttonCount = await page.$$eval('button', buttons => buttons.length)
  const testButtons = await page.$$eval(
    '.test-button',
    testButtons => testButtons.length
  )
  expect(inputCount).toBe(4)
  expect(buttonCount).toBe(1)
  expect(testButtons).toBe(0)
})

test('0 test elements on /account/create/6 (CreateAccountForm3)', async () => {
  await page.goto(BASE_URL + '/account/create/6')
  const inputCount = await page.$$eval('input', inputs => inputs.length)
  const buttonCount = await page.$$eval('button', buttons => buttons.length)
  const testButtons = await page.$$eval(
    '.test-button',
    testButtons => testButtons.length
  )
  expect(inputCount).toBe(3)
  expect(buttonCount).toBe(1)
  expect(testButtons).toBe(0)
})

test('0 test elements on /account/create/7 (CreateAccountForm4)', async () => {
  await page.goto(BASE_URL + '/account/create/7')
  const inputCount = await page.$$eval('input', inputs => inputs.length)
  const buttonCount = await page.$$eval('button', buttons => buttons.length)
  const testButtons = await page.$$eval(
    '.test-button',
    testButtons => testButtons.length
  )
  expect(inputCount).toBe(3)
  expect(buttonCount).toBe(1)
  expect(testButtons).toBe(0)
})

test('0 test elements on /account/create/8 (CreateAccountForm5)', async () => {
  await page.goto(BASE_URL + '/account/create/8')
  const inputCount = await page.$$eval('input', inputs => inputs.length)
  const buttonCount = await page.$$eval('button', buttons => buttons.length)
  const testButtons = await page.$$eval(
    '.test-button',
    testButtons => testButtons.length
  )
  expect(inputCount).toBe(3)
  expect(buttonCount).toBe(1)
  expect(testButtons).toBe(0)
})

test('0 test elements on /account/create/9 (CreateAccountForm6)', async () => {
  await page.goto(BASE_URL + '/account/create/9')
  const inputCount = await page.$$eval('input', inputs => inputs.length)
  const buttonCount = await page.$$eval('button', buttons => buttons.length)
  const testButtons = await page.$$eval(
    '.test-button',
    testButtons => testButtons.length
  )
  expect(inputCount).toBe(3)
  expect(buttonCount).toBe(1)
  expect(testButtons).toBe(0)
})

// test('0 test elements on /account/create/10 (CreateAccountForm7)', async () => {
//   await page.goto(BASE_URL + '/account/create/10')
//   const inputCount = await page.$$eval('input', inputs => inputs.length)
//   const buttonCount = await page.$$eval('button', buttons => buttons.length)
//   const testButtons = await page.$$eval(
//     '.test-button',
//     testButtons => testButtons.length
//   )
//   expect(inputCount).toBe(0)
//   expect(buttonCount).toBe(1)
//   expect(testButtons).toBe(0)
// })

test('0 test elements on /account (CreateAccount)', async () => {
  //begin sign in to access post-auth screens
  await page.goto(BASE_URL)
  await page.waitForSelector('.sign-in')
  const accountInput = await page.$('[name=account]')
  await accountInput.type('JoeSmith')
  const passwordInput = await page.$('[name=password]')
  await passwordInput.type('password')
  const signInButton = await page.$('.sign-in')
  await signInButton.click()
  await page.waitForSelector('.add-item')
  //end sign in
  const inputCount = await page.$$eval('input', inputs => inputs.length)
  const buttonCount = await page.$$eval('button', buttons => buttons.length)
  const testButtons = await page.$$eval(
    '.test-button',
    testButtons => testButtons.length
  )
  //sign out to purge tokens and return to initial state for other tests
  const hamburgerButton = await page.$('.hamburger')
  await hamburgerButton.click()
  await page.waitForSelector('.sign-out-button')
  const signOutButton = await page.$('.sign-out-button')
  await signOutButton.click()
  await page.waitForSelector('.sign-in')
  //end sign out
  expect(inputCount).toBe(4)
  expect(buttonCount).toBe(5)
  expect(testButtons).toBe(0)
})
