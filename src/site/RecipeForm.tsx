import React, { Component } from "react";
import DisplayRecipes from './DisplayRecipes'

        type RecipeState ={
            name: string;
            ingredients: string,
            notes: string,
            recipes: CocktailType[]
        }

        type AcceptedProps = {
            token: string,
            updateLocalStorage: any,
        }

        type CocktailType = {
            id: number,
            name: string,
            ingredients: string,
            notes: string,
        }

class RecipeForm extends Component<AcceptedProps, RecipeState> {
    constructor(props: AcceptedProps) {
        super(props)

        this.state = {
            name: '',
            ingredients: '',
            notes: '',
            recipes: []
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
            this.getRecipes()
            })
        .catch(err => console.log(err))
}

getRecipes(){
    // e.preventDefault()
    fetch('http://localhost:3000/recipes')
    .then(response => response.json())
    .then(response =>{
        console.log(response)
        this.setState({
            recipes: response
        })
    })
    .catch(err => console.log(err))
}

componentDidMount(){
    this.getRecipes()
}

    render() {
        return (
            <div>
                <form>
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
                        <button type='submit' onClick={(e) => this.handleSubmit(e)}>Submit</button>
                    </div>
                </form>
                <DisplayRecipes token={this.props.token} updateLocalStorage={this.props.updateLocalStorage} recipes={this.state.recipes} />
            </div>
        )
    }
}


export default RecipeForm;