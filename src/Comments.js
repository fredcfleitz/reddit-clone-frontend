import React, {Component} from 'react';
import Comment from "./Comment";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Post from "./Post";
import Content from "./Content";

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
    const postId = this.props.match.params.postId;
    const url = '/api/comments/' + postId;
    const response = await fetch(url);
    const body = await response.json();
    const post_url = '/api/posts/' + postId;
    const post_response = await fetch(post_url);
    const post_body = await post_response.json()
    this.setState({comments:body, post:post_body, isLoading:false});
  }

  async handleSubmit(event) {
    event.preventDefault();
    var res;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({content:this.state.content, parent:this.props.match.params.postId})
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
        {comments.map(comment =>
            <Comment comment = {comment} />
        )}
        </div>


      );
  }
}

export default Comments
