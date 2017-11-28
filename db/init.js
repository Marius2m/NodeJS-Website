//===============================================
// db init
//===============================================

var mysql = require('mysql')

module.exports = function(self) {
  //create pool
  return mysql.createPool({
    connectionLimit: self.maxConnections,
    host: self.host,
    user: self.user,
    password: self.password,
    database: self.database,
    debug: false
  })
}