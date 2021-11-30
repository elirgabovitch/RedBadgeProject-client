// import React, { Component } from 'react';

// type Props = {
//     token: string,
//     recipeId: number,
//     userId: number | undefined,
//     updateLocalStorage: (newToken: string) => void,
//     // comments: CommentType[]
// }

// type CommentType = {
//     userId: number | undefined,
//     comment: string,
//     recipeId: number
// }



// export default class CommentListById extends Component<Props, {comments: CommentType[]}> {
//     constructor(props: Props) {
//         super(props)

//         this.state={comments: []}
//     }

//     getCommentsById(){
//         // e.preventDefault()
//         fetch(`http://localhost:3000/comments/${this.props.userId}`, {
//             method: 'GET',
//             headers: new Headers({
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${this.props.token}` //put token here
//             }) 
//         })
//         .then(response => response.json())
//         .then(response =>{
//             console.log(response)
//             this.setState({
//                 comments: response
//             })
//         })
//     }

//     componentDidMount(){
//         this.getCommentsById()
//     }

    
//     renderCommentListByUserId() {
//         return this.state.comments.map((comment: CommentType, index: number) => {
//             // const { id } = comment
//             if (comment.userId === this.props.userId){
//             return (
//                 <div key={index}>
//                     <p>{comment.comment}</p>
//                 </div>
//             )}
//             else {
//                 return null
//             }
//         })
//     }



//     render() {
//         return (
//             <div>
//                 <h1 id='tableTitle'>Comments</h1>
//                 <table id='comments'>
//                     <tbody>
//                         {this.renderCommentListById()}
//                     </tbody>
//                 </table>
//             </div>
//         )
//     }
//  }

import React, { Component } from 'react';

type Props = {
    token: string,
    userId: number | undefined,
    updateLocalStorage: (newToken: string) => void,
    recipeId: number
    // comments: CommentType[]
}

type CommentType = {
    userId: number | undefined,
    comment: string,
}

class CommentListByUserId extends Component<Props, {comments: CommentType[]}> {
    constructor(props: Props) {
        super(props)

        this.state={comments: []}
    }

    getCommentsByUserId(){
        // e.preventDefault()
        fetch('http://localhost:3000/comments/mine', {
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
        this.getCommentsByUserId()
    }

    
    renderCommentListByUserId() {
        return this.state.comments.map((comment: CommentType, index: number) => {
            // const { id } = comment
            return (
                <tr key={index}>
                    <td>{comment.comment}</td>
                </tr>
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
