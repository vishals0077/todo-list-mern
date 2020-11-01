import React from 'react';
import './SignUp.css';
import {NavLink} from 'react-router-dom';
import { css } from "@emotion/core";
import DotLoader from "react-spinners/SyncLoader";
const override = css`
  display: block;
  margin: 20px;
`;
class SignUp extends React.Component{
         constructor(){
           super();
           this.state={
              
               loading: false
           }
       }
     validateCredentials=()=>{
        if(!(document.getElementById('emailsignup').value.includes('.')) || !(document.getElementById('emailsignup').value.includes('@')))
        {
          alert('enter valid email');
          document.getElementById('emailsignup').value="";
          this.setState({loading:false})
        }   
        else if(document.getElementById('namesignup').value==='')
        {
          alert("enter a name");
          this.setState({loading:false})
        }
        else if(document.getElementById('passwordsignup').value==='')
        {
          alert("enter a password");
          this.setState({loading:false})
        }
    }
     clickSignup=()=>{
          this.setState({loading: true});
         this.validateCredentials();
         fetch("https://radiant-plains-32400.herokuapp.com/api/register",{
             method: 'post',
             headers:({'Content-Type': 'application/json'}),
             body: JSON.stringify({
                 email: document.getElementById("emailsignup").value,
                 password: document.getElementById("passwordsignup").value,
                 name: document.getElementById("namesignup").value

             })
         }).then(response=> response.json()).then(data=>{
             if(data.status===200)
             {
                var link= document.getElementById("navigatetosignin");
                link.click();
             }
             else if( data.status ===400)
             {
                 alert('email id already registered, please login to continue')
             }
             else
             {
                 console.log(data);
             }
             this.setState({loading:false})
         })
         
    }
	render()
	{
		return(
			<div id="signupform">
			<form>
                <h1>Sign Up</h1>

                <div className="form-group">
                    <label>Email address</label>
                    <input id="emailsignup" type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input id="passwordsignup" type="password" className="form-control" placeholder="Enter password" />
                </div>

                 <div className="form-group">
                    <label>Name</label>
                    <input id="namesignup"  type="name" className="form-control" placeholder="Enter name" />
                </div>
                <div className="lh-copy mt3">
                   <p className="btn btn-primary btn-block" onClick={this.clickSignup}>Sign Up</p>    
                 </div>
                <NavLink id="navigatetosignin" style={{display: 'none'}} to="/"></NavLink>
                 <div className="sweet-loading">
                  <DotLoader
                    css={override}
                    size={30}
                    color={"white"}
                    loading={this.state.loading}
                  />
                </div>
            </form>
            
			</div>
			)
	}
}

export default SignUp;