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
import API_URL from './config';

class Post extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: (Cookies.get('remember_token') ?
      Cookies.get('remember_token').split("|")[0] : null),
      vote:0,
      score: this.props.post.score,
    }
    this.state.offset = (this.state.upvoted ? -1 : 0) + (this.state.downvoted ? 1 : 0)
    console.log(this.state.upvoted)
    this.toggleUpvote = this.toggleUpvote.bind(this);
    this.toggleDownvote = this.toggleDownvote.bind(this);
  }

  async toggleUpvote(event) {
    const url = API_URL + "/posts/" + this.props.post.id + "/upvote";
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName:this.state.user})
    };
    var res;
    await fetch(url, requestOptions)
        .then(response => response.json())
        .then(json => res = json)
        .catch((error) => {console.error(error);});
        console.log(res);
        if(res.status != "500"){
          this.setState({score:res.score, vote:res.vote})
      }
  }

  async componentDidMount() {
    if (this.props.post.upvoters){
      if (this.props.post.upvoters.includes(this.state.user)){
        this.setState({vote:1})
      }
    }
    if (this.props.post.downvoters){
      if (this.props.post.downvoters.includes(this.state.user)){
        this.setState({vote:-1})
      }
    }
  }

  async toggleDownvote(event) {
    const url = API_URL + "/posts/" + this.props.post.id + "/downvote";
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName:this.state.user})
    };
    var res;
    await fetch(url, requestOptions)
        .then(response => response.json())
        .then(json => res = json)
        .catch((error) => {console.error(error);});
        console.log(res);
        if(res.status != "500"){
          this.setState({score:res.score, vote:res.vote})
      }
  }

  render(){
    const imgsrc = "data:image/png;base64," + this.props.post.data
    const comments_link = "/r/" + this.props.post.subreddit + "/comments/" + this.props.post.id + "/";
    const created_at = new Date(this.props.post.created_at)
    const score = parseInt(this.props.post.score)
    + (this.state.upvoted ? 1 : 0)
    - (this.state.downvoted ? 1 : 0)
    + this.state.offset;
    return (
      <Media key={this.props.post.id}>
      <ul style={{'list-style-type':'none', 'padding':0, 'margin':'auto'}}>
        <li><Media object
        src={this.state.vote == 1 ? upvote : up}
        onClick= {this.toggleUpvote}/>
        </li>
        <li style={{'text-align':'center'}}>{this.state.score}</li>
        <li><Media object
        src={this.state.vote == -1 ? downvote : down}
        onClick= {this.toggleDownvote}/>
        </li>

      </ul>
        <Media body>
            <Media align="left" width="90px" style={{marginLeft:'5px', marginRight:'5px','margin-top':'15px'}}  object src={imgsrc} alt="Generic placeholder image" />

          <h5>
            {this.props.post.title}
          </h5>
          Submitted {created_at.getTime()} by {this.props.post.username}
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
