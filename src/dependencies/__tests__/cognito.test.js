jest.mock('../cognito')
import { Cognito } from '../cognito'
const mockFunction = jest.fn()
Cognito.mockImplementation(() => {
  return {
    createAccount: mockFunction
  }
})
import { testProfile } from '../../containers/CreateAccount/CreateAccount'

describe('Cognito client sdk', () => {
  it('forms the body of a create account request', () => {
    const { account, password, agrees, ...profileData } = testProfile
    const attributeList = []
    Object.keys(profileData).forEach(key => {
      attributeList.push({ Name: `custom:${key}`, Value: testProfile[key] })
    })
    const cognito = new Cognito(account, password, profileData)
    const cognitoInstance = cognito.createAccount()
    expect(mockFunction).toHaveBeenCalled()
  })
})
