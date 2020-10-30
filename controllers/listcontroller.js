const mongoose = require('mongoose');
const List = require('../models/listmodel');
const fs = require('fs');
const path = require('path');
var bcrypt = require('bcrypt-nodejs');
exports.addTask = function(req,res){
	List.findOne({user_Id:{$eq:req.body.user_Id}},function(err,task){
		if(err)
		{
			res.json({
				status:500,
				message:err
			})
		}
		else
		{
			List.findOneAndUpdate({user_Id:{$eq:req.body.user_Id}},{$push:{task: {task: req.body.task}}},{new:true},function(err,task){
				if(err)
				{
					res.json({
						status:500,
						message: err
					})
				}
				else
				{
					res.json({
						status:200,
						data: task
					})
				}
			})
		}
	})
}

exports.getTask = function(req,res){
	List.findOne({user_Id:{$eq:req.body.user_Id}},function(err,task){
		if(err)
		{
			res.json({
				status:500,
				message:err
			})
		}
		else
		{
			if(!task)
			{
				var list = new List();
				list.user_Id = req.body.user_Id,
				
				list.save(function(err){
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
								data: list
							})
						}
					})
			}
			else
			{
				res.json({
					status:200,
					data: task
				})
			}
		}
	})
}

exports.deleteTask=function (req,res){
	List.findOne({user_Id:{$eq:req.body.user_Id}},function(err,tasklist){
		if(err)
		{
			res.json({
				status:500,
				message: err
			})
		}
		else
		{
			 tasklist.task.splice(req.body.indexvalue,1);
			List.findOneAndUpdate({user_Id:{$eq:req.body.user_Id}},{$set:{task: tasklist.task}},{new:true},function(err,task){
				if(err)
				{
					res.json({
						status:500,
						message: err
					})
				}
				else
				{
					res.json({
						status:200,
						data: task
					})
				}
			})
		}
	})
}		
