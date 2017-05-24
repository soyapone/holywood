
var mongoose = require('mongoose');
var APIRequest = mongoose.model('APIRequest');
var ipaddr = require('ipaddr.js');


function transformIP(ipString){

  if (ipaddr.IPv4.isValid(ipString)) {
    // ipString is IPv4
    return ipString;
  } else if (ipaddr.IPv6.isValid(ipString)) {
    var ip = ipaddr.IPv6.parse(ipString);
    if (ip.isIPv4MappedAddress()) {
      // ip.toIPv4Address().toString() is IPv4
      return ip.toIPv4Address().toString();
    } else {
      // ipString is IPv6
      return ipString;
    }
  } else {
    // ipString is invalid
    return "bad IP";
  }
}

exports.SaveAPIRequest = function(ip,functionname,inputs){

  var newIP = transformIP(ip);


  var newAPIRequest = new APIRequest ({
    'ip' : newIP,
    'function' : functionname,
    'inputs' : JSON.stringify(inputs)
  });

  newAPIRequest.save().then(undefined, function(err){
    var msg = "Error saving APIRequest in database. More info: " + err;
    console.log(msg);
  });

}
