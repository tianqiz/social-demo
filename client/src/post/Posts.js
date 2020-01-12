import React, { Component } from "react";
import { list,lists } from './apiPost'
import defaultPhoto from '../images/defaultLand.jpg'
import { Link } from 'react-router-dom'
class Posts extends Component {
    state = {
        posts:[],
        page: 1,
        randomPosts:[]
    }

    loadPosts = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    };

    componentDidMount() {
        lists().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ randomPosts: data });
            }
        });
        this.loadPosts(this.state.page);
    }

    loadMore = number => {
        this.setState({ page: this.state.page + number });
        this.loadPosts(this.state.page + number);
    };
 
    loadLess = number => {
        this.setState({ page: this.state.page - number });
        this.loadPosts(this.state.page - number);
    };

    refreshRecommendation = () =>{
        lists().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ randomPosts: data });
            }
        });
    }

    renderUsers = posts => {

        return (
        <div className="row">
            {posts.map((post, index)=>{
                const posterId = post.postedBy ? `/user/${post.postedBy._id}` : ""
                const posterName = post.postedBy ? post.postedBy.name : "Unknown"
                return ( 
                    <div className="card col-md-4"  key={index}>
                        <div className="card-body">
                            <img
                            src={`http://localhost:5000/post/photo/${post._id}`}
                            alt={post.title}
                            onError={i =>
                                (i.target.src = `${defaultPhoto}`)
                            }
                            className="img-thunbnail mb-3"
                            style={{ height: "200px", width: "100%" }}
                            />
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">
                                {post.body.substring(0, 100)+"..."}
                            </p>
                            <br />
                            <p className="font-italic mark">
                                Posted by{" "}
                                <Link to={`${posterId}`}>
                                    {posterName}{" "}
                                </Link>
                                on {new Date(post.created).toDateString()}
                            </p>
                            <Link to={`/post/${post._id}`}
                                className="btn btn-raised btn-primary btn-sm">
                                Read more
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
    mediaShow = posts => {
        return (
            <div className="container">
                {posts.map((post, index)=>{

                    return (
                        <div className="media mb-3 pb-3 border-bottom" key={index}>
                            <img className="align-self-start mr-3"                             
                            src={`http://localhost:5000/post/photo/${post._id}`}
                            alt={post.title}
                            onError={i =>
                                (i.target.src = `${defaultPhoto}`)
                            } 
                            style={{ height: "100px", width: "150px" }}
                            />
                            <div className="media-body">
                                
                                <h5 className="mt-0 mb-1">
                                    {post.title}
                                </h5>
                                <p>
                                    {post.body.substring(0, 150)+"..."}
                                </p>
                                <Link to={`/post/${post._id}`}
                                className="btn btn-raised btn-primary btn-sm">
                                    Read more
                                </Link> 
                            </div>
                            
                        </div>
                       
                    )

                })}

            </div>

        )
    }
    randomShow = posts =>{
        return (
            <div>
                {posts.map((post,index)=>{
                    return (
                        <p key={index} className="m-0">
                        <Link to={`/post/${post._id}`} 
                                >
                                    {post.title}
                                </Link>                         
                        </p>

                    )
                })}
            </div>
        )
    }


    render() {
        const {posts,page,randomPosts} = this.state
        return (
            <div className="mx-5">
                <div className="row justify-content-between">
                    <div className="col-12 col-md-8">
                            <h2 className="mt-5 mb-5">
                                {!posts.length ? "End of lists": "Recent posts"}
                            </h2>
                            
                            {this.mediaShow(posts)}
                            {page > 1 ? (
                                <button
                                    className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
                                    onClick={() => this.loadLess(1)}
                                >
                                    Previous ( Page: {this.state.page - 1} )
                                </button>
                            ) : (
                                ""
                            )}
                            {posts.length ? (
                                <button
                                    className="btn btn-raised btn-success mt-5 mb-5"
                                    onClick={() => this.loadMore(1)}
                                >
                                    Next ( Page: {page + 1} )
                                </button>
                            ) : (
                                ""
                            )}
                    </div>  
                    <div className="d-none d-md-block col-md-3 mt-5 mb-5 border-left">
                        Random recommendation
                        <i className="fa fa-refresh m-2" aria-hidden="true" onClick={this.refreshRecommendation}></i>                        
                        {this.randomShow(randomPosts)}
                    </div>                  
                </div>
            </div>

        );
    }
}

export default Posts;