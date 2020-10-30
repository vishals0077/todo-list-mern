const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const userListSchema = new Schema({
	user_Id:{
		type:Schema.Types.ObjectId,
		ref:'User'
	},
	task:[{task:{
			type: String
			
		}}]
})

const UserList = mongoose.model('UserList',userListSchema);

module.exports = UserList;