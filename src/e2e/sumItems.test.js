const puppeteer = require('puppeteer')

const BASE_URL = 'http://localhost:3000'
let browser
let page
const waitOpts = { waitUntil: 'load' }

test(
  'sum-transaction-item-value-display-cell',
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
    await addItemButton.click()
    await addItemButton.click()
    await addItemButton.click()
    await addItemButton.click()
    const expectedTotal = 36
    const transactionItemSets = await page.$$('.transaction-item-set')
    //https://github.com/GoogleChrome/puppeteer/issues/1451#issuecomment-346713183
    const transactionItemSetUuids = await page.evaluate(() =>
      [...document.querySelectorAll('.transaction-item-set')].map(element =>
        element.getAttribute('data-uuid')
      )
    )
    const firstItemName = await page.$(
      `[data-uuid="${transactionItemSetUuids[0]}"] > .transaction-item-name`
    )
    await firstItemName.type('bread')
    const firstItemPrice = await page.$(
      `[data-uuid="${transactionItemSetUuids[0]}"] > .transaction-item-value`
    )
    await firstItemPrice.type('3')
    const firstItemQuantity = await page.$(
      `[data-uuid="${transactionItemSetUuids[0]}"] > .transaction-item-quantity`
    )
    await firstItemQuantity.type('3')
    //---------------------->
    const secondItemName = await page.$(
      `[data-uuid="${transactionItemSetUuids[1]}"] > .transaction-item-name`
    )
    await secondItemName.type('milk')
    const secondItemPrice = await page.$(
      `[data-uuid="${transactionItemSetUuids[1]}"] > .transaction-item-value`
    )
    await secondItemPrice.type('2')
    const secondItemQuantity = await page.$(
      `[data-uuid="${transactionItemSetUuids[1]}"] > .transaction-item-quantity`
    )
    await secondItemQuantity.type('2.5')
    //---------------------->
    const thirdItemName = await page.$(
      `[data-uuid="${transactionItemSetUuids[2]}"] > .transaction-item-name`
    )
    await thirdItemName.type('honey')
    const thirdItemPrice = await page.$(
      `[data-uuid="${transactionItemSetUuids[2]}"] > .transaction-item-value`
    )
    await thirdItemPrice.type('8')
    const thirdItemQuantity = await page.$(
      `[data-uuid="${transactionItemSetUuids[2]}"] > .transaction-item-quantity`
    )
    await thirdItemQuantity.type('1')
    //---------------------->
    const fourthItemName = await page.$(
      `[data-uuid="${transactionItemSetUuids[3]}"] > .transaction-item-name`
    )
    await fourthItemName.type('lettuce')
    const fourthItemPrice = await page.$(
      `[data-uuid="${transactionItemSetUuids[3]}"] > .transaction-item-value`
    )
    await fourthItemPrice.type('3')
    const fourthItemQuantity = await page.$(
      `[data-uuid="${transactionItemSetUuids[3]}"] > .transaction-item-quantity`
    )
    await fourthItemQuantity.type('2')
    //---------------------->
    const fifthItemName = await page.$(
      `[data-uuid="${transactionItemSetUuids[4]}"] > .transaction-item-name`
    )
    await fifthItemName.type('apple')
    const fifthItemPrice = await page.$(
      `[data-uuid="${transactionItemSetUuids[4]}"] > .transaction-item-value`
    )
    await fifthItemPrice.type('1')
    const fifthItemQuantity = await page.$(
      `[data-uuid="${transactionItemSetUuids[4]}"] > .transaction-item-quantity`
    )
    await fifthItemQuantity.type('8')
    //---------------------->
    const sumItemDisplayCell = await page.evaluate(() => {
      let data = []
      let elements = document.getElementsByClassName(
        'sum-transaction-item-value-display-cell'
      )
      for (var element of elements) data.push(element.innerText)
      return data
    })
    const sumItemDisplayCellNumber = parseInt(sumItemDisplayCell[0])
    expect(sumItemDisplayCellNumber).toBe(expectedTotal)
  },
  10000
)

test('total modified after removing 3 transaction items', async () => {
  const expectedTotal = 14
  const transactionItemSetUuids = await page.evaluate(() =>
    [...document.querySelectorAll('.transaction-item-set')].map(element =>
      element.getAttribute('data-uuid')
    )
  )
  const thirdItemRemoveIcon = await page.$(
    `[data-uuid="${transactionItemSetUuids[2]}"] .remove-icon`
  )
  await thirdItemRemoveIcon.click()
  const secondItemRemoveIcon = await page.$(
    `[data-uuid="${transactionItemSetUuids[1]}"] .remove-icon`
  )
  await secondItemRemoveIcon.click()
  const firstItemRemoveIcon = await page.$(
    `[data-uuid="${transactionItemSetUuids[0]}"] .remove-icon`
  )
  await firstItemRemoveIcon.click()
  const sumItemDisplayCell = await page.evaluate(() => {
    let data = []
    let elements = document.getElementsByClassName(
      'sum-transaction-item-value-display-cell'
    )
    for (var element of elements) data.push(element.innerText)
    return data
  })
  const sumItemDisplayCellNumber = parseInt(sumItemDisplayCell[0])
  expect(sumItemDisplayCellNumber).toBe(expectedTotal)
})
