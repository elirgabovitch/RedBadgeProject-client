import React, { Component } from 'react';
import APIURL from '../helpers/environment';
import {Card, Typography} from '@material-ui/core'

type Props = {
    token: string,
    recipeId: number,
}

type CommentType = {
    comment: string,
    recipeId: number
}

class CommentList extends Component<Props, {comments: CommentType[]}> {
    constructor(props: Props) {
        super(props)

        this.state={comments: []}
    }

    getComments(){
        // e.preventDefault()
        fetch(`${APIURL}/comments/${this.props.recipeId}`, {
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

    componentDidMount(){
        this.getComments()
    }

    
    renderCommentList() {
        return this.state.comments.map((comment: CommentType, index: number) => {
            // const { id } = comment
            if (comment.recipeId === this.props.recipeId){
            return (
                <Card key={index}>
                     <Typography variant="h6" component="div">
                    <p>{comment.comment}</p>
                    </Typography>
                </Card>
            )}
            else {
                return null
            }
        })
    }



    render() {
        return (
            <div>
                <h4 id='tableTitle'>Comments</h4>
                <table id='comments'>
                    <tbody>
                        {this.renderCommentList()}
                    </tbody>
                </table>
            </div>
        )
    }
 }

export default CommentList;