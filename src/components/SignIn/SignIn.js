import React from 'react';
import './SignIn.css';
import { NavLink } from 'react-router-dom';

class SignIn extends React.Component{
       constructor(){
           super();
           this.state={
               user_Id:''
           }
       }
      clickSignin=()=>{
           
          fetch("https://radiant-plains-32400.herokuapp.com/api/signin",{
            method: 'post',
            headers: ({'Content-Type':'application/json'}),
            body:JSON.stringify({
                email: document.getElementById("emailsignin").value,
                password: document.getElementById("passwordsignin").value
            })
        }).then(response=> response.json()).then(data=>
        {
           
            if(data.status===200)
            {
                this.setState({user_Id:data.data[0]._id})
                var link= document.getElementById("navigate");
                link.click();
            }
            else if(data.status===300)
            {
                alert('invalid credentials, please try again');
            }
            else if(data.status===400)
            {
                alert('not a registered email id, please signup to  continue');
            }
            else
            {
                console.log(data)
            }
        })
        
        
       
    }
	render()
	{
		return(
			<div id="signinform">
			 <form>
                <h1>Sign In</h1>

                <div className="form-group">
                    <label>Email address</label>
                    <input id="emailsignin" type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input id="passwordsignin" type="password" className="form-control" placeholder="Enter password" />
                </div>                 
                 <div className="lh-copy mt3">
                   <p className="btn btn-primary btn-block" onClick={this.clickSignin}>Sign in</p>    
                 </div>
                <NavLink id="navigate" style={{display: 'none'}} to={{pathname:'/dashboard', aboutProps:{userid:this.state.user_Id}}}></NavLink>
               
            </form>
			</div>
			)
	}
}

export default SignIn;
