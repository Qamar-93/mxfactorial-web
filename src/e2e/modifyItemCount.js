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
