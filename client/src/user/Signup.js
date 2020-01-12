import React, { Component } from "react";
import {signup} from '../auth'
import {Link} from 'react-router-dom'
// import axios from 'axios'
class Signup extends Component{

    state = {
        name: '',
        email: '',
        password:'',
        error:'',
        open:false
    }

    handleChange = type => e =>{
        this.setState({ error: "" });
        this.setState({ [type]: e.target.value });
    }

    clickSubmit = e => {
        e.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password
        };
        signup(user)
            .then(data => {
                if (data.error) this.setState({ error: data.error });
                else{
                    this.setState({
                        error: "",
                        name: "",
                        email: "",
                        password: "",
                        open:true
                    });
                }})

    };

    // signup = (user) => {
    //     return fetch('http://localhost:5000/signup', {
    //         method: "POST",
    //         headers:{
    //             Accept: "application/json",
    //             "Content-type": "application/json"
    //         },
    //         body: JSON.stringify(user)
    //     })
    //     .then(res=>{
    //         return res.json();
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // }

    signupForm = (name, email, password) => (
            <form >
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input type='text' 
                    onChange={this.handleChange('name')} 
                    className='form-control' 
                    value={name}/> 
            </div>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input type='email' 
                    onChange={this.handleChange('email')} 
                    className='form-control'
                    value={email} /> 
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input type='password' 
                    onChange={this.handleChange('password')} 
                    className='form-control' 
                    value={password}/> 
            </div>    
            <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-primary">
            Submit
        </button>                                     
        </form>
    )

    render(){
        const { name, email, password, error, open } = this.state;
        return (
            <div className='container'>
                <h2 className='my-5'>Signup</h2>
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>
                <div
                    className="alert alert-info"
                    style={{ display: open ? "" : "none" }}
                >
                    Signup sucessfully, please {<Link to='/signin'>Sign in</Link>}
                </div>
                {this.signupForm(name, email, password)}
            
            </div>
        )
    }
}

export default Signup