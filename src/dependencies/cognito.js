import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_POOL_ID || 'us-east-1_unit-test',
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID || 'unit-test'
}

const userPool = new CognitoUserPool(poolData)

const createAccount = createAccountData => {
  let attributeList = []
  let validationData = null

  const firstName = {
    Name: `custom:firstName`,
    Value: createAccountData.firstName
  }
  attributeList.push(firstName)

  const middleName = {
    Name: `custom:middleName`,
    Value: createAccountData.middleName
  }
  attributeList.push(middleName)

  const lastName = {
    Name: `custom:lastName`,
    Value: createAccountData.lastName
  }
  attributeList.push(lastName)

  const country = {
    Name: `custom:country`,
    Value: createAccountData.country
  }
  attributeList.push(country)

  const streetNumber = {
    Name: `custom:streetNumber`,
    Value: createAccountData.streetNumber
  }
  attributeList.push(streetNumber)

  const streetName = {
    Name: `custom:streetName`,
    Value: createAccountData.streetName
  }
  attributeList.push(streetName)

  const floorNumber = {
    Name: `custom:floorNumber`,
    Value: createAccountData.floorNumber
  }
  attributeList.push(floorNumber)

  const unit = {
    Name: `custom:unit`,
    Value: createAccountData.unit
  }
  attributeList.push(unit)

  const cityName = {
    Name: `custom:cityName`,
    Value: createAccountData.cityName
  }
  attributeList.push(cityName)

  const stateName = {
    Name: `custom:stateName`,
    Value: createAccountData.stateName
  }
  attributeList.push(stateName)

  const postalCode = {
    Name: `custom:postalCode`,
    Value: createAccountData.postalCode
  }
  attributeList.push(postalCode)

  const countryDialingCode = {
    Name: `custom:countryDialingCode`,
    Value: createAccountData.countryDialingCode
  }
  attributeList.push(countryDialingCode)

  const areaCode = {
    Name: `custom:areaCode`,
    Value: createAccountData.areaCode
  }
  attributeList.push(areaCode)

  const phoneNumber = {
    Name: `custom:phoneNumber`,
    Value: createAccountData.phoneNumber
  }
  attributeList.push(phoneNumber)

  const dateOfBirth = {
    Name: `custom:dateOfBirth`,
    Value: createAccountData.dateOfBirth
  }
  attributeList.push(dateOfBirth)

  const industryName = {
    Name: `custom:industryName`,
    Value: createAccountData.industryName
  }
  attributeList.push(industryName)

  const occupationName = {
    Name: `custom:occupationName`,
    Value: createAccountData.occupationName
  }
  attributeList.push(occupationName)

  const emailAddress = {
    Name: `custom:emailAddress`,
    Value: createAccountData.emailAddress
  }
  attributeList.push(emailAddress)

  const cognitoAsync = new Promise((resolve, reject) => {
    userPool.signUp(
      createAccountData.account,
      createAccountData.password,
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

export { createAccount }
