import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import { Button, Navbar, NavItem, } from 'reactstrap';
import Splash from './Splash';
import ProfilePage from '../components/ProfilePage';
import React from 'react';


class Navigation extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            sessionToken: localStorage.getItem("token"),
            user: JSON.parse(localStorage.getItem('user')!)
        }
    }
    render() {
        console.log(this.props)
        return (
            <Router>
            <>
                <Navbar>
                        <div>
                            <nav>
                                
                                    {/* <NavItem>
                                        
                                            <Link to='/'></Link>
                                        
                                    </NavItem> */}
                                    <NavItem>
                                        
                                            <Link to='/Cocktails'>Cocktails</Link>
                                        
                                    </NavItem>
                                    <NavItem>
                                        
                                            <Link to='/ProfilePage'>Profile Page</Link>
                                        
                                    </NavItem>
                                    {/* <NavItem>
                                        
                                            <Link to='/Admin'>Admin</Link>
                                        
                                    </NavItem> */}
                                    <NavItem>
                                        
                                            <Button onClick={() => this.props.clearToken()}>Logout</Button>
                                            {/* {Button not working} */}
                                        
                                    </NavItem>
                                
                            </nav>
                        </div>
                </Navbar>
                            <Routes>
                                <Route path='/' element={<Splash token={this.props.token} updateLocalStorage={this.props.updateToken} clearToken={this.props.clearToken} userId={this.props.userId} recipeId={this.props.recipeId}  />} >
                                </Route>
                                <Route path='/Cocktails' element={<Splash token={this.state.sessionToken} updateLocalStorage={this.props.updateToken} clearToken={this.props.clearToken} userId={this.props.userId} recipeId={this.props.recipeId}  />} >
                                </Route>
                                <Route path='/ProfilePage' element={<ProfilePage token={this.state.sessionToken} updateLocalStorage={this.props.updateToken} clearToken={this.props.clearToken} userId={this.props.userId} recipes={this.props.recipes} recipeId={this.props.recipeId} id={this.props.id} comments={this.props.comments}/>} >
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