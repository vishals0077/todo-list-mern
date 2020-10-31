var express = require('express');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const path = require('path');
const app =  express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
let apiRoutes = require('./routes');
app.use('/api',apiRoutes);

mongoose.connect('mongodb+srv://vishalmongo:vsharmaa0077@cluster0.q0bvj.mongodb.net/todoList',{useFindAndModify: false,useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex: true,});
var db = mongoose.connection;
if(!db)
{
	console.log('error in connection')
}
else
{
	console.log('connected')
}
app.get("/",(req,res)=>{
	console.log("server running ")
	res.json({
		message:"hello there"
	})
})
app.listen(process.env.PORT || 8080)
