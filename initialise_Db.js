var db 			= require("mysql"),
	db_config	= require('./db/config'),
	bodyParser  = require('body-parser'),
	pool_config	= require('./db/init'),
	pool 		= pool_config(db_config);

function data() {
	console.log("Somn");
}

function handle_db_call(query) {
	pool.getConnection((err, connection) => {
		if(err) throw err;
		connection.query(query, (error, rows) => {
			connection.release();
			if (error) throw error;
			console.log("Query done");
		});
	});
}