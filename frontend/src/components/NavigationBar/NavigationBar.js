import React from 'react';
import './NavigationBar.css';
import { NavLink } from 'react-router-dom';

class NavigationBar extends React.Component{
	render()
	{
		return(
		<div >
		 <nav>
               
               <div className="logo">
                  To Do List
               </div>
               <div className="menu">
                  <ul>
                     
                     <NavLink to="/signup"><li>Sign Up</li></NavLink>                                     
                  </ul>
               </div>
            </nav>
		</div>
		);
	}
}


export default NavigationBar;