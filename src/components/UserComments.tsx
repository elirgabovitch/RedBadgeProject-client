import React, { Component } from 'react';
import {Button, TextField} from '@material-ui/core';
import APIURL from '../helpers/environment';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import UpdateTwoToneIcon from '@mui/icons-material/UpdateTwoTone';
import {Card, Typography} from '@material-ui/core'

type Props = {
    token: string,
    userId: number | undefined,
    updateLocalStorage: (newToken: string) => void,
    recipeId: number,
    id: number,
    comments: CommentType[]
}

type State = {
    comment: string
    comments: []
}

type CommentType = {
    userId: number | undefined,
    comment: string,
    id: number
}

class CommentListByUserId extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state={
            comment: '',
            comments: []
        }
    }

    getCommentsByUserId(){
        // e.preventDefault()
        fetch(`${APIURL}/comments/mine`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}` //put token here
            }) 
        })
        .then(response => response.json())
        .then(response =>{
            console.log(response)
            this.setState({
                comments: response
            })
        })
        .catch(err => console.log(err))
    }

    deleteUserComments(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number){
        e.preventDefault()
        fetch(`${APIURL}/comments/delete/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}` //put token here
            }) 
            }) 
        .then(response => response.json())
        .then(data => this.getCommentsByUserId())
        .catch(err => console.log(err))
    }

    updateUserComments(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number){
        e.preventDefault()
        fetch(`${APIURL}/comments/update/${id}`, { //CHANGE & ADD BUTTON OR FORM
            method: 'PUT',
            body: JSON.stringify({comment: {comment: this.state.comment}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`, //put token here
            }) 
        })
        .then(response => response.json())
        .then(data => 
            
            {
                console.log(data)
                this.getCommentsByUserId()})
        .catch((err) => console.log(err))
    };

    componentDidMount(){
        this.getCommentsByUserId()
    }

    
    renderCommentListByUserId() {
        return this.state.comments.map((comment: CommentType, index: number) => {
            console.log(comment)
            return (
                <Card key={index}>
                    <Typography variant="h6" component="div">
                    <td>{comment.comment}</td>
                    </Typography>
                    <Button onClick={(e) => this.deleteUserComments(e, comment.id)} endIcon={<HighlightOffIcon />}>Delete</Button>
                        <TextField id="outlined-basic" variant="outlined"
                        helperText="Comment"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({comment: e.target.value})}
                        />
                        <Button onClick={(e) => this.updateUserComments(e, comment.id)} endIcon={<UpdateTwoToneIcon />}>Update</Button>
                        <br></br>
                </Card>
            )}
        )}



    render() {
        return (
            <div>
                <h1 id='tableTitle'>Comments</h1>
                <table id='comments'>
                    <tbody>
                        {this.renderCommentListByUserId()}
                    </tbody>
                </table>
            </div>
        )
    }
 }

export default CommentListByUserId;
