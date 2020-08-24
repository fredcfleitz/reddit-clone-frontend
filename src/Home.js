import React, {Component} from 'react';
import Post from './Post'
import logo from './logo.svg';
import './App.css';
import {
  Media, Collapse, Button, CardBody, Card, Nav, NavItem, NavLink
} from 'reactstrap';


class Home extends Component {
  state= {
    isLoading:true,
    posts:[]
  };

  async componentDidMount() {
    const response = await fetch('https://reddit-mock2.herokuapp.com/api/posts');
    const body = await response.json();
    this.setState({posts:body, isLoading:false});
  }

  render() {
    const {posts, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
      {posts.map(post =>
          <Post post = {post} />
      )}
      </div>


    );
}
}

export default Home;
