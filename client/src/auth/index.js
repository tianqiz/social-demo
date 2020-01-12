
export const signup = (user) => {
    
    return fetch('http://localhost:5000/signup', {
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>{
        console.log(err)
    })
};

export const signin = (user) => {
    return fetch('http://localhost:5000/signin', {
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>{
        console.log(err)
    })
};

export const authenticate = (token, next) =>{
    if(typeof window !== 'undefined'){
        localStorage.setItem("jwt", JSON.stringify(token))
        next();
    }
};

export const signout = (next) =>{
    if(typeof window !== 'undefined') localStorage.removeItem('jwt')
    next()
    return fetch("http://localhost:5000/logout", {
        method: "GET"
    })
    .then(response =>{
        
        //console.log('logout', response)
        return response.json()
    })
    .catch(err=> console.log(err))
}

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }

    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};

export const forgotPassword = email => {
    console.log("email: ", email);
    return fetch(`http://localhost:5000/forgot-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};
 
export const resetPassword = resetInfo => {
    return fetch(`http://localhost:5000/reset-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const socialLogin = user => {
    return fetch(`http://localhost:5000/social-login/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        // credentials: "include", // works only in the same origin
        body: JSON.stringify(user)
    })
        .then(response => {
            console.log("signin response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};