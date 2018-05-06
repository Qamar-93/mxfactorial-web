import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_POOL_ID,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID
}

const userPool = new CognitoUserPool(poolData)

const createAccount = (username, password) => {
  let cognitoUser
  let attributeList = []
  let validationData = null
  userPool.signUp(
    username,
    password,
    attributeList,
    validationData,
    (err, result) => {
      if (err) {
        console.log(err.message || JSON.stringify(err))
        return
      }
      cognitoUser = result.user
      console.log(cognitoUser.getUsername() + ' was created')
    }
  )
}

export { createAccount }
