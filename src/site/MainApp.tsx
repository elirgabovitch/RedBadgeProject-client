import React, { Component } from 'react';
import Auth from './Auth';
import Splash from './Splash';

type State = {
    sessionToken: string | undefined,
    user: {},
  }
  
  export default class MainApp extends Component<{}, State> {
    constructor(props: {}) {
        super(props)
        this.state = {
            sessionToken: undefined,
            user: {},
        }
        this.updateToken = this.updateToken.bind(this);
        this.setUser = this.setUser.bind(this);
        this.clearToken = this.clearToken.bind(this);
    }
  
    updateToken(newToken: string) {
        localStorage.setItem('token', newToken);
        this.setState({ sessionToken: newToken })
    }
  
    setUser(userRole: string) {
        localStorage.setItem('userRole', userRole)
        this.setState({ user: userRole })
    }
  
    clearToken() {
        localStorage.clear();
        this.setState({ sessionToken: undefined })
    }
    render() {
    return (
      <div>
          {this.state.sessionToken === undefined || null ? <Auth updateToken={this.updateToken} setUser={this.setUser} /> : <Splash token={this.state.sessionToken} /> }
      </div>
    )
  }
  };