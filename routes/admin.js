var db          = require("mysql"),
    db_config	  = require('../db/config'),
    pool_config	= require('../db/init'),
    pool 		    = pool_config(db_config),
    moment      = require('moment'),
    nodemailer  = require('nodemailer'),
    exphbs      = require('express-handlebars'),
    fileUpload  = require('express-fileupload'),
    busboy      = require('then-busboy');

exports.adminPanel = function (req, res){
  if(req.method == "POST"){
    var post    = req.body;
    var title   = post.title;
    //var picture = '10';
    var youtube = post.youtube;
    var text    = post.textarea;


    var user = req.session.user;
    userId   = req.session.userId;

    console.log("user: " + user);
    console.log("userId: " + userId);

    if(!req.files)
      return res.status(400).send('No files were uploaded.');

    var file     = req.files.uploaded_image;
    var img_name = file.name;

    if(file.mimetype == "image/jpeg" || file.mimetype == "image/png"){
      file.mv('public/assets/img/services/'+file.name, function(err){
        if(err){
          return res.status(500).send(err);
        }
        var sql   = "INSERT INTO `postT`(`title`,`youtube_link`,`text_area`,`image`) VALUES ('" + title + "','" + youtube + "','" + text + "','" + img_name + "')";
        pool.getConnection((err, connection) => {
          if(err) throw err;
          connection.query(sql, (error, rows) => {
            connection.release();
            if(error){
              res.render('admin', {msg: "Failed to make POST", error: 1});
            }else{
              res.render('admin', {msg: "POST successfully", user: user});
            }
          });
        });
      });
    }else{
      res.render('admin', {msg: "Failed to make POST (not admin/ wrong img format)", error: 1});
    }
  }else{
    res.render('admin', {msg: "Failed to make POST", error: 1});
  }
};
