const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../public'),
  devServer: {
    proxy: {
      '/api/login': {
        target: 'http://localhost:5000'
      }
    }
  }
};