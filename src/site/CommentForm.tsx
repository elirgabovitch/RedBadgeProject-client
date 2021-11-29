// import React, { Component } from "react"; 

//         type State ={
//             comment: string;
//         }

//         type Props = {
//             token: string,
//             recipeId: string,
//             fetchComments: (recipeId: string) => void
//         }

// class CommentForm extends Component<Props, State> {
//     constructor(props: Props) {
//         super(props)

//         this.state = {
//             comment: '',
//         }

//     }

//      handleSubmit = (e: any) => {
//         e.preventDefault()
//         console.log(`http://localhost:3000/comments/create/${this.props.recipeId}`)
//         fetch(`http://localhost:3000/comments/create/${this.props.recipeId}`, {
//             method: 'POST',
//             body: JSON.stringify({comment: {comment: this.state.comment }}),
//             headers: new Headers({
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${this.props.token}` //put token here
//             }) 
//         })
//         .then((res) => res.json())
//         .then((commentData) => {
//             console.log(commentData);
//             this.props.fetchComments(this.props.recipeId)
//             }
//         )
//         .catch(err => console.log(err))
// }

//     render() {
//         return (
//             <div>
//                 <form onSubmit={this.handleSubmit}>
//                     <div>
//                         <label>Comment</label>
//                         <input
//                         type='text'
//                         name='comment'
//                         value={this.state.comment}
//                         onChange={(e) => this.setState({comment: e.target.value})}
//                         ></input>
//                     </div>
//                     <div>
//                         <button type='submit'>Submit</button>
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }

// export default CommentForm;

import React, { Component } from "react";

type CommentState ={
    comment: string
}

type AcceptedProps = {
    token: string,
    recipeId: number
}


class CommentForm extends Component<AcceptedProps, CommentState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            comment: ''
        }

    }


     handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(this.props)
        fetch(`http://localhost:3000/comments/create/${this.props.recipeId}`, {
            method: 'POST',
            body: JSON.stringify({comment: {comment: this.state.comment}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}` //put token here
            }) 
        })
        .then(res =>{
             return res.json();
        })
        .then((commentData) => {
            console.log(commentData);
            })
        .catch(err => console.log(err))
}

componentDidMount(){
}

    render() {
        return (
            <div>
                <form>
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
                        <button type='submit' onClick={(e) => this.handleSubmit(e)}>Submit</button>
                    </div>
                </form>
                {/* <DisplayComments token={this.props.token} updateLocalStorage={this.props.updateLocalStorage} recipeId={this.props.recipeId} /> */}
            </div>
        )
    }
}


export default CommentForm;