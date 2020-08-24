import React, {Component} from 'react';
import {
  Media, Collapse, Button, CardBody, Card, Nav, NavItem, NavLink, UncontrolledCollapse, Form, FormGroup, Input
} from 'reactstrap';

import logo from './logo.svg';
import './App.css';
import Cookies from 'js-cookie';

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
    const url = '/api/comments/' + postId;
    const response = await fetch(url);
    const body = await response.json();
    this.setState({comments:body, isLoading:false});
  }

  async handleSubmit(event) {
    event.preventDefault();
    var res;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({content:this.state.content, parent:this.props.comment.id, user:Cookies.get('username')})
    };
    await fetch('/api/comments/', requestOptions)
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
    return (
      <Media key={this.props.comment.id}>
        <Media left href="#">
          <Media align="left" width="7%" object src={logo} alt="Generic placeholder image" />
        </Media>
        <Media body>
          <h5>
            {this.props.comment.user}
          </h5>
          {this.props.comment.content}
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
