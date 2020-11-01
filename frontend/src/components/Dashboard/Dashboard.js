import React from 'react';
import './Dashboard.css';
import {NavLink} from 'react-router-dom';
import { css } from "@emotion/core";
import DotLoader from "react-spinners/SyncLoader";
const override = css`
  display: block;
  margin: 20px;
`;
class Dashboard extends React.Component{
	constructor(){
		super();
		this.state={
			todos:[],
			loading: false
		}
	}
	
	gettask(){
			this.setState({loading: true});
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
			this.setState({loading: false});					
		})
	}
		addingTask=()=>
	{
		this.setState({loading: true});
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
			this.setState({loading: false});
		})
	}
		deleteTask = (event)=>{
		
			this.setState({loading: true});
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
			this.setState({loading: false});
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
             <div className="sweet-loading">
                  <DotLoader
                    css={override}
                    size={30}
                    color={"white"}
                    loading={this.state.loading}
                  />
                </div>
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