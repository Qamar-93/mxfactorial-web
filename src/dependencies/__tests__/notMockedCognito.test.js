import { COGNITO_CLIENT_ID } from '../../utilities/envVarsFromDisk'
import * as Cognito from '../cognito'

describe('Cognito client sdk', () => {
  it('flushes local storage using custom purge function', () => {
    window.localStorage = {
      [`CognitoIdentityServiceProvider.${COGNITO_CLIENT_ID}.LastAuthUser`]: `aUser`,
      [`CognitoIdentityServiceProvider.${COGNITO_CLIENT_ID}.aUser.accessToken`]: `aToken`,
      [`CognitoIdentityServiceProvider.${COGNITO_CLIENT_ID}.aUser.clockDrift`]: `0`,
      [`CognitoIdentityServiceProvider.${COGNITO_CLIENT_ID}.aUser.deviceGroupKey`]: `aDeviceGroupKey`,
      [`CognitoIdentityServiceProvider.${COGNITO_CLIENT_ID}.aUser.deviceKey`]: `aDeviceKey`,
      [`CognitoIdentityServiceProvider.${COGNITO_CLIENT_ID}.aUser.idToken`]: `anIdToken`,
      [`CognitoIdentityServiceProvider.${COGNITO_CLIENT_ID}.aUser.randomPasswordKey`]: `aRandomPasswordKey`,
      [`CognitoIdentityServiceProvider.${COGNITO_CLIENT_ID}.aUser.refreshToken`]: `aRefreshToken`
    }
    const mockFn = jest.fn().mockImplementation(key => {
      delete window.localStorage[key]
    })
    window.localStorage.removeItem = mockFn
    Cognito.clearCachedCognitoTokens()
    let keysOnStorage = Object.keys(window.localStorage)
    const cognitoISPKey = `CognitoIdentityServiceProvider.${COGNITO_CLIENT_ID}`
    let cognitoFiltered = []
    //filter CognitoIdentityServiceProvider localStorage keys
    for (let i = 0; i < keysOnStorage.length; i++) {
      const indexISP = keysOnStorage[i].indexOf(cognitoISPKey)
      if (indexISP >= 0) {
        cognitoFiltered.push(keysOnStorage[i])
      }
    }
    expect(mockFn).toHaveBeenCalled()
    expect(cognitoFiltered).toHaveLength(0)
  })
})
