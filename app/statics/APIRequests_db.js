
var mongoose = require('mongoose');
var APIRequest = mongoose.model('APIRequest');
//var ipaddr = require('ipaddr');


function transformIP(ipString){
  //console.log("Entro. ",ipString);

  var ipv4 = ipString.replace(/^.*:/, '');
  //console.log("ipv4: ", ipv4);
  return ipv4;

  //console.log("prueba: ", ipaddr.IPv4.isValid(ipString));
// if (ipaddr.IPv4.isValid(ipString)) {
  //   // ipString is IPv4
  //   console.log("Entrada 1: ipaddr.IPv4.isValid(ipString): ",ipString);
  //   return ipString;
  // } else if (ipaddr.IPv6.isValid(ipString)) {
  //   console.log("Entrada 2: ipaddr.IPv6.isValid(ipString): ",ipString);
  //   var ip = ipaddr.IPv6.parse(ipString);
  //   console.log("Entrada 3: ip: ",ip);
  //   if (ip.isIPv4MappedAddress()) {
  //     // ip.toIPv4Address().toString() is IPv4
  //     console.log("Entrada 4: ip.isIPv4MappedAddress(): ",ip.toIPv4Address().toString());
  //     return ip.toIPv4Address().toString();
  //   } else {
  //     // ipString is IPv6
  //     console.log("Entrada 5: ipString: ",ipString);
  //     return ipString;
  //   }
  // } else {
  //   // ipString is invalid
  //   console.log("Entrada 6: bad ip.");
  //   return "bad IP";
  // }
}

exports.SaveAPIRequest = function(ip,functionname,inputs){

  var newIP = transformIP(ip);
 //var newIP ="pepe";

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
