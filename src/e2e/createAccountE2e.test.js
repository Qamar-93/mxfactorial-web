const puppeteer = require('puppeteer')
const fs = require('fs')
const { axiosInstance } = require('../dependencies/axios')

//Comment in for debugging
// axiosInstance.interceptors.request.use(request => {
//   console.log('Starting Request', request)
//   return request
// })

const BASE_URL = 'http://localhost:3000'
let browser
let page
const waitOpts = { waitUntil: 'load' }

beforeAll(async () => {
  //in case previous attempt to
  //delete test data failed
  await axiosInstance
    .delete('/account/TestAccount')
    .then(res => err)
    .catch(err => err)
  browser = await puppeteer.launch({
    args: ['--no-sandbox']
    //,headless: false //for visible browser test automation
  })
  page = await browser.newPage()
})

test(
  'Create account in Cognito',
  async () => {
    await page.goto(BASE_URL)
    const createAccountButton = await page.$('.create-account')
    await createAccountButton.click()
    await page.waitForSelector('.next-button')
    const nextButton01 = await page.$('.next-button')
    await nextButton01.click()
    await page.waitForSelector('.next-button')
    const nextButton02 = await page.$('.next-button')
    await nextButton02.click()
    await page.waitForSelector('.i-agree-button')
    const iAgreeButton = await page.$('.i-agree-button')
    await iAgreeButton.click()
    await page.waitForSelector('.next-button')
    const firstNameInput = await page.$('[name=firstName]')
    await firstNameInput.type('Abc')
    const middleNameInput = await page.$('[name=middleName]')
    await middleNameInput.type('Def')
    const lastNameInput = await page.$('[name=lastName]')
    await lastNameInput.type('Ghi')
    const countryNameInput = await page.$('[name=country]')
    await countryNameInput.type('Jkl')
    const nextButton03 = await page.$('.next-button')
    await nextButton03.click()
    await page.waitForSelector('.next-button')
    const streetNumberInput = await page.$('[name=streetNumber]')
    await streetNumberInput.type('11')
    const streetNameInput = await page.$('[name=streetName]')
    await streetNameInput.type('Twenty Two')
    const floorNumberInput = await page.$('[name=floorNumber]')
    await floorNumberInput.type('33')
    const unitInput = await page.$('[name=unit]')
    await unitInput.type('44')
    const nextButton04 = await page.$('.next-button')
    await nextButton04.click()
    await page.waitForSelector('.next-button')
    const cityNameInput = await page.$('[name=cityName]')
    await cityNameInput.type('Mno')
    const stateNameInput = await page.$('[name=stateName]')
    await stateNameInput.type('PQ')
    const postalCodeInput = await page.$('[name=postalCode]')
    await postalCodeInput.type('55')
    const nextButton05 = await page.$('.next-button')
    await nextButton05.click()
    await page.waitForSelector('.next-button')
    const countryDialingCodeInput = await page.$('[name=countryDialingCode]')
    await countryDialingCodeInput.type('66')
    const areaCodeInput = await page.$('[name=areaCode]')
    await areaCodeInput.type('77')
    const phoneNumberInput = await page.$('[name=phoneNumber]')
    await phoneNumberInput.type('88')
    const nextButton06 = await page.$('.next-button')
    await nextButton06.click()
    await page.waitForSelector('.next-button')
    const dateOfBirthInput = await page.$('[name=dateOfBirth]')
    await dateOfBirthInput.type('10-05-1990')
    const industryInput = await page.$('[name=industryName]')
    await industryInput.type('Rst')
    const occupationNameInput = await page.$('[name=occupationName]')
    await occupationNameInput.type('Uvw')
    const nextButton07 = await page.$('.next-button')
    await nextButton07.click()
    await page.waitForSelector('.next-button')
    const accountNameInput = await page.$('[name=account]')
    await accountNameInput.type('TestAccount')
    const passwordInput = await page.$('[name=password]')
    await passwordInput.type('bluesky')
    const emailAddressInput = await page.$('[name=emailAddress]')
    await emailAddressInput.type('testabc@mailinator.com')
    const submitButton = await page.$('.next-button')
    await submitButton.click()
    await page.waitForSelector('.okay-button')
    await axiosInstance
      .delete('/account/TestAccount')
      .then(res => expect(res.data).toBe('TestAccount'))
      .catch(err => err)
  },
  20000
)
