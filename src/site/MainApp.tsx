import React, { Component } from 'react';
import Auth from './Auth';
import Navigation from './Navbar'

type State = {
    sessionToken: string | undefined,
    userId: number | undefined,
    userRole: string
  }
  
  export default class MainApp extends Component<{}, State> {
    constructor(props: {}) {
        super(props)
        this.state = {
            sessionToken: undefined,
            userId: undefined,
            userRole: ''
        }
        this.updateToken = this.updateToken.bind(this);
        this.setUser = this.setUser.bind(this);
        this.clearToken = this.clearToken.bind(this);
    }
  
    updateToken(newToken: string) {
        localStorage.setItem('token', newToken);
        this.setState({ sessionToken: newToken })
    }
  
    setUser(userRole: string, userId: number) {
        localStorage.setItem('userRole', userRole)
        this.setState({ userRole: userRole, userId: userId })
    }
  
    clearToken() {
        localStorage.clear();
        this.setState({ sessionToken: undefined })
    }

    viewConductor = () => {
        return this.state.sessionToken !== undefined ? <Navigation userId={this.state.userId} token={this.state.sessionToken} /> : <Auth updateToken={this.updateToken} setUser={this.setUser} />;
    };

    render() {
    return (
      <div>
          {this.viewConductor()}
      </div>
    )
  }
  };