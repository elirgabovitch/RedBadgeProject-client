import React, { Component } from 'react';

type Props = {
    token: string,
    updateLocalStorage: (newToken: string) => void,
    recipes: CocktailType[]
}

type State = {
    recipes: CocktailType[];
}

type CocktailType = {
    recipeId: string,
    name: string,
    ingredients: string,
    notes: string
}

class CocktailList extends Component<Props, State> {

    renderCocktailList() {
        return this.props.recipes.map((cocktail: CocktailType, index: number) => {
            const { recipeId, name, ingredients, notes } = cocktail
            return (
                <div>
                <tr key={recipeId}>
                    <td>{name}</td>
                    <td>{ingredients}</td>
                    <td>{notes}</td>
                </tr>
                {/* <DisplayComments token={this.props.token} recipeId={id}/> */}
                </div>
            )
        })
    }


    render() {
        return (
            <div>
                <h1 id='tableTitle'>Cocktails</h1>
                <table id='cocktails'>
                    <tbody>
                        {this.renderCocktailList()}
                    </tbody>
                </table>
            </div>
        )
    }
 }

export default CocktailList;