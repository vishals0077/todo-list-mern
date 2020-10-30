import React from 'react';
import './App.css';
import * as THREE from 'three';
import BIRDS from 'vanta/dist/vanta.birds.min';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import SignUp from '../components/SignUp/SignUp';
import SignIn from '../components/SignIn/SignIn';
import Dashboard from '../components/Dashboard/Dashboard';
class App extends React.Component{
  constructor() {
    super()
    this.State={
      route:'home'
    }
    this.vantaRef = React.createRef()
  }
 componentDidMount() {
    this.vantaEffect = BIRDS({
      el: this.vantaRef.current,
      THREE: THREE // use a custom THREE when initializing
    })
   
  }
  
 componentWillUnmount() {
    if (this.vantaEffect) this.vantaEffect.destroy()
  }


 render(){
  
   return(
     <BrowserRouter>
     <div className="App">
    <Switch>
    <Route path="/" component={NavigationBar} exact/>
    </Switch>
    <Switch>
    
    <Route path="/" component={SignIn} exact/>
    <Route path="/signup" component={SignUp} />
    <Route path="/dashboard" component={Dashboard} />
    </Switch>
    <div ref={this.vantaRef}   style={{
                width: '100%',
                position: 'fixed',
                top:0,
                bottom:0,
                left:0,
                right:0,
                zIndex:-1

              }}>
      
    </div>
     </div>
     </BrowserRouter>
     );
 }

}


export default App;
