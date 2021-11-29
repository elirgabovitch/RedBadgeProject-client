import React, { Component } from 'react';
import DisplayComments from './DisplayComments';
import CommentForm from './CommentForm';


type Props = {
    token: string,
    updateLocalStorage: (newToken: string) => void,
    recipes: CocktailType[]
}

// type State = {
//     recipes: CocktailType[];
// }

type CocktailType = {
    id: number,
    name: string,
    ingredients: string,
    notes: string
}

class CocktailList extends Component<Props, {}> {

    renderCocktailList() {
        return this.props.recipes.map((cocktail: CocktailType, index: number) => {
            const { id, name, ingredients, notes } = cocktail
            return (
                <div>
                <tr key={index}>
                    <td>{name}</td>
                    <td>{ingredients}</td>
                    <td>{notes}</td>
                </tr>
                <DisplayComments token={this.props.token} recipeId={id}/>
                <CommentForm token={this.props.token} recipeId={id}/>
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