import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL
const HOST_ENV = process.env.REACT_APP_HOST_ENV
const ACCOUNT_RESOURCE = 'account'
const CREATE_RESOURCE = 'create'

export const CREATE_ACCOUNT_URI =
  BASE_URL + '/' + HOST_ENV + '/' + ACCOUNT_RESOURCE + '/' + CREATE_RESOURCE

export const axiosRequest = (method, url, data) => {
  const config = {
    method: method,
    url: url,
    data: data
  }

  // axios.interceptors.request.use(request => {
  //   console.log('Starting Request', request)
  //   return request
  // })

  return axios(config)
    .then(response => {
      // console.log(response)
      return response
    })
    .catch(error => {
      // console.log(error)
      return error
    })
}
