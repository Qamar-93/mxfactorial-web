import axios from 'axios'
import { BASE_URL, HOST_ENV } from '../utilities/envVarsFromDisk'

export const axiosConfig = {
  baseURL: BASE_URL + '/' + HOST_ENV,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
}

export const axiosInstance = axios.create(axiosConfig)

//comment in for logging requests/responses
// axiosInstance.interceptors.request.use(request => {
//   console.log('Starting Request', request)
//   return request
// })

//use then/catch for requests
// axios(config)
// .then(response => {
//   // console.log(response)
//   return response
// })
// .catch(error => {
//   // console.log(error)
//   return error
// })
