// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var APIRequestSchema = new Schema({
  date: { type: Date, default: Date.now },
  ip: String,
  function: String,
  inputs: String
});


mongoose.model('APIRequest', APIRequestSchema);
