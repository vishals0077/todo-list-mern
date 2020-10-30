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
// if(process.env.NODE_ENV === 'production') {
// 	app.use(express.static('frontend/internship-task/build'));
// 	app.get('*',(req,res)=> {
// 		res.sendFile(path.join(__dirname, 'frontend','internship-task','build','index.html'));
// 	});
// }
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
})
app.listen(process.env.port || 8080)
