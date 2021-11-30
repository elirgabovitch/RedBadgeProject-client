// import React, { Component } from 'react';


// type Props = {
//     token: string,
//     userId: number | undefined,
//     updateLocalStorage: (newToken: string) => void,
//     recipes: CocktailType[]
// }

// // type State = {
// //     recipes: CocktailType[];
// // }

// type CocktailType = {
//     // recipeId: number
//     name: string,
//     ingredients: string,
//     notes: string
// }

// class CocktailListById extends Component<Props, {}> {

//     renderCocktailListById() {
//         return this.props.recipes.map((cocktail: CocktailType, index: number) => {
//             const { name, ingredients, notes } = cocktail
//             return (
//                 <div>
//                 <tr key={index}>
//                     <td>{name}</td>
//                     <td>{ingredients}</td>
//                     <td>{notes}</td>
//                 </tr>
//                 </div>
//             )
//         })
//     }


//     render() {
//         return (
//             <div>
//                 <h1 id='tableTitle'>Cocktails</h1>
//                 <table id='cocktails'>
//                     <tbody>
//                         {this.renderCocktailListById()}
//                     </tbody>
//                 </table>
//             </div>
//         )
//     }
//  }

// export default CocktailListById;

import React, { Component } from 'react';

type Props = {
    token: string,
    userId: number | undefined,
    updateLocalStorage: (newToken: string) => void,
    recipeId: number,
    recipes: CocktailType[]
}

type States = {
    recipes: CocktailType[]
}

type CocktailType = {
    name: string,
    ingredients: string,
    notes: string,
    userId: number | undefined
}

class CocktailListByUserId extends Component<Props, States> {
    constructor(props: Props) {
        super(props)

        this.state={recipes: []}
    }

    getCocktailsByUserId(){
        // e.preventDefault()
        console.log("inside get cocktails by uid", this.props.token)
        fetch('http://localhost:3000/recipes/mine', {
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
                recipes: response
            })
        })
    }

    componentDidMount(){
        this.getCocktailsByUserId()
    }

    
    renderCocktailListByUserId() {
        return this.state.recipes.map((cocktail: CocktailType, index: number) => {
            // const { id } = comment
            return (
                <tr key={index}>
                    <td>{cocktail.name}</td>
                    <td>{cocktail.ingredients}</td>
                    <td>{cocktail.notes}</td>
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
                        {this.renderCocktailListByUserId()}
                    </tbody>
                </table>
            </div>
        )
    }
 }

export default CocktailListByUserId;