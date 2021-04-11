import React, { useState, Component }from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';
import Cookies from 'js-cookie'
import Login from './Login'
import Newsubreddit from './Newsubreddit'
//import API_URL from './config';
var API_URL = process.env.API_URL

class Navbartop extends Component {

  constructor(props){
    super(props)
    this.state= {
      isOpen: false,
      username: (Cookies.get('remember_token') ?
      Cookies.get('remember_token').split("|")[0] : null),
      showLogin: false,
      showSubreddit: false,
      subreddits: []
    }
    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.subreddit = this.subreddit.bind(this);
  }

  async componentDidMount() {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        withCredentials: true,
       };
    const response = await fetch(API_URL + '/subreddits');
    const body = await response.json();
    console.log(body)
    this.setState({subreddits:body, isLoading:false});
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  login(){
    this.setState({
      showLogin: true
    })
  }

  subreddit(){
    this.setState({
      showSubreddit: true
    })
  }

  async logout() {
    const requestOptions = {
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
    const response = await fetch(API_URL + "/logout", requestOptions);
    window.location.reload();
  }

  callbackModal = () => {
   this.setState({ showLogin: false });
   this.setState({ showSubreddit: false });
  }

  render(){

    const {subreddits, isLoading} = this.state;

    const prefix = "/r/"

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Reddit Clone</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Front</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">All</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Sort
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <div style={{'border-left': '2px solid grey'}} />
                  {subreddits.map(subreddit =>
                    <NavItem>
                      <NavLink href={prefix + subreddit.title}>{subreddit.title}</NavLink>
                    </NavItem>
                  )}
            </Nav>
            {this.state.username ? (
              <div>
              <Button color="success" href="/newpost">New Post</Button>
              &nbsp;
              <Button color="info" onClick={this.subreddit}>Create Subreddit</Button>
              &nbsp;
              &nbsp;
              &nbsp;
              <UncontrolledDropdown style={{display: 'inline'}}>
                <DropdownToggle caret>
                  {this.state.username}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem><Button color="danger" onClick={this.logout}>Sign Out</Button></DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              &nbsp;
              </div>
            ) :
              <div>
              <Button color="primary" href="/signup">Sign Up</Button>
              &nbsp;
              <Button color="secondary" onClick={this.login} >Login</Button>
              </div>
            }
          </Collapse>
        </Navbar>
        <Login showLogin={this.state.showLogin} callbackModal={this.callbackModal} />
        <Newsubreddit showSubreddit={this.state.showSubreddit}  callbackModal={this.callbackModal} />
      </div>
    );
  }
}

export default Navbartop;
