import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import APIURL from '../helpers/environment'

type Authentication = {
    email: string,
    password: string,
    login: boolean,
    userId: number | undefined,
    userRole: string
}

type Props = {
    updateToken: (newToken: string) => void
    setUser: (userRole: string, userId: number ) => void
}

class Auth extends Component<Props, Authentication> {
    constructor(props: Props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            login: true,
            userId: undefined,
            userRole: 'user'
        }
        this.title = this.title.bind(this)
        this.loginToggle = this.loginToggle.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    title = () => {
        return !this.state.login ? "Signup" : "Login"

    }

    loginToggle = (e: any) => {
        e.preventDefault();
        this.setState({
            login: !this.state.login,
            email: '',
            password: ''
        })
    }

    handleSubmit = (e: any) => {
        e.preventDefault();

        let reqBody = this.state.login ?
            {
                user: {
                    email: this.state.email,
                    password: this.state.password,
                },
            } : {
                user: {
                    email: this.state.email,
                    password: this.state.password,
                    role: this.state.userRole
                },
            };
        let url = this.state.login
            ? `${APIURL}/users/login`
            : `${APIURL}/users/register`;
        console.log(reqBody);

        fetch(url, {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    userRole: data.role,
                    email: data.email,
                    password: data.password
                });
                this.props.updateToken(data.sessionToken);
            })
            .catch(err => console.log(err))
    };
    render() {
        return (
            <div>
                {this.state.login ?
                    (
                        <div>
                            <Form>
                                <h1>{this.title()}</h1>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input onChange={(e) => this.setState({ email: e.target.value })} type="text" id="email" value={this.state.email}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input onChange={(e) => this.setState({ password: e.target.value })} type="password" id="password" value={this.state.password}></Input>
                                </FormGroup>
                                <Button type="submit" onClick={this.handleSubmit} className="btn-lg btn-dark btn-block">Submit</Button>
                                <p onClick={this.loginToggle} style={{ cursor: "pointer" }}><b><u>New User? Click here to create an account.</u></b></p>
                            </Form>
                        </div>
                    ) : (
                        <Form className="login-form">
                            <h1>{this.title()}</h1>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input onChange={(e) => this.setState({ email: e.target.value })} type="email" id="email" value={this.state.email}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input onChange={(e) => this.setState({ password: e.target.value })} type="password" id="password" value={this.state.password}></Input>
                            </FormGroup>

                            <Button type="submit" onClick={this.handleSubmit} className="btn-lg btn-dark btn-block">Submit</Button>
                            <p onClick={this.loginToggle} style={{ cursor: "pointer" }}><b><u>Already have an account? Sign in!</u></b></p>
                        </Form>
                    )}
            </div>
        )
    }
}
export default Auth