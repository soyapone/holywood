
var mongoose = require('mongoose');
var APIRequest = mongoose.model('APIRequest');



exports.SaveAPIRequest = function(ip,functionname,inputs){

  var newAPIRequest = new APIRequest ({
    'ip' : ip,
    'function' : functionname,
    'inputs' : JSON.stringify(inputs)
  });

  newAPIRequest.save().then(undefined, function(err){
    var msg = "Error saving APIRequest in database. More info: " + err;
    console.log(msg);
  });

}
