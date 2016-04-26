var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'holywood'
    },
    port: process.env.PORT || 3705,
    db: 'mongodb://localhost/holywood-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'holywood'
    },
    port: process.env.PORT || 3705,
    db: 'mongodb://localhost/holywood-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'holywood'
    },
    port: process.env.PORT || 3705,
    db: 'mongodb://localhost/holywood-production'
  }
};

module.exports = config[env];
