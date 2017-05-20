var mongoose = require('mongoose');
var DBschema = new mongoose.Schema({
  name: String,
  emailID: String,
  age: Number,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DB', DBschema);