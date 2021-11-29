// import React, { Component } from 'react';
// import CommentForm from './CommentForm'

// type Props = {
//     token: string,
//     recipeId: string
// }

// type State = {
//     comments: CommentType[]
// }

// type CommentType = {
//     recipeId: string,
//     comment: string
// }

// class CommentsList extends Component<Props, State>{

//     constructor(props: Props) {
//         super(props)

//         this.state = {
//             comments: []
//         }
//     }

//     fetchComments(recipeId: string) {
//         fetch(`http://localhost:3000/comments/${recipeId}`, {
//             headers: new Headers({
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${this.props.token}` //put token here
//             }) 
//         })
//         .then(response => response.json())
//         .then(response =>{
//             this.setState({
//                 comments: response
//             })
//             console.log(response)
//         })
//     }

//     componentDidMount(){
//         this.fetchComments(this.props.recipeId)
//     }

//     renderCommentsList() {
//         return this.state.comments.map((comments: CommentType, index: number) => {
//             const { recipeId, comment } = comments
//             return (
//                 <tr key={recipeId}>
//                     <td>{comment}</td>
//                 </tr>
//             )
//         })
//     }


//     render() {
//         return (
//             <div>
//                 <h1 id='tableTitle'>Cocktails</h1>
//                 <table id='cocktails'>
//                     <tbody>
//                         {this.renderCommentsList()}
//                     </tbody>
//                 </table>
//                 <CommentForm fetchComments={this.fetchComments} token={this.props.token} recipeId={this.props.recipeId}/>
//             </div>
//         )
//     }
// }

// export default CommentsList;

import React, { Component } from 'react';

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
        fetch(`http://localhost:3000/comments/${this.props.recipeId}`, {
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