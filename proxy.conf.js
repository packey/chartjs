module.exports = {
  '/configuration.json': {
    target: 'http://localhost:4200/configurations',
    secure: false
  },
  '/version.json': {
    target: 'https://organizationmanagement-dev.tecan.com/',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
    headers: {
      // Override Origin header to satisfy the Azure API Management policy which doesn't recognize localhost
      Origin: 'https://organizationmanagement-dev.tecan.com/'
    }
  },
  '/api/**': {
    target: 'https://organizationmanagement-dev.tecan.com/',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
    headers: {
      // Override Origin header to satisfy the Azure API Management policy which doesn't recognize localhost
      Origin: 'https://organizationmanagement-dev.tecan.com/'
    }
  }
};
