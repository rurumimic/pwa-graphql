const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public'
  },
  env: {
    PROJECT_DIRNAME: __dirname,
  },
})