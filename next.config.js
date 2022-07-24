require('dotenv').config();

module.exports = {
  reactStrictMode: true,
  env: {
    REACT_APP_RSA_KEY : process.env.REACT_APP_RSA_KEY,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    NEXTAUTH_URL: 'http://localhost:3000/'
  }
}
