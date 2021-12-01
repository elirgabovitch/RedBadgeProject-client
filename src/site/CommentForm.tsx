import React, { Component } from "react";
import APIURL from '../helpers/environment'
import {Button} from '@material-ui/core'
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';

type CommentState ={
    comment: string
}

type AcceptedProps = {
    token: string,
    recipeId: number,
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
        fetch(`${APIURL}/comments/create/${this.props.recipeId}`, {
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
                    <br/>
                    <div>
                        <Button type='submit' onClick={(e) => this.handleSubmit(e)} variant="contained" endIcon={<SendTwoToneIcon />}>Submit</Button>
                    </div>
                </form>
            </div>
        )
    }
}


export default CommentForm;