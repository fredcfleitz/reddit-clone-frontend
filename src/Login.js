import React, { useState, Component } from 'react';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form,
FormGroup, Label, Input, FormText } from 'reactstrap';
import Cookies from 'js-cookie'
import { encode } from "base-64";
import API_URL from './config';

class Login extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
      incorrect: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  closeButtonClickHandler = () => {
    this.props.callbackModal();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const id = target.id;

    this.setState({
      [id]: value
    });
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
        body: JSON.stringify({ 'userName':this.state.username, 'password': this.state.password})
     };
    await fetch(API_URL +'/login', requestOptions)
        .then(response => res = response)
        .then(data => res = data)
        .catch((error) => {console.error(error);});
    console.log(res)
    if(res){
      this.setState({incorrect: false});
      console.log(res)
    } else {
      this.setState({incorrect: true});
        console.log(this.state.incorrect)
    }
  }

  render(){
    console.log(this.props.showLogin)

  return (
    <div>
      <Modal isOpen={this.props.showLogin}>
        <Form onSubmit={this.handleSubmit}>
        <ModalHeader>Login</ModalHeader>
        <ModalBody>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input type="username"
                id="username"
                value={this.state.username}
                placeholder="username"
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password"
                id="password"
                value={this.state.password}
                placeholder="password"
                onChange={this.handleInputChange}
              />
            </FormGroup>
            {this.state.incorrect == false ? "" : <Alert color="danger">Incorrect username or password</Alert>}

        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">Login</Button>{' '}
          <Button color="secondary" onClick={this.closeButtonClickHandler}>Cancel</Button>
        </ModalFooter>
      </Form>
      </Modal>
    </div>
  );
}
}

export default Login;
