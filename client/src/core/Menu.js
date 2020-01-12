import React  from 'react';
import { Link, withRouter } from 'react-router-dom';
import {signout,isAuthenticated} from '../auth'
const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '#ff9900' };
    else return { color: '#ffffff' };
}



const Menu = ({history}) => {
    return (
        <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-light bg-primary">
        <Link className="nav-link" style={isActive(history, '/')} to='/' >  <i class="fa fa-gamepad mr-1" aria-hidden="true"></i>
        Home</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
        <li className="nav-item">
            <Link className="nav-link" style={isActive(history, '/users')} to='/users' >Users</Link>
        </li>
        <li className="nav-item">
                
        <Link 
            to={'/post/create'} 
            style={(isActive(history, `/post/create`))}
            className="nav-link">
            Create Post
        </Link>
    

    </li>  
        {!isAuthenticated() && 
         (  <React.Fragment>
                <li class="nav-item">
                    <Link className="nav-link" style={isActive(history, '/signup')} to='/signup'>Signup</Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link" style={isActive(history, '/signin')} to='/signin' >Signin</Link>
                </li>                    
            </React.Fragment> )
        }

        {isAuthenticated() && 
            (  <React.Fragment>

                <li class="nav-item">
                
                    <Link 
                        to={'/findpeople'} 
                        style={(isActive(history, `/findpeople`))}
                        className="nav-link">
                        Find people
                    </Link>
                
            
                </li>   

                <li class="nav-item">
                
                    <Link 
                        to={'/user/'+isAuthenticated().user._id} 
                        style={(isActive(history, `/user/${isAuthenticated().user._id}`))}
                        className="nav-link">
                        {`${isAuthenticated().user.name}'s profile`}
                    </Link>
                    
                
               </li>     
               <li class="nav-item">
                    <span className="nav-link" 
                        style={(isActive(history, '/logout'),{cursor: "pointer", color:'white'})} 
                        onClick={()=>signout(()=>history.push('/'))}>
                    Log out</span>
                </li>    
                    
               </React.Fragment> )
           }
        </ul>
        </div>
      </nav>
            
        </React.Fragment>
    )
}

export default withRouter(Menu)

//<ul class="nav nav-tabs bg-primary">
// <li class="nav-item">
// <Link className="nav-link" style={isActive(history, '/')} to='/' >Home</Link>
// </li>
// <li class="nav-item">
// <Link className="nav-link" style={isActive(history, '/users')} to='/users' >Users</Link>
// </li>
// <li class="nav-item">
    
// <Link 
// to={'/post/create'} 
// style={(isActive(history, `/post/create`))}
// className="nav-link">
// Create Post
// </Link>


// </li>  
// {!isAuthenticated() && 
// (  <React.Fragment>
//     <li classa="nav-item">
//         <Link className="nav-link" style={isActive(history, '/signup')} to='/signup'>Signup</Link>
//     </li>
//     <li class="nav-item">
//         <Link className="nav-link" style={isActive(history, '/signin')} to='/signin' >Signin</Link>
//     </li>                    
// </React.Fragment> )
// }

// {isAuthenticated() && 
// (  <React.Fragment>

//     <li class="nav-item">
    
//         <Link 
//             to={'/findpeople'} 
//             style={(isActive(history, `/findpeople`))}
//             className="nav-link">
//             Find people
//         </Link>
    

//     </li>   

//     <li class="nav-item">
    
//         <Link 
//             to={'/user/'+isAuthenticated().user._id} 
//             style={(isActive(history, `/user/${isAuthenticated().user._id}`))}
//             className="nav-link">
//             {`${isAuthenticated().user.name}'s profile`}
//         </Link>
        
    
//    </li>     
//    <li class="nav-item">
//         <span className="nav-link" 
//             style={(isActive(history, '/logout'),{cursor: "pointer", color:'white'})} 
//             onClick={()=>signout(()=>history.push('/'))}>
//         Log out</span>
//     </li>    
        
//    </React.Fragment> )
// }

// </ul>

