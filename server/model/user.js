var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var obj = {
	phone:String,
	password:String
}

var model = mongoose.model("user",Schema(obj));

module.exports = model;