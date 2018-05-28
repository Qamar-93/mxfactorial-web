import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js'

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

const poolInfo = {
  UserPoolId: process.env.REACT_APP_COGNITO_POOL_ID || 'us-east-1_unit-test',
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID || 'unit-test'
}

class Cognito {
  constructor(account, password, poolData = poolInfo) {
    this.account = account
    this.password = password
    this.userPool = new CognitoUserPool(poolData)
  }

  createAccount(profileData) {
    const attributeList = []
    const validationData = null

    Object.keys(profileData).forEach(key => {
      attributeList.push({
        Name: `custom:${key}`,
        Value: profileData[key]
      })
    })

    const cognitoAsync = new Promise((resolve, reject) => {
      this.userPool.signUp(
        this.account,
        this.password,
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

  authAccount() {
    const authData = {
      Username: this.account,
      Password: this.password
    }

    const authDetails = new AuthenticationDetails(authData)

    const accountData = {
      Username: this.account,
      Pool: this.userPool
    }

    const cognitoAccount = new CognitoUser(accountData)

    const token = new Promise((resolve, reject) => {
      cognitoAccount.authenticateUser(authDetails, {
        onSuccess: result => {
          console.log(result)
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
}

export { Cognito }
