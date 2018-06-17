import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js'
import {
  COGNITO_CLIENT_ID,
  COGNITO_POOL_ID
} from '../utilities/envVarsFromDisk'

// import fetchIntercept from 'fetch-intercept'

//used for logging cognito requests which, in turn,
//structures their assertions in unit testing
// fetchIntercept.register({
//   request(url, config) {
//     console.log(url)
//     console.log(config)
//     return [url, config]
//   }
// })

const poolData = {
  UserPoolId: COGNITO_POOL_ID,
  ClientId: COGNITO_CLIENT_ID
}

const userPool = new CognitoUserPool(poolData)

const createAccount = (account, password, profileData) => {
  const attributeList = []
  const validationData = null

  Object.keys(profileData).forEach(key => {
    attributeList.push({
      Name: `custom:${key}`,
      Value: profileData[key]
    })
  })

  const cognitoAsync = new Promise((resolve, reject) => {
    userPool.signUp(
      account,
      password,
      attributeList,
      validationData,
      (err, result) => {
        if (err) {
          // console.log(err.message || JSON.stringify(err))
          reject(err)
          return
        } else {
          // console.log(result.getUsername() + ' was created')
          resolve(result)
          return
        }
      }
    )
  })
  return cognitoAsync
}

const authAccount = (account, password) => {
  const authData = {
    Username: account,
    Password: password
  }

  const authDetails = new AuthenticationDetails(authData)
  // console.log(authDetails)

  const accountData = {
    Username: account,
    Pool: userPool
  }

  const cognitoAccount = new CognitoUser(accountData)

  const token = new Promise((resolve, reject) => {
    cognitoAccount.authenticateUser(authDetails, {
      onSuccess: result => {
        // console.log(result)
        resolve(result.getAccessToken().getJwtToken())
        return
      },
      onFailure: err => {
        reject(JSON.stringify(err))
        return
      }
    })
  })
  return token
}

const clearCachedCognitoTokens = () => {
  //https://github.com/aws/aws-amplify/blob/0dad34c273dd82438e23da0d8bbb4a978fddf2de/packages/amazon-cognito-identity-js/lib/CognitoUser.js#L1344-L1355
  //clearCachedTokens() from cognito sdk fails. custom purge of localStorage:
  let keysOnStorage = Object.keys(localStorage)
  const cognitoISPKey = `CognitoIdentityServiceProvider.${COGNITO_CLIENT_ID}`
  let cognitoFiltered = []
  //filter CognitoIdentityServiceProvider localStorage keys
  for (let i = 0; i < keysOnStorage.length; i++) {
    const indexISP = keysOnStorage[i].indexOf(cognitoISPKey)
    if (indexISP >= 0) {
      cognitoFiltered.push(keysOnStorage[i])
    }
  }
  //remove CognitoIdentityServiceProvider keys from localStorage
  for (let k = 0; k < cognitoFiltered.length; k++) {
    localStorage.removeItem(cognitoFiltered[k])
  }
  // console.log(`localStorage length is ${localStorage.length}`)
}

export { createAccount, authAccount, clearCachedCognitoTokens }
