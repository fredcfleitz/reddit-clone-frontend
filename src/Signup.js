import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import API_URL from './config';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const id = target.id;
    console.log(process.env)

    this.setState({
      [id]: value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    var res;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName:this.state.username,
          password:this.state.password, roles:"USER" })
    };
    await fetch(API_URL + '/users', requestOptions)
        .then(response => response.json())
        .then(json => res = json)
        .catch((error) => {console.error(error);});
        console.log(res);
        if(res.status != "500"){
          //Cookies.set('username',this.state.username)
          this.setRedirect();
          window.location.reload();
        }
  }

  render(){
    return (
      <Form  onSubmit={this.handleSubmit} style={{marginLeft: '15px'}}>
        {this.renderRedirect()}
        <h1>Sign up to post stuff and vote on content!</h1>
        <br/>
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
        <br/>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default Signup;
