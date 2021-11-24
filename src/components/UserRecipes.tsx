import React, { Component } from "react";

type Props = {
    userId: number | undefined,
    token: string,
    updateLocalStorage: (newToken: string) => void
}

type State = {
    recipes: RecipeType[]
}

type RecipeType = {
    id: string,
    name: string,
    ingredients: string,
    notes: string
}


export default class RecipesByUser extends Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            recipes: [],
        }
    }

fetchRecipesByUser(userId: string) {
    fetch(`http://localhost:3000/mine/${userId}`, {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.props.token}` //put token here
        }) 
    })
    .then(response => response.json())
    .then(response =>{
        this.setState({
            recipes: response
        })
        console.log(response)
    })
}

renderUserRecipeList() {
    return this.state.recipes.map((recipe: RecipeType, index: number) => {
        const { id, name, ingredients, notes } = recipe
        return (
            <div>
            <tr key={id}>
                <td>{name}</td>
                <td>{ingredients}</td>
                <td>{notes}</td>
            </tr>
            </div>
        )
    })
}
render(){
    return(
        <div>
            {this.renderUserRecipeList}
        </div>
    )
}
}

