import React, { Component } from 'react';
import {Button, TextField} from "@material-ui/core";
import APIURL from '../helpers/environment'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import UpdateTwoToneIcon from '@mui/icons-material/UpdateTwoTone';
import {Card, Typography} from '@material-ui/core'


type Props = {
    token: string,
    userId: number | undefined,
    updateLocalStorage: (newToken: string) => void,
    recipeId: number,
    recipes: CocktailType[],
    id: number
}

type States = {
    name: string,
    ingredients: string,
    notes: string,
    recipes: CocktailType[] | never[]
}

type CocktailType = {
    name: string,
    ingredients: string,
    notes: string,
    userId: number | undefined,
    id: number
}

class CocktailListByUserId extends Component<Props, States> {
    constructor(props: Props) {
        super(props)

        this.state={
            name: '',
            ingredients: '',
            notes: '',
            recipes: []
        }
    }

    getCocktailsByUserId(){
        // e.preventDefault()
        fetch(`${APIURL}/recipes/mine`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}` //put token here
            }) 
        })
        .then(response => response.json())
        .then(data=>{
            console.log("data: ", data)
            this.setState({
                recipes: data
            })
        })
    }

    deleteUserRecipes(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number){
        e.preventDefault()
        fetch(`${APIURL}/recipes/delete/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}` //put token here
            }) 
            }) 
        .then(response => response.json())
        .then(data => this.getCocktailsByUserId())
        .catch(err => console.log(err))
    }

    updateUserRecipes(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number){
        e.preventDefault()
        fetch(`${APIURL}/recipes/update/${id}`, { //CHANGE & ADD BUTTON OR FORM
            method: 'PUT',
            body: JSON.stringify({recipe: {name: this.state.name, ingredients: this.state.ingredients, notes: this.state.notes}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`, //put token here
            }) 
        })
        .then(response => response.json())
        .then(data => this.getCocktailsByUserId())
        .then(response =>{
            console.log(response)
            this.setState({
                name: '',
                ingredients: '',
                notes: ''
            })
        })
        .catch(err => console.log(err))
    }


    componentDidMount(){
        this.getCocktailsByUserId()
    }

    
    renderCocktailListByUserId() {
        return this.state.recipes.map((cocktail: CocktailType, index: number) => {
            return (
                <Card key={index}>
                    <Typography variant="h5" component="div">
                    <td>{cocktail.name}</td>
                    <td>{cocktail.ingredients}</td>
                    <td>{cocktail.notes}</td>
                    </Typography>
                    <div>
                    </div>
                    <Button onClick={(e) => this.deleteUserRecipes(e, cocktail.id)} endIcon={<HighlightOffIcon />}>Delete</Button>
                    <TextField id="outlined-basic" variant="outlined"
                    helperText="Cocktail name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({name: e.target.value})}
                    />
                    <TextField id="outlined-basic" variant="outlined"
                    helperText="Ingredients"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ingredients: e.target.value})}
                    />
                    <TextField id="outlined-basic" variant="outlined"
                    helperText="Notes"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({notes: e.target.value})}
                    />
                    <Button onClick={(e) => this.updateUserRecipes(e, cocktail.id)} endIcon={<UpdateTwoToneIcon />}>Update</Button>
                </Card>
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