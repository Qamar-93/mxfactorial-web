const puppeteer = require('puppeteer')

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
  'browser title displays',
  async () => {
    await page.goto(BASE_URL)
    let browserTitle = await page.title()
    expect(browserTitle).toBe('Mx! web client')
  },
  10000
)

test('content displays', async () => {
  await page.goto(BASE_URL)
  const mxfactorialLogoCount = await page.$$eval(
    '.landing-screen-logo',
    logos => logos.length
  )
  const accountInputCount = await page.$$eval('.account', input => input.length)
  const passwordInputCount = await page.$$eval(
    '.password',
    input => input.length
  )
  const createAccountButtonCount = await page.$$eval(
    '.create-account',
    button => button.length
  )
  const signInButtonCount = await page.$$eval(
    '.sign-in',
    button => button.length
  )
  const landingScreenContent =
    mxfactorialLogoCount +
    accountInputCount +
    passwordInputCount +
    createAccountButtonCount +
    signInButtonCount
  expect(landingScreenContent).toBe(5)
})
