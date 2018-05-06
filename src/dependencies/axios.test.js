import axios from 'axios'
import { axiosRequest } from './axios'

describe('Axios rest client', () => {
  it('sends a create account request', async () => {
    let requestData
    axios.interceptors.request.use(request => {
      requestData = request.data
      return request
    })
    const testMethod = 'post'
    const testUrl = 'https://www.createmyaccountplease.fake'
    const testProfile = JSON.stringify({
      account: 'seventeen',
      agrees: true,
      firstName: 'One',
      middleName: 'Two',
      lastName: 'Three',
      country: 'Four',
      streetNumber: '5',
      streetName: '6',
      floorNumber: '7',
      unit: '8',
      cityName: 'Nine',
      stateName: 'Ten',
      postalCode: 'Eleven',
      countryDialingCode: '12',
      areaCode: '13',
      phoneNumber: '14',
      dateOfBirth: '2018-04-12',
      industryName: 'Fifteen',
      occupationName: 'Sixteen',
      emailAddress: 'test@example.net'
    })
    await axiosRequest(testMethod, testUrl, testProfile)
    expect(requestData).toBe(testProfile)
  })
})
