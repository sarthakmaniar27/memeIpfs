import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
// import { Navigate } from 'react-router-dom';

class Login extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      password: ''
    };
   }
  onSubmit = async (event) => {
        // const navigate = useNavigate();
        event.preventDefault()
        const {uid, password } = event.target.elements
        // console.log({uid: uid.value, password: password.value })
        await this.setState({uid: uid.value, password:password.value})
        console.log({uid: this.state.uid, password: this.state.password })
        const res=await axios.get("http://127.0.0.1:8000/login/",{
          params:{
            uid:this.state.uid,
            password:this.state.password
          }
        })
        
        if(res.data.res=="Valid"){
            console.log("Validated")
            // return <Navigate to='/welcome'/>
            // navigate.push('/welcome')
            // this.props.history.push('/welcome')
            window.location.href = 'http://localhost:3000/welcome'        }
            console.log(res)
  }
  render() {
    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                 <h2> Change Meme </h2>
                <form onSubmit={this.onSubmit}>
                  UID: <input type='text' name="uid" id="uid"/>
                  Password: <input type='text' name="password" id="password"/>
                  <input type='submit' />
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
 
export default Login;