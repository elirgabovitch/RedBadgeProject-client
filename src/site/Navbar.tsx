import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import { Button, Navbar, NavItem, } from 'reactstrap';
// import Auth from './Auth';
import Splash from './Splash';
import ProfilePage from '../components/ProfilePage';
import React from 'react';
// import AppInfo from './AppInfo'


class Navigation extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            sessionToken: localStorage.getItem("token"),
            user: JSON.parse(localStorage.getItem('user')!)
        }
    }
    render() {
        return (
            <Router>
            <>
                <Navbar>
                        <div>
                            <nav>
                                <ul>
                                    <NavItem>
                                        <li>
                                            <Link to='/'></Link>
                                        </li>
                                    </NavItem>
                                    <NavItem>
                                        <li>
                                            <Link to='/Cocktails'>Cocktails</Link>
                                        </li>
                                    </NavItem>
                                    <NavItem>
                                        <li>
                                            <Link to='/ProfilePage'>Profile Page</Link>
                                        </li>
                                    </NavItem>
                                    <NavItem>
                                        <li>
                                            {/* <Link to='/Admin'>Admin</Link> */}
                                        </li>
                                    </NavItem>
                                    <NavItem>
                                        <li>
                                            <Button onClick={() => this.props.clearToken()}>Logout</Button>
                                            {/* Button not working */}
                                        </li>
                                    </NavItem>
                                </ul>
                            </nav>
                        </div>
                </Navbar>
                            <Routes>
                                <Route path='/' element={<Splash token={this.props.token} updateLocalStorage={this.props.updateToken} clearToken={this.props.clearToken} userId={this.props.userId} recipeId={this.props.recipeId} fetchComments={this.props.fetchComments} />} >
                                </Route>
                                <Route path='/Cocktails' element={<Splash token={this.props.sessionToken} updateLocalStorage={this.props.updateToken} clearToken={this.props.clearToken} userId={this.props.userId} recipeId={this.props.recipeId} fetchComments={this.props.fetchComments} />} >
                                </Route>
                                <Route path='/ProfilePage' element={<ProfilePage token={this.props.sessionToken} updateLocalStorage={this.props.updateToken} clearToken={this.props.clearToken} userId={this.props.userId} />} >
                                </Route>
                                {/* <Route path='/Admin'>
                            <Admin sessionToken={this.state.sessionToken} userId={this.state.user.id}/>
                        </Route> */}
                            </Routes>
            </>
            </Router>
        );
    }
};

export default Navigation