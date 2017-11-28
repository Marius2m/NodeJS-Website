/*
* GET home page.
*/

exports.message_index = function(req, res){
    var message = '';
  res.render('message_index',{message: message});
}
