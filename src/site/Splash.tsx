import React from 'react';
import RecipeForm from './RecipeForm';
import Liquorlab from '../assets/liquorlab.png'

type Props = {
    token: string,
    userId: number | undefined,
    updateLocalStorage: (newToken: string) => void,
    clearToken: () => void,
    recipeId: number,
}

function Splash(props: Props) {
    console.log(props)
    return (
        <div>
            <img src={Liquorlab} alt="liquorlab"></img>
            <RecipeForm token={props.token} updateLocalStorage={props.updateLocalStorage}/>
        </div>
    )
  }

  export default Splash;

