var express 	  = require("express"),
	  db 			    = require("mysql"),
	  db_config	  = require('./db/config'),
	  app 		    = express(),
	  bodyParser  = require('body-parser'),
  	pool_config	= require('./db/init'),
	  pool 		    = pool_config(db_config),
		connection  = db.createConnection(db_config),
		moment      = require('moment'),
	 	routes 			= require('routes'),
	  fs          = require('fs');
	 	user    		= require('./routes/user');

		app.set('views', __dirname + '/views');

		console.log(moment('2012-12-12 12:12'));

		var session = require('client-sessions');
		app.use(session({
		  cookieName: 'session',
		  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
		  duration: 7 * 24 * 60 * 60 * 1000,
		  activeDuration: 5 * 60 * 1000,
		  httpOnly: true,
		  secure: true,
		  ephemeral: true
		}));

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"))

// INDEX
app.get('/', (req, res) => {
	res.redirect('home');
});

// HOME
app.get('/home', (req, res) => {
	//res.render('index', {route: 'home'});
	handle_db_call(req, res, 'index', 'SELECT * FROM homepage');
});

// TEAM
app.get('/team', (req, res) => {
	handle_db_call(req, res, 'team', 'SELECT * FROM staff');
});

<<<<<<< HEAD
app.get('/appointment/:appointmentId', (req, res) => {
	var sql = "UPDATE `wad`.`appointment` SET `is_cancelled`='1' WHERE `id`= " + req.params.appointmentId;

	connection.query(sql, function (error, results, fields) {
		if (error) throw error;
		var data = JSON.parse(JSON.stringify(results));
		console.log(results);
		  res.redirect('/account');
	});
})

// ACCOUNT
/*
app.get('/account', (req, res) => {
	res.render('account', {route:'account'});
});*/
=======
// ACCOUNT
app.get('/account', (req, res) => {
	res.render('account', {route:'account'});
});
>>>>>>> origin/node_js

// SERVICES
app.get('/services', (req, res) => {
	connection.query('SELECT * FROM footerpage LIMIT 1', function (error, results, fields) {
		if (error) throw error;
		footerData = JSON.parse(JSON.stringify(results));
		connection.query('SELECT * FROM postT', function (error, results, fields) {
			if (error) throw error;
			var f1 = results.length;
			console.log("NR OF FIELDS" + f1);

			postTData = JSON.parse(JSON.stringify(results));
			connection.query('SELECT * FROM pricesT', function (error, results, fields) {
				if (error) throw error;
				pricesTData = JSON.parse(JSON.stringify(results));
				var f2 = results.length;

				res.render('services', {route:'services', footer: footerData,
				 user: req.session.user, postT: postTData, postTFields: f1, pricesT: pricesTData, priceTFields: f2});
			});
			//res.render('services', {route:'services', footer: footerData, user: req.session.user, picpages: picturesData});
		});
		//res.render('services', {route:'services', footer: footerData, user: req.session.user, picpages: 'services'});
	});
});

// CONTACT
app.get('/contact', (req, res) => {
	//res.render('contact_2', {route:'contact'});
	handle_db_call(req, res, 'contact_2', 'SELECT * FROM contactpage');
});

// LOGIN
app.get('/login', (req, res) => {
	res.render('login', {route:'login'});
});
//from routes
/*app.get('/login', routes.index);*/

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
			connection.query('SELECT * FROM footerpage LIMIT 1', function (error, results, fields) {
			  if (error) throw error;
				footerData = JSON.parse(JSON.stringify(results));
				res.render(page, {data: data, route: page, footer: footerData, user: req.session.user})
			});
		});
	});
}


//PART 2
<<<<<<< HEAD


//Middleware

//GET routes to load HTML template file in server.js file

//POST routes
app.post('/login', user.login);//call for login post
app.post('/register', user.register);//call for signup post
app.post('/saveAppointment', user.saveAppointment);//call for create a new appointment post
app.post('/sendEmail', user.sendEmail)//call for sendEmail from contact Page

app.get('/logout', user.logout);
app.get('/account', user.account); //call for dashboard page after login
=======
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
>>>>>>> origin/node_js


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
