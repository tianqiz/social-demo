import React, { Component } from "react";
import { Link,Redirect } from "react-router-dom";
import {signin ,authenticate } from '../auth';
import SocialLogin from "./SocialLogin";


class Signin extends Component{

    state = {
   
        email: '',
        password:'',
        error:'',
        redirectToReferer: false,
        loading: false
      }

    handleChange = type => e =>{
        this.setState({ error: "" });
        this.setState({ [type]: e.target.value });
    }

    // authenticate = (token, next) =>{
    //     if(typeof window !== 'undefined'){
    //         localStorage.setItem("jwt", JSON.stringify(token))
    //         next();
    //     }
    // }

    clickSubmit = e => {
        e.preventDefault();
        this.setState({loading: true})
        const {  email, password } = this.state;
        const user = {
            email,
            password
        };
        signin(user)
            .then(data => {
                if (data.error){
                    this.setState({ error: data.error,loading: false });
                } else {
                    //authenticate
                    //redirect to somewhere
                    authenticate(data, ()=>{
                        this.setState({redirectToReferer:true})
                    })
                }
            });


    };

    // signin = (user) => {
    //     return fetch('http://localhost:5000/signin', {
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

    signinForm = (  email, password) => (
            <form >
 
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
        const {  email, password, error, redirectToReferer, loading  } = this.state;

        if(redirectToReferer){
            return <Redirect to='/' />
        }
        return (
            <div className='container'>
                
                <h2 className='my-5'>Sign in</h2>
                <hr />
                    <SocialLogin />
                <hr />
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )}

                {this.signinForm(  email, password)}
                <p >
                <Link to="/forgot-password" className="btn btn-raised btn-danger">
                    {" "}
                    Forgot Password
                </Link>
             </p>   
            </div>
        )
    }
}

export default Signin