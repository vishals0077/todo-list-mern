const router = require('express').Router();
var UserController = require('./controllers/usercontroller');
var ListController = require('./controllers/listcontroller');
router.get('/',(req,res)=>
{
	res.json({
		message:'api connected',
		status: 'success'
	})
})
router.route('/register').post(UserController.signUp);
router.route('/signin').post(UserController.signIn);
router.route('/addtask').post(ListController.addTask);
router.route('/gettask').post(ListController.getTask);
router.route('/deletetask').put(ListController.deleteTask);
module.exports = router;