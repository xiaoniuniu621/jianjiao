var express = require('express');
var router = express.Router();

var UserModel = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',function(req,res){
	var flag = true;
		UserModel.find({
			phone:req.body.phone
		},function(err,data){

			if(data.length === 0){
				UserModel.create({
					phone:req.body.phone,
					password:req.body.password
				},function(err,data){
					res.send(flag)
				})
			}else{
				flag = false;
				res.send(flag);
			}
		})
	
	})

 router.post('/login',function(req,res){
 	var flag1 = true;
 	UserModel.find({
 		phone:req.body.phone,
 		password:req.body.password
 	},function(err,data){
 		if(data.length === 0){
 			flag1 = false;
 			res.send(flag1);
 		}else{			

	 			res.cookie("userId",data[0].phone.substr(7),{
	 					path:'/',
	 					maxAge:1000*60*60
	 			});
 			res.send(flag1);
 		}
 	})
 })

module.exports = router;