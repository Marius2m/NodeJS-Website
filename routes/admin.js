var db          = require("mysql"),
    db_config	  = require('../db/config'),
    pool_config	= require('../db/init'),
    pool 		    = pool_config(db_config),
    moment      = require('moment'),
    nodemailer  = require('nodemailer'),
    exphbs      = require('express-handlebars');

exports.adminPanel = function (req, res){
  if(req.method == "POST"){
    var post    = req.body;
    var title   = post.title;
    var picture = '10';
    var youtube = post.youtube;
    var text    = post.textarea;

    console.log("title:" + title);
    console.log("youtube:" + youtube);
    console.log("text:" + text);

    var sql = "INSERT INTO `postT`(`title`,`picture_id`,`youtube_link`,`text_area`) VALUES ('" + title + "','" + picture + "','" + youtube + "','" + text + "')";
    console.log(sql);
    pool.getConnection((err, connection) => {
      if(err) throw err;
      connection.query(sql, (error, rows) => {
        connection.release();
        if(error){
          res.render('admin', {msg: "Failed to make POST", error: 1});
        }else{
          res.render('admin', {msg: "POST successfully"});
        }
      });
    });
    //res.render('admin', {msg: "POST successfully"});
  }else{
    res.render('admin', {msg: "Failed to make POST", error: 1});
  }
}
