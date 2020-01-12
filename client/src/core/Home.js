import React from "react";
import Posts from '../post/Posts'
const Home = () => (
  <div>
    <div className="jumbotron">
      <h2>Welcome</h2>
      <p className="lead">Enjoy yourself and discover new ideas here!</p>
    </div>
    <div className="m-0">
      <Posts />
    </div>
  </div>
);

export default Home;