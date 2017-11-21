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

// ACCOUNT
app.get('/account', (req, res) => {
	res.render('account', {route:'account'});
});

// SERVICES
app.get('/services', (req, res) => {
	res.render('services', {route:'services'});
});

// CONTACT
app.get('/contact', (req, res) => {
	res.render('contact_2', {route:'contact'});
});

// LOGIN
app.get('/login', (req, res) => {
	res.render('login', {route:'login'});
});

// REGISTER
app.get('/register', (req, res) => {
	res.render('register', {route:'register', message: ''});
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


//PART 2
var routes  = require('routes')
var user    = require('./routes/user');
var session = require('client-sessions');

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//Middleware
//POST routes
app.post('/login', user.login);//call for login post
app.post('/register', user.register);//call for signup post

app.get('/logout', user.logout);
app.get('acount', user.account); //call for dashboard page after login


//rest api to get all results
app.get('/data', function (req, res) {
	pool.getConnection((err, connection) => {
		if(err) throw err;
		var sql = 'SELECT * FROM users;';
		connection.query(sql, (error, rows) => {
			connection.release();
			if (error) throw error;
	//		data = JSON.parse(JSON.stringify(rows));
			res.end(JSON.stringify(rows));
		});
	});
});
