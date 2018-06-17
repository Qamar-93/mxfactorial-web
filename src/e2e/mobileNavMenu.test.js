const puppeteer = require('puppeteer')

const BASE_URL = 'http://localhost:3000'
let browser
let page
const waitOpts = { waitUntil: 'load' }

test('selecting mobile nav menu button displays mobile nav menu', async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox']
    //,headless: false //for visible browser test automation
  })
  page = await browser.newPage()
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
  const navMenuButton = await page.$('.hamburger')
  await navMenuButton.click()
  await page.waitForSelector('.sign-out-button')
  const navMenuButtonList = await page.$$('.mobile-nav__list')
  expect(navMenuButtonList).toHaveLength(1)
})

test('selecting hamburger icon on open mobile nav menu closes nav menu', async () => {
  const firstclassUnderTest = 'is-active'
  const navMenuButton = await page.$('.hamburger')
  await navMenuButton.click()
  await page.waitFor(() => !document.querySelector('.mobile-nav__list'))
  const hamburgerButtonCssClasses = await page.evaluate(() => {
    let data = []
    let elements = document.getElementsByClassName('hamburger')
    for (var element of elements) data.push(element.className)
    return data
  })
  const classString = hamburgerButtonCssClasses[0]
  const classList = classString.split(' ')
  const testForClass = classList.filter(
    className => className === firstclassUnderTest
  )
  //elminate risk of returning 0 from failed getElementsByClassName()
  expect(hamburgerButtonCssClasses.length).toBeGreaterThan(0)
  expect(testForClass).toHaveLength(0)
})

test('selecting hamburger icon on open mobile nav menu removes blur', async () => {
  const secondClassUnderTest = 'blur'
  const mainElementCssClasses = await page.evaluate(() => {
    let data = []
    let elements = document.getElementsByTagName('main')
    for (var element of elements) data.push(element.className)
    return data
  })
  const mainClassString = await mainElementCssClasses[0]
  const mainClassList = await mainClassString.split(' ')
  const testForMainClass = await mainClassList.filter(
    className => className === secondClassUnderTest
  )
  //sign out to purge tokens and return to initial state for other tests
  const hamburgerButton = await page.$('.hamburger')
  await hamburgerButton.click()
  await page.waitForSelector('.sign-out-button')
  const signOutButton = await page.$('.sign-out-button')
  await signOutButton.click()
  await page.waitForSelector('.sign-in')
  //end sign out
  expect(testForMainClass).toHaveLength(0)
})
