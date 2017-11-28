var db          = require("mysql"),
    db_config	  = require('../db/config'),
    pool_config	= require('../db/init'),
    pool 		    = pool_config(db_config),
    moment      = require('moment'),
    nodemailer  = require('nodemailer'),
    exphbs      = require('express-handlebars');

exports.login = function(req, res){
  var message = '';
  var sess = req.session;

  if(req.method == "POST"){
    var post  = req.body;
    var name = post.user_name;
    var pass = post.password;

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

          res.redirect('/account');
        }
        else{
          message = 'Wrong Credentials.';
          res.render('login.ejs',{message: message});
        }
  		});
  	});
  } else {
    res.render('login.ejs',{message: message});
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

exports.saveAppointment = function(req, res){
  var message = '';
  if(req.method == "POST"){
    var post    =  req.body;
    var dr_id   =  1;
    var dr_name =  post.doctor;
    var user_id =  req.session.userId;
    var descp   =  post.message_txt;
    var whenn   =  post.date + " " + post.time;
    console.log("dr_id: " + dr_id);
    console.log("dr_name: " + dr_name);
    console.log("user_id: " + user_id);
    console.log("descp: " + descp);
    console.log("whenn: " + whenn);

    var sql = "INSERT INTO `appointment`(`doctor_id`, `doctor_name`, `user_id`, `description`, `when`) VALUES ('" + dr_id + "','" + dr_name +  "','" + user_id + "','" + descp + "','" + whenn + "')";
    console.log(sql);

    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query(sql, (error, rows) => {
        connection.release();
        if (error) {
            res.redirect('/home');
        } else {
          res.redirect('/account');
        }
      });
    });

  } else {
    res.render('/home');
  }
};

exports.sendEmail = function(req, res){
  if(req.method == "POST"){
    var post    = req.body;
    var fname   = post.full_name;
    var email   = post.email;
    var message = post.message;

    const output = `
      <p> New Message </p>
      <h3> Contact Details </h3>
      <ul>
      <li> Name: ${fname} </li>
      <li> Email: ${email} </li>
      </ul>
      <h3> Message </h3>
      <p> ${message} </p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        //host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'testemailWAD@gmail.com', // generated ethereal user
            pass: 'breezer23'  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Dental Clinic Contact" <testemailWAD@gmail.com>', // sender address
        to: 'testemailWAD@gmail.com, mariusmircea@outlook.com', // list of receivers
        subject: 'Contact', // Subject line
        text: 'Hello world?', // plain text body
        html: output// html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        //var msg = 'Email has been sent!';
        app.locals.msg = 'Email has been sent!'
        res.render('contact_2', {msg: 'IDK', route: 'contact'});

    });

    console.log("FROM USER.JS sendEmail: " + fname + email + message);
    //res.redirect('/contact');
    //res.end("Request processed successfully...\n");
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query( (error, rows) => {
        connection.query('SELECT * FROM footerpage LIMIT 1', function (error, results, fields) {
  			  if (error) throw error;
          var footerData = JSON.parse(JSON.stringify(results));
          res.render('contact_2', {msg: 'Your message has been sent!', route: 'contact', footer: footerData, user: req.session.user});
        });
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
    res.redirect('/login');
    return;
  }

  var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";
  var sql_app = 'SELECT * FROM appointment WHERE user_id = ' + userId;

  pool.getConnection((err, connection) => {
    if(err) throw err;
    connection.query(sql, (error, rows) => {
      connection.query('SELECT * FROM footerpage LIMIT 1', function (error, results, fields) {
			  if (error) throw error;
        var footerData = JSON.parse(JSON.stringify(results));

        connection.query(sql_app, function(error, results, fields) {
          if (error) throw error;
          var appointmentsData = JSON.parse(JSON.stringify(results))
            .filter(item => { return moment().diff(moment(item.when)) < 0})
            .map(item => {
              var whenObj = { when: moment(item.when).format("dddd, MMMM Do YYYY, h:mm a")}
              return Object.assign({}, item, whenObj);
            });

          res.render('account', {
            user: user,
            route: 'account',
            footer: footerData,
            appointments: appointmentsData
          });
        });
			});
    });
  });
/*  db.query(sql, function(err, results){

    console.log(results);

    res.render('account');

  });*/
};

exports.logout = function (req, res){
  req.session.reset();
  res.redirect('/');
};
