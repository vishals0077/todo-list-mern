const mongoose = require('mongoose');
const User = require('../models/usermodel');
const fs = require('fs');
const path = require('path');
var bcrypt = require('bcrypt-nodejs');
exports.signIn = function (req,res){
	
	User.find({email:{$eq: req.body.email}},function(err,user){
		if(err)
		{
			res.json({
				status:500,
				message: err
			})	
		}
		else
		{
			if(user.length!==0)
			{
				if(bcrypt.compareSync(req.body.password,user[0].password))
				{
					res.json({
					status:200,
					data: user
				})
				}
				else
				{
					res.json({
						status:300,
						message: 'invalid credetials'
					})
				}
			}

			else
			{
				res.json({
					status:400,
					message:'not a registered user'
				})
			}

		}
	})

}
exports.signUp=function(req,res){
	
	
	User.find({email:{$eq:req.body.email}},function(err,user){
		if(err)
		{
			res.json({
				status:500,
				message: err
			})
		}
		else
		{
			if(user.length!==0)
			{
				res.json({
					status:400,
					message: 'email already registered'
				})
			}
			else
			{
					var user = new User();
					user.name = req.body.name;
					user.email = req.body.email;
					user.password = (bcrypt.hashSync(req.body.password));
					user.save(function(err){
						if(err)
						{
							res.json({
								status:500,
								message:err
							})
						}
						else
						{

							res.json({
								status:200,
								data: user
							})
						}
					})
			}
		}
	})

}


