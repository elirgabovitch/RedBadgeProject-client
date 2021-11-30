import React from 'react';
import RecipeForm from './RecipeForm';

type Props = {
    token: string,
    userId: number | undefined,
    updateLocalStorage: (newToken: string) => void,
    clearToken: () => void,
    recipeId: string,
    fetchComments: (newToken: string) => void,
}

function Splash(props: Props) {
    console.log(props)
    return (
        <div>
            <RecipeForm token={props.token} updateLocalStorage={props.updateLocalStorage}/>
        </div>
    )
  }

  export default Splash;

