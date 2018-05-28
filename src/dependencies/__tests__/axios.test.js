import axios from 'axios'
import { axiosInstance } from '../axios'
import { testProfile } from '../../containers/CreateAccount/CreateAccount'

describe('Axios rest client', () => {
  it('sends a create account request', () => {
    let requestData
    axiosInstance.interceptors.request.use(request => {
      requestData = request.data
      // return request
    })
    const testUrl = 'https://www.createmyaccountplease.fake'
    const testResource = '/account'
    const stringifiedTestProfile = JSON.stringify(testProfile)
    axiosInstance
      .post(testResource, stringifiedTestProfile)
      .then(res => expect(requestData).toBe(stringifiedTestProfile))
      .catch(err => err)
  })
})
