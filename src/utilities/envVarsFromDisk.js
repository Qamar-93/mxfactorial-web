import fs from 'fs'

//REACT_APP_ variables not available in automated tests
//solution: read from disk if not in developer environment:
let BASE_URL, HOST_ENV
if (!(process.env.REACT_APP_BASE_URL && process.env.REACT_APP_HOST_ENV)) {
  const fileList = fs.readdirSync('.')
  const regExp = /\.env.+/g
  const fileName = fileList.filter(fileName => fileName.match(regExp))[0]
  const fileContent = fs.readFileSync(fileName).toString()
  //https://stackoverflow.com/a/1156388
  const fileLines = fileContent.split(/\r\n|\r|\n/g)
  const baseUrlRegExp = /REACT_APP_BASE_URL=.+/g
  const hostEnvRegExp = /REACT_APP_HOST_ENV=.+/g
  for (let i = 0; i < fileLines.length; i++) {
    if (fileLines[i].match(baseUrlRegExp)) {
      BASE_URL = fileLines[i].substr(fileLines[i].indexOf('=') + 1)
    } else if (fileLines[i].match(hostEnvRegExp)) {
      HOST_ENV = fileLines[i].substr(fileLines[i].indexOf('=') + 1)
    }
  }
} else {
  BASE_URL = process.env.REACT_APP_COGNITO_POOL_ID
  HOST_ENV = process.env.REACT_APP_COGNITO_CLIENT_ID
}

export { BASE_URL, HOST_ENV }
