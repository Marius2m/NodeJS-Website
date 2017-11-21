var db          = require("mysql"),
    db_config	  = require('../db/config'),
    pool_config	= require('../db/init'),
    pool 		    = pool_config(db_config);

exports.login = function(req, res){
  var message = '';
  var sess = req.session;

  if(req.method == "POST"){
    var post  = req.body;
    var name = post.user_name;
    var pass = post.password;
    console.log("HEREE");
    var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";                          
    pool.getConnection((err, connection) => {
  		if(err) throw err;
  		connection.query(sql, (error, rows) => {
  			connection.release();
  			if (error) throw error;
  			results = JSON.parse(JSON.stringify(rows));
        if(results.length){
          req.session.userId = results[0].id;
          req.session.user = results[0];
          console.log(results[0].id);
          res.redirect('/account');
        }
        else{
          message = 'Wrong Credentials.';
          res.render('login',{message: message});
        }
  		});
  	});
  } else {
    res.render('register',{message: message});
  }        
};

exports.register = function(req, res){
  var message = '';
  if(req.method == "POST"){
    var post  = req.body;
    var name= post.user_name;
    var pass= post.password;
    var fname= post.first_name;
    var lname= post.last_name;
    //var mail= post.email;

    var sql = "INSERT INTO `users`(`first_name`,`last_name`,`user_name`,`password`) VALUES ('" + fname + "','" + lname +  "','" + name + "','" + pass + "')";

    pool.getConnection((err, connection) => {
  		if(err) throw err;
  		connection.query(sql, (error, rows) => {
  			connection.release();
  			if (error) {
            res.redirect('/register');
        } else {
          res.redirect('/login');
        }
  		});
  	});

  } else {
    res.render('/home');
  }
};

exports.account = function(req, res, next){

  var user =  req.session.user;
  userId = req.session.userId;

  if(userId == null || user == null){
    req.session.reset();
    res.redirect("login");
    return;
  }

  var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";

  db.query(sql, function(err, results){

    console.log(results);

    res.render('account');

  });
};

exports.logout = function (req, res){
  req.session.reset();
  res.redirect('/');
};
