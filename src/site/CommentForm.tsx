import React, { Component } from "react"; 

        type CommentState ={
            comment: string;
        }

        type AcceptedProps = {
            token: string;
        }

class CommentForm extends Component<AcceptedProps, CommentState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            comment: '',
        }

    }

     handleSubmit = (e: any) => {
        e.preventDefault()
        fetch('http://localhost:3000/comments/create', {
            method: 'POST',
            body: JSON.stringify({comment: this.state }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token //put token here
            }) 
        })
        .then(res =>{
            if (res.status !== 200) {
                throw new Error('Error! Try again');
            } else return res.json();
        })
        .then((res) => res.json())
        .then((commentData) => {
            console.log(commentData);
            }
        )
        .catch(err => console.log(err))
}

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Name</label>
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