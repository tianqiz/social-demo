import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import { read, update, updateUser } from './apiUser'
import { Redirect } from 'react-router-dom'
import defaultAvatar from '../images/avatar.jpg'

class EditProfile extends Component {
    state = {
        id:'',
        name:'',
        email:'',
        password:'',
        error:'',
        redirectToSignin:false,
        fileSize:0,
        loading:false,
        about:''
    }

    init = (userId) => {
        const token = isAuthenticated().token
        read(userId, token)
        .then(data=>{
            if(data.error){
                this.setState({redirectToSignin:true})
            } else {
                this.setState({
                    id:data._id, 
                    name:data.name,
                    email:data.email,
                    error:'',
                    about:data.about
                })
            }
        })
    };

    isValid = () => {
        const { name, email, password,fileSize } = this.state;

        if (name.length === 0) {
          this.setState({ error: "Name is required", loading: false });
          return false;
        }
        if (fileSize > 1000000) {
            this.setState({
              error: "File size should be less than 100kb",
              loading: false
            });
            return false;
          }
        // email@domain.com
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          this.setState({
            error: "A valid Email is required",
            loading: false
          });
          return false;
        }
        if (password.length >= 1 && password.length <= 5) {
          this.setState({
            error: "Password must be at least 6 characters long",
            loading: false
          });
          return false;
        }
        return true;
    };

    handleChange = type => e =>{
        this.setState({error:""})
        const value = type === "photo" ? e.target.files[0] : e.target.value; 
        const fileSize = type === "photo" ? e.target.files[0].size : 0;
        this.userData.set(type, value);
        this.setState({ [type]: value, fileSize })
    }

    clickSubmit = e => {
        e.preventDefault();
        this.setState({loading: true})
        if(this.isValid()){

            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;
            update(userId,token,this.userData)
                .then(data => {
                    if (data.error) this.setState({ error: data.error });
                    else{
                        updateUser(data, ()=>{
                            this.setState({
                                redirectToSignin:true
                            });                            
                        })

                    }})            
        }
    };

    signupForm = (name, email,password,about) => (
        <form >
            <div className='form-group'>
                <label className='text-muted'>Profile Photo</label>
                <input type='file' 
                    accept="image/*"
                    onChange={this.handleChange('photo')} 
                    className='form-control' /> 
            </div>
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
                <label className='text-muted'>About</label>
                <textarea type='text' 
                    onChange={this.handleChange('about')} 
                    className='form-control' 
                    value={about}/> 
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
                Update
            </button>                                     
        </form>
    )

    componentDidMount(){
        this.userData = new FormData()
        const userId = this.props.match.params.userId;
        this.init(userId)
    }

    render(){
        const { id, name, email, password, redirectToSignin, error,loading,about } = this.state
        if(redirectToSignin){
            return <Redirect to={`/user/${id}`} />
        }

        const photoUrl = id ?
                 `http://localhost:5000/user/photo/${id}` 
                 : 
                 defaultAvatar

        return (
            <div className="container">
                <h2 className='my-5'>Edit profile</h2>
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}>
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )}
                <img style={{height:'200px', width:'auto'}}
                     className='img-thumbnail'
                        src={photoUrl} 
                        onError={i=>(i.target.src=`${defaultAvatar}`)}
                        alt={name} />
                {this.signupForm(name, email,password,about)}

            </div>
        )
    }
}

export default EditProfile