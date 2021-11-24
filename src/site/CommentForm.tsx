import React, { Component } from "react"; 

        type State ={
            comment: string;
        }

        type Props = {
            token: string,
            recipeId: string,
            fetchComments: (recipeId: string) => void
        }

class CommentForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            comment: '',
        }

    }

     handleSubmit = (e: any) => {
        e.preventDefault()
        fetch(`http://localhost:3000/comments/create/${this.props.recipeId}`, {
            method: 'POST',
            body: JSON.stringify({comment: {comment: this.state.comment }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}` //put token here
            }) 
        })
        .then((res) => res.json())
        .then((commentData) => {
            console.log(commentData);
            this.props.fetchComments(this.props.recipeId)
            }
        )
        .catch(err => console.log(err))
}

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Comment</label>
                        <input
                        type='text'
                        name='comment'
                        value={this.state.comment}
                        onChange={(e) => this.setState({comment: e.target.value})}
                        ></input>
                    </div>
                    <div>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CommentForm;