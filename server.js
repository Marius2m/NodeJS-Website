var express 	  = require("express"),
	  db 			    = require("mysql"),
	  db_config	  = require('./db/config'),
	  app 		    = express(),
	  bodyParser  = require('body-parser'),
  	pool_config	= require('./db/init'),
	  pool 		    = pool_config(db_config);

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"))

// INDEX
app.get('/', (req, res) => {
	res.redirect('home');
});

// HOME
app.get('/home', (req, res) => {
	res.render('index', {route: 'home'});
});

// TEAM
app.get('/team', (req, res) => {
	handle_db_call(req, res, 'team', 'SELECT * FROM staff');
});

//SERVICES
app.get('/services', (req, res) => {
	res.render('services', {route:'services'});
});

//CONTACT
app.get('/contact', (req, res) => {
	res.render('contact_2', {route:'contact'});
});

//LOGIN
app.get('/login', (req, res) => {
	res.render('login', {route:'login'});
});

//REGISTER
app.get('/register', (req, res) => {
	res.render('register', {route:'register'});
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});

/*
var server = app.listen(3000, function(){
  console.log("listening on port number %d", server.address().port);
});
*/
function handle_db_call(req, res, page, query) {
	pool.getConnection((err, connection) => {
		if(err) throw err;
		connection.query(query, (error, rows) => {
			connection.release();
			if (error) throw error;
			data = JSON.parse(JSON.stringify(rows));
			res.render(page, {data: data, route: page})
		});
	});
}
