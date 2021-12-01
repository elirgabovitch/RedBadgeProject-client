import React, { Component } from 'react';
import DisplayComments from './DisplayComments';
import CommentForm from './CommentForm';
import {Card, Typography} from '@material-ui/core'


type Props = {
    token: string,
    updateLocalStorage: (newToken: string) => void,
    recipes: CocktailType[]
}

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
                <Card key={index}>
                <Typography variant="h5" component="div">
                    <p>{name}</p>
                    <p>{ingredients}</p>
                    <p>{notes}</p>
                </Typography>
                <DisplayComments token={this.props.token} recipeId={id}/>
                <CommentForm token={this.props.token} recipeId={id} />
                </Card>
                </div>
            )
        })
    }


    render() {
        return (
            <div>
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