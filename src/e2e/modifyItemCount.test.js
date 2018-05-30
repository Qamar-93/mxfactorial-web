const puppeteer = require('puppeteer')

const BASE_URL = 'http://localhost:3000'
let browser
let page
const waitOpts = { waitUntil: 'load' }

test(
  'add transaction items',
  async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox']
    })
    page = await browser.newPage()
    await page.goto(BASE_URL + '/account')
    await page.waitForSelector('.add-item')
    const addItemButton = await page.$('.add-item')
    //AVOID: await addItemButton.click({ clickCount })
    //passing clickCount in options object too fast
    const expectedItemCount = 5 //1 initial + 4 clicks below
    await addItemButton.click()
    await addItemButton.click()
    await addItemButton.click()
    await addItemButton.click()
    const transactionItemSets = await page.$$('.transaction-item-set')
    const transactionItems = await page.$('.transaction-items')
    const browserItemCountAsString = await page.evaluate(items => {
      return items.getAttribute('data-item-count')
    }, transactionItems)
    const browserItemCount = await parseInt(browserItemCountAsString)
    expect(transactionItemSets).toHaveLength(expectedItemCount)
    expect(browserItemCount).toBe(expectedItemCount)
  },
  10000
)

test('delete transaction items', async () => {
  const expectedItemCount = 2
  const removeIcon = await page.$$('.remove-icon')
  //remove in descending sequence
  await removeIcon[4].click()
  await removeIcon[3].click()
  await removeIcon[2].click()
  const transactionItemSets = await page.$$('.transaction-item-set')
  expect(transactionItemSets).toHaveLength(expectedItemCount)
})

test('selecting add-item button scrolls window down', async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox']
  })
  page = await browser.newPage()
  await page.goto(BASE_URL + '/account')
  await page.waitForSelector('.add-item')
  const addItemButton = await page.$('.add-item')
  let yScrollDiffs = []
  const position0 = await page.evaluate(() => window.scrollY)
  await addItemButton.click()
  const position1 = await page.evaluate(() => window.scrollY)
  yScrollDiffs.push(position1 - position0)
  await addItemButton.click()
  const position2 = await page.evaluate(() => window.scrollY)
  yScrollDiffs.push(position2 - position1)
  await addItemButton.click()
  const position3 = await page.evaluate(() => window.scrollY)
  yScrollDiffs.push(position3 - position2)
  await addItemButton.click()
  const position4 = await page.evaluate(() => window.scrollY)
  yScrollDiffs.push(position4 - position3)
  const inconsistencyTest = yScrollDiffs.filter(diff => {
    return diff !== yScrollDiffs[0]
  })
  expect(yScrollDiffs[0]).toBeGreaterThan(200)
  expect(inconsistencyTest).toHaveLength(0)
})
