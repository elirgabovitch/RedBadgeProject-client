import React, { Component } from 'react';

type Props = {
    token: string
}

type State = {
    comments: []
}

class CommentsList extends Component<Props, State>{

    constructor(props: Props) {
        super(props)

        this.state = {
            comments: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/comments')
        .then(response => response.json())
        .then(response =>{
            this.setState({
                comments: response.data
            })
            console.log(response.data)
        })
    }

    renderCommentsList() {
        return this.state.comments.map((comments, index) => {
            const { id, comment } = comments
            return (
                <tr key={id}>
                    <td>{comment}</td>
                </tr>
            )
        })
    }


    render() {
        return (
            <div>
                <h1 id='tableTitle'>Cocktails</h1>
                <table id='cocktails'>
                    <tbody>
                        {this.renderCommentsList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CommentsList;