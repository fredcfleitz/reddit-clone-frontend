import React, {Component} from 'react';
import {
  Media, Collapse, Button, CardBody, Card, Nav, NavItem, NavLink, UncontrolledCollapse, Form, FormGroup, Input
} from 'reactstrap';

import logo from './logo.svg';
import './App.css';
import Cookies from 'js-cookie';
import API_URL from './config';

import up from './Up.png'
import upvote from './Upvote.png'
import down from './Down.png'
import downvote from './Downvote.png'

class Comment extends Component {

  constructor(props){
    super(props);
    this.state= {
      isOpen: false,
      isLoading:true,
      comments:[],
      content:""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  async componentDidMount() {
    const postId = this.props.comment.id;
    const url = API_URL + '/comments/' + postId;
    const response = await fetch(url);
    const body = await response.json();
    this.setState({comments:body, isLoading:false});
  }

  async handleSubmit(event) {
    event.preventDefault();
    var res;
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({content:this.state.content, parent:this.props.comment.id, user:Cookies.get('username')})
    };
    await fetch(API_URL + '/comments', requestOptions)
        .then(response => response.json())
        .then(json => res = json)
        .catch((error) => {console.error(error);});
        if(res.status != "500"){
          window.location.reload();
        }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const id = target.id;

    this.setState({
      [id]: value
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }


  render(){
    const {comments, isLoading} = this.state;
    const score = parseInt(this.props.comment.score)
    return (
      <Media key={this.props.comment.id}>
        <ul style={{'list-style-type':'none', 'padding':0}}>
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
        <Media left href="#">
          <Media align="left" width="7%" object src={logo} alt="Generic placeholder image" />
        </Media>
        <Media body>
        <div style={{marginLeft: '15px'}}>
          <h5>
            {this.props.comment.username}
          </h5>
          {this.props.comment.content}
        </div>
          <div>
            <Nav>
              <NavLink href="#" onClick={this.toggle}>Reply</NavLink>
            </Nav>
            <Collapse isOpen={this.state.isOpen}>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                <Input type="textarea" name="new comment" id="content" value={this.state.content} onChange = {this.handleInputChange}/>
                </FormGroup>
                <Button type="submit">Submit</Button>
              </Form>
            </Collapse>
          </div>
            <div style={{marginLeft: '15px'}}>
            {comments.map(comment =>
                <Comment comment = {comment} />
            )}
            </div>
        </Media>
      </Media>
    )
  }



}

export default Comment;
