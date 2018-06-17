import { COGNITO_CLIENT_ID } from '../../utilities/envVarsFromDisk'
jest.mock('../cognito')
import * as Cognito from '../cognito'
import { testProfile } from '../../containers/CreateAccount/CreateAccount'

describe('Cognito client sdk', () => {
  it('forms the body of a create account request', () => {
    const { account, password, agrees, ...profileData } = testProfile
    const attributeList = []
    Object.keys(profileData).forEach(key => {
      attributeList.push({ Name: `custom:${key}`, Value: testProfile[key] })
    })
    Cognito.createAccount(account, password, profileData)
    expect(Cognito.createAccount).toHaveBeenCalled()
    //TODO: assert on cognito properties
  })

  it('forms the body of an auth account request', () => {
    const { account, password } = testProfile
    Cognito.authAccount(account, password)
    expect(Cognito.authAccount).toHaveBeenCalled()
  })
})
