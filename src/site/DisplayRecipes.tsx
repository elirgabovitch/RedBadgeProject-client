import React, { Component } from 'react';

type Props = {
    token: string
}

type State = {
    recipes: []
}

class CocktailList extends Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            recipes: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/recipes')
        .then(response => response.json())
        .then(response =>{
            this.setState({
                recipes: response.data
            })
            console.log(response.data)
        })
    }

    renderCocktailList() {
        return this.state.recipes.map((cocktail, index) => {
            const { id, name, ingredients, notes } = cocktail
            return (
                <tr key={id}>
                    <td>{name}</td>
                    <td>{ingredients}</td>
                    <td>{notes}</td>
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
                        {this.renderCocktailList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CocktailList;