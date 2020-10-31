import React from 'react';
import './Dashboard.css';
import {NavLink} from 'react-router-dom';

class Dashboard extends React.Component{
	constructor(){
		super();
		this.state={
			todos:[]
		}
	}
	
	gettask(){
			fetch("https://radiant-plains-32400.herokuapp.com/api/gettask",{
			method: 'post',
			headers: ({'Content-Type': 'application/json'}),
			body:JSON.stringify({
				user_Id: this.props.location.aboutProps.userid
			})
		}).then(response=> response.json()).then(tasks=>{
			if(tasks.status===200)
			{
				var taskArray =[];
				
				for(var n=0;n< tasks.data.task.length;n++)
				{				
					taskArray.push(tasks.data.task[n].task);
				}	
				this.setState({todos: taskArray});

			}
			else
			{
				console.log(tasks)
			}					
		})
	}
		addingTask=()=>
	{
	
		fetch("https://radiant-plains-32400.herokuapp.com/api/addtask",{
			method: 'post',
			headers: ({'Content-Type':'application/json'}),
			body:JSON.stringify({
				user_Id: this.props.location.aboutProps.userid,
				task: document.getElementById("taskfield").value
			})
		}).then(response=> response.json()).then(tasks=>{
			if(tasks.status===200)
			{

				var taskArray =[];
				
				for(var n=0;n< tasks.data.task.length;n++)
				{				
					taskArray.push(tasks.data.task[n].task);
				}	
				this.setState({todos: taskArray});
			}
			else
			{
				console.log(tasks)
			}

		})
	}
		deleteTask = (event)=>{
		
		
			fetch("https://radiant-plains-32400.herokuapp.com/api/deletetask",{
			method:'put',
			headers: ({'Content-Type':'application/json'}),
			body: JSON.stringify({
				user_Id: this.props.location.aboutProps.userid,
				indexvalue: event.target.id
			})
		}).then(response=>response.json()).then(tasks=>{
			if(tasks.status===200)
			{
				var taskArray =[];
				
				for(var n=0;n< tasks.data.task.length;n++)
				{				
					taskArray.push(tasks.data.task[n].task);
				}	
				this.setState({todos: taskArray});
					
				
			}
			else
			{
				console.log(tasks)
			}
		})
		
		
	}
	componentDidMount(){
			this.gettask()
		
	}
	
	 render(){
		
		
		 return(
			<div id="dashboard">
			<nav>
               
               <div className="logo">
                  To Do List
               </div>
               <div className="menu">
                  <ul>
                     <NavLink to="/"><li>Logout</li></NavLink>
                                                     
                  </ul>
               </div>
            </nav>
            <div id="taskwindow" >
            <div className="input-group">
	<input id="taskfield" type="text" className="form-control" placeholder="enter task here">
	</input>
	
	<div className="input-group-addon hover-cursor"onClick={this.addingTask}>
		<i className="fa fa-plus-circle fa-1x" ></i>
	</div>

	</div>

	<div >
		<ul id="tasklist" className="list-group">
			{this.state.todos.map((todo, index) => <li className = "list-group-item" key={index}>{todo}
				<span className="hover-cursor text-danger pull-right">
					<i id={index} className = "fa fa-trash-o" onClick = {this.deleteTask}></i>
				</span>
				</li>)}
		</ul>
	</div>            
         </div>
 


         </div>

			);
	}
}

export default Dashboard;