import React, { Component } from "react";

type Props = {
    userId: any,
    token: string,
    updateLocalStorage: (newToken: string) => void
}

type State = {
    comments: CommentType[]
}

type CommentType = {
    id: string,
    comment: string
}


export default class CommentsByUser extends Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            comments: [],
        }
    }
    
fetchCommentsByUser(userId: any) {
    fetch(`http://localhost:3000/comments/${userId}`, {
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
        console.log(response)
    })

}

renderUserCommentList() {
    return this.state.comments.map((comments: CommentType, index: number) => {
        const { id, comment } = comments
        return (
            <div>
            <tr key={id}>
                <td>{comment}</td>
            </tr>
            </div>
        )
    })
}

render(){
    return(
        <div>
            {this.fetchCommentsByUser}
            {this.renderUserCommentList}
        </div>
    )
}
}


