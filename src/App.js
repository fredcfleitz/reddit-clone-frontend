import React, {Component} from 'react';
import Post from './Post';
import Home from './Home';
import Comments from './Comments';
import Navbartop from './Navbartop';
import Signup from './Signup';
import Newpost from './Newpost';
import logo from './logo.svg';
import './App.css';
import {
  Media, Collapse, Button, CardBody, Card, Nav, NavItem, NavLink
} from 'reactstrap';
import { Link, Route, Switch } from "react-router-dom";
import Cookies from 'js-cookie'
import { instanceOf } from 'prop-types';
import Login from './Login';
import Subreddit from './Subreddit';

class App extends Component {


  render() {
    return(
      <div style={{marginLeft: '15px', marginRight: '15px'}}>
      <Route path="/" component={Navbartop}/>
      <br/>
      <Route exact={true} path="/" component={Home} />
      <Route path="/comments/:postId" component={Comments} />
      <Route path="/signup" component={Signup} />
      <Route path="/newpost" component={Newpost} />
      <Route path="/r/:subreddit/comments/:postId/" component={Comments} />
      <Route exact={true} path="/r/:subreddit/" component={Subreddit} />
      </div>
    );
  }
}

export default App;
