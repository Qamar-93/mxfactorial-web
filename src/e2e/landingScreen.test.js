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

describe('Landing screen', () => {
  it(
    'displays browser title',
    async () => {
      await page.goto(BASE_URL)
      let browserTitle = await page.title()
      expect(browserTitle).toBe('Mx! web client')
    },
    10000
  )

  it('displays buttons and inputs', async () => {
    await page.goto(BASE_URL)
    const mxfactorialLogoCount = await page.$$eval(
      '.landing-screen-logo',
      logos => logos.length
    )
    const accountInputCount = await page.$$eval(
      '.account',
      input => input.length
    )
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

  it("clicks Sign In button on keyboard's Enter", async () => {
    //begin sign in to access post-auth screens
    await page.goto(BASE_URL)
    await page.waitForSelector('.sign-in')
    const accountInput = await page.$('[name=account]')
    await accountInput.type('JoeSmith')
    const passwordInput = await page.$('[name=password]')
    await passwordInput.type('password')
    await page.keyboard.press('Enter')
    await page.waitForSelector('.add-item')
    //end sign in
    const addItemButtons = await page.$$('.add-item')
    expect(addItemButtons).toHaveLength(1)
    //sign out to purge tokens and return to initial state for other tests
    const hamburgerButton = await page.$('.hamburger')
    await hamburgerButton.click()
    await page.waitForSelector('.sign-out-button')
    const signOutButton = await page.$('.sign-out-button')
    await signOutButton.click()
    await page.waitForSelector('.sign-in')
    //end sign out
  })
})
