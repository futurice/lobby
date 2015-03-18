module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
  models: {
    connection: 'someMongodbServer'
  },

  /***************************************************************************
   * Set the port in the production environment to 8080                      *
   ***************************************************************************/
  port: 8080,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/
  log: {
    level: "silent"
  }

};
