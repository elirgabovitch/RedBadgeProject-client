import React, { Component } from "react"; 

        type RecipeState ={
            name: string;
            ingredients: string;
            notes: string;
        }

        type AcceptedProps = {
            token: string,
        }

        // type CocktailType = {
        //     recipeId: string,
        //     name: string,
        //     ingredients: string,
        //     notes: string
        // }

class RecipeForm extends Component<AcceptedProps, RecipeState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            name: '',
            ingredients: '',
            notes: ''
        }

    }


     handleSubmit = (e: any) => {
        e.preventDefault()
        fetch('http://localhost:3000/recipes/create', {
            method: 'POST',
            body: JSON.stringify({recipe: {name: this.state.name, ingredients: this.state.ingredients, notes: this.state.notes }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}` //put token here
            }) 
        })
        .then(res =>{
             return res.json();
        })
        .then((cocktailData) => {
            console.log(cocktailData);
            })
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
                        name='name'
                        value={this.state.name}
                        onChange={(e) => this.setState({name: e.target.value})}
                        ></input>
                    </div>
                    <div>
                        <label>Ingredients</label>
                        <input
                        type='text'
                        name='ingredients'
                        value={this.state.ingredients}
                        onChange={(e) => this.setState({ingredients: e.target.value})}
                        ></input>
                    </div>
                    <div>
                        <label>Notes</label>
                        <input
                        type='text'
                        name='notes'
                        value={this.state.notes}
                        onChange={(e) => this.setState({notes: e.target.value})}
                        ></input>
                    </div>
                    <div>
                        <button type='submit' >Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default RecipeForm;