import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, TabContent, TabPane,
Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import Cookies from 'js-cookie';
import classnames from 'classnames';
import logo from './logo.svg';
import API_URL from './config';

class Newpost extends Component {

  constructor(props){
    super(props);
    this.state = {
      title: "",
      content: "",
      user: Cookies.get('remember_token').split("|")[0],
      subreddits: [],
      subreddit: null,
      activeTab: "1",
      file: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleImageSubmit= this.handleImageSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    var res;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title:this.state.title,
          content:this.state.content, user:this.state.user, subreddit:this.state.subreddit, score:'0'})
    };
    await fetch(API_URL + '/posts', requestOptions)
        .then(response => response.json())
        .then(json => res = json)
        .catch((error) => {console.error(error);});
        if(res.status != "500"){
          window.location.reload();
        }
  }

  async handleImageSubmit(event) {
    event.preventDefault();
    var res;
    const formData = new FormData();
    formData.append('data', document.getElementById('file').files[0]);
    formData.append('title', this.state.title);
    formData.append('user', this.state.user);
    formData.append('subreddit', this.state.subreddit);
    formData.append('score', '0');
    const requestOptions = {
        method: 'POST',
        body: formData
    };
    await fetch('/api/postz/', requestOptions)
        .then(response => response.json())
        .then(json => res = json)
        .catch((error) => {console.error(error);});
  }

  async componentDidMount() {
    const response = await fetch(API_URL + '/subreddits');
    const body = await response.json();
    console.log(body)
    this.setState({subreddits:body, subreddit:body[0].title});
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const id = target.id;

    this.setState({
      [id]: value
    });
  }

  toggle(int){
    this.setState({
      activeTab:int
    })
  }

  render(){
    const test = logo
    console.log(document.getElementById('file'))

    try{
      test = document.getElementById('file').files[0];
      console.log(test)
    }catch(error){
    }

    return(
      <div>
      <h1>New Post</h1><br/>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Link
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Text
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
              <Form onSubmit={this.handleImageSubmit}>
              <br/>
                <FormGroup>
                  <h3>Title</h3>
                  <img src={this.state.file} />
                  {this.state.file}
                  <Input type="title" name="title" id="title" value={this.state.title} onChange = {this.handleInputChange} />
                </FormGroup>

                  <FormGroup>
                    <Label for="exampleFile">Upload image or video</Label>
                    <Input type="file" name="file" id="file" value={this.state.file} onChange = {this.handleInputChange} accept="image/*,video/*"/>
                    <FormText color="muted">
                      This is some placeholder block-level help text for the above input.
                      It's a bit lighter and easily wraps to a new line.
                    </FormText>
                  </FormGroup>
                <FormGroup>
                <Label for="exampleSelect">Select Subreddit</Label>
                <Input type="select" name="select" id="subreddit" value={this.state.subreddit} onChange = {this.handleInputChange} >

                  {this.state.subreddits.map(subreddit =>
                    <option value={subreddit.title}>{subreddit.title}</option>
                  )}
                </Input>
              </FormGroup>
                <Button type="submit">Submit</Button>
              </Form>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
              <br/>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <h3>Title</h3>
                  <Input type="title" name="title" id="title" value={this.state.title} onChange = {this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <h5>Content</h5>
                  <Input type="textarea" name="text" id="content" value={this.state.content} onChange = {this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                <Label for="exampleSelect">Select Subreddit</Label>
                <Input type="select" name="select" id="subreddit" value={this.state.subreddit} onChange = {this.handleInputChange} >

                  {this.state.subreddits.map(subreddit =>
                    <option value={subreddit.title}>{subreddit.title}</option>
                  )}
                </Input>
              </FormGroup>
                <Button type="submit">Submit</Button>
              </Form>
              </Col>
              <Col sm="6">
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>


    )
  }

}

export default Newpost;
