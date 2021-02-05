import React, {Component} from 'react';
import Comment from "./Comment";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Post from "./Post";
import Content from "./Content";
import API_URL from './config';

class Comments extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading:true,
      comments:[],
      content:""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }




  async componentDidMount() {
    console.log("test");
    const options = {
    mode: 'cors',
    credentials: 'include',
    withCredentials: true,}
    const postId = this.props.match.params.postId;
    const url = API_URL + '/comments/' + postId;
    console.log("test2");
    const response = await fetch(url, options);
    const body = await response.json();
    console.log("test3");
    const post_url = API_URL + '/posts/' + postId;
    console.log(post_url);
    const post_response = await fetch(post_url);
    const post_body = await post_response.json()
    console.log("log")
    console.log(body);
    console.log(this.state.comments);
    this.setState({comments:body, post:post_body, isLoading:false});

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
        body: JSON.stringify({content:this.state.content, parent:this.props.match.params.postId})
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

  render() {
      const {comments, isLoading} = this.state;

      if (isLoading) {
        return <p>Loading...</p>;
      }

      return (
        <div>
        <Content post = {this.state.post}/>
        <h2>Comments</h2>
        <hr/>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
          <Input type="textarea" name="new comment" id="content" value={this.state.content} onChange = {this.handleInputChange}/>
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
        <br/>
        {comments.map(comment =>
            <Comment comment = {comment} />
        )}
        </div>


      );
  }
}

export default Comments
