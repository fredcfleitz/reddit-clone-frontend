import React, {Component} from 'react';
import Post from './Post'
import logo from './logo.svg';
import './App.css';
import {
  Media, Collapse, Button, CardBody, Card, Nav, NavItem, NavLink
} from 'reactstrap';
import API_URL from './config';

class Subreddit extends Component {
  state= {
    isLoading:true,
    posts:[]
  };

  async componentDidMount() {
    const subreddit = this.props.match.params.subreddit;
    const url = API_URL + '/r/' + subreddit
    const response = await fetch(url);
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

export default Subreddit;
