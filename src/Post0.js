import React, {Component} from 'react';
import {
  Media, Collapse, Button, CardBody, Card, Nav, NavItem, NavLink
} from 'reactstrap';

import logo from './logo.svg';
import './App.css';
import up from './Up.png'
import upvote from './Upvote.png'
import down from './Down.png'
import downvote from './Downvote.png'
import Cookies from 'js-cookie'

class Post extends Component {

  constructor(props){
    super(props);
    this.state = {
      upvoted:((Cookies.get(this.props.post.id+"upvoted") == 'true')),
      downvoted:((Cookies.get(this.props.post.id+"downvoted") == 'true')),
      offset: 0
    }
    this.state.offset = (this.state.upvoted ? -1 : 0) + (this.state.downvoted ? 1 : 0)
    console.log(this.state.upvoted)
    this.toggleUpvote = this.toggleUpvote.bind(this);
    this.toggleDownvote = this.toggleDownvote.bind(this);
  }

  toggleUpvote(event) {
    Cookies.set(this.props.post.id+"upvoted", !this.state.upvoted)
    Cookies.set(this.props.post.id+"downvoted", false)
    this.setState({
      upvoted: !this.state.upvoted,
      downvoted: false,
    })
    if (this.state.upvoted){
      const url = "https://reddit-mock2.herokuapp.com/api/posts/" + this.props.post.id + "/downvote";
      fetch(url, {method:'PUT'})
    } else {
      const url = "/api/posts/" + this.props.post.id + "/upvote";
      fetch(url, {method:'PUT'});
      if (this.state.downvoted){
        fetch(url, {method:'PUT'})
      }
    }
  }

  toggleDownvote(event) {
    Cookies.set(this.props.post.id+"upvoted", false)
    Cookies.set(this.props.post.id+"downvoted", !this.state.downvoted)
    this.setState({
      downvoted: !this.state.downvoted,
      upvoted: false,
    })
    if (!this.state.downvoted){
      const url = "https://reddit-mock2.herokuapp.com/api/posts/" + this.props.post.id + "/downvote";
      fetch(url, {method:'PUT'});
      if (this.state.upvoted){
        fetch(url, {method:'PUT'})
      }
    } else {
      const url = "https://reddit-mock2.herokuapp.com/api/posts/" + this.props.post.id + "/upvote";
      fetch(url, {method:'PUT'})
    }
  }

  render(){
    const imgsrc = "data:image/png;base64," + this.props.post.data
    const comments_link = "/r/" + this.props.post.subreddit + "/comments/" + this.props.post.id + "/";
    const score = parseInt(this.props.post.score)
    + (this.state.upvoted ? 1 : 0)
    - (this.state.downvoted ? 1 : 0)
    + this.state.offset;
    return (
      <Media key={this.props.post.id}>
      <ul style={{'list-style-type':'none', 'padding':0, 'margin':'auto'}}>
        <li><Media object
        src={this.state.upvoted ? upvote : up}
        onClick= {this.toggleUpvote}/>
        </li>
        <li style={{'text-align':'center'}}>{score}</li>
        <li><Media object
        src={this.state.downvoted ? downvote : down}
        onClick= {this.toggleDownvote}/>
        </li>

      </ul>
        <Media body>
            <Media align="left" width="90px" style={{marginLeft:'5px', marginRight:'5px','margin-top':'15px'}}  object src={imgsrc} alt="Generic placeholder image" />

          <h5>
            {this.props.post.title}
          </h5>
          Submitted by {this.props.post.username}
          <div>
            <Nav>
              <NavLink href={comments_link} style={{'padding-left':0}}>Comments</NavLink>
            </Nav>
          </div>
        </Media>
      </Media>
    )
  }



}

export default Post;
