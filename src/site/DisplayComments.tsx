import React, { Component } from 'react';
import APIURL from '../helpers/environment'

type Props = {
    token: string,
    recipeId: number,
    // comments: CommentType[]
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
                <div key={index}>
                    <p>{comment.comment}</p>
                </div>
            )}
            else {
                return null
            }
        })
    }



    render() {
        return (
            <div>
                <h1 id='tableTitle'>Comments</h1>
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