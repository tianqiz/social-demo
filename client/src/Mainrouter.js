import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './core/Home';
import Signup from './user/Signup'
import Signin from './user/Signin'
import Menu from './core/Menu'
import Profile from './user/Profile'
import Users from './user/Users'
import EditProfile from './user/EditProfile'
import PrivateRoute from './auth/Privateroute'
import FindPeople from './user/FindProple'
import NewPost from './post/NewPost'
import SinglePost from './post/SinglePost'
import EditPost from './post/EditPost'
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";

const MainRouter = () => {

    return (
        <div>
            <Menu />
            <Switch>
                
                <Route path="/" exact component={Home} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route
                    exact
                    path="/reset-password/:resetPasswordToken"
                    component={ResetPassword}
                    />
                <Route path="/users" exact component={Users} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                
                <PrivateRoute path="/findpeople" exact component={FindPeople} />
                <PrivateRoute path="/user/edit/:userId" exact component={EditProfile} />
                <PrivateRoute path="/post/create" exact component={NewPost} />
                <Route path="/post/:postId" exact component={SinglePost} />
                <PrivateRoute path="/post/edit/:postId" exact component={EditPost} />
                <PrivateRoute path="/user/:userId" exact component={Profile} />
            </Switch>
        </div>
    )
}

export default MainRouter