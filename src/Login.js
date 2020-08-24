import React, { useState, Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form,
FormGroup, Label, Input, FormText } from 'reactstrap';
import Cookies from 'js-cookie'
import { encode } from "base-64";

class Login extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
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
        method: 'GET',
        headers: { 'Authorization': 'Basic ' + encode(this.state.username + ":" + this.state.password)}
    };
    await fetch('/api/users/', requestOptions)
        .then(response => response.json())
        .then(json => res = json)
        .catch((error) => {console.error(error);});
        if(res.status != "500"){
          Cookies.set('username',this.state.username)
          window.location.reload();
        }
  }

  render(){
    console.log(this.props.showLogin)

  return (
    <div>
      <Modal isOpen={this.props.showLogin}>
        <Form onSubmit={this.handleSubmit}>
        <ModalHeader>{this.props.showLogin}</ModalHeader>
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
