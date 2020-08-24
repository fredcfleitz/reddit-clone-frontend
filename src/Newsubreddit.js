import React, { useState, Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form,
FormGroup, Label, Input, FormText } from 'reactstrap';
import Cookies from 'js-cookie'
import { encode } from "base-64";

class Newsubreddit extends Component {

  constructor(props){
    super(props)
    this.state = {
      title: "",
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title:this.state.title})
    };
    await fetch('/api/subreddits/', requestOptions)
        .then(response => response.json())
        .then(json => res = json)
        .catch((error) => {console.error(error);});
        if(res.status != "500"){
          window.location.reload();
        }
  }

  render(){
    console.log(this.props.showSubreddit)

  return (
    <div>
      <Modal isOpen={this.props.showSubreddit}>
        <Form onSubmit={this.handleSubmit}>
        <ModalHeader>{this.props.showSubreddit}</ModalHeader>
        <ModalBody>
            <FormGroup>
              <Label for="title">Subreddit Name:</Label>
              <Input type="title"
                id="title"
                value={this.state.title}
                placeholder="title"
                onChange={this.handleInputChange}
              />
            </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">New Subreddit</Button>{' '}
          <Button color="secondary" onClick={this.closeButtonClickHandler}>Cancel</Button>
        </ModalFooter>
      </Form>
      </Modal>
    </div>
  );
}
}

export default Newsubreddit;
