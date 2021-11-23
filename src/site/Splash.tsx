import React from 'react';
import DisplayRecipes from './DisplayRecipes'
import RecipeForm from './RecipeForm'
import CommentForm from './CommentForm'
import DisplayComments from './DisplayComments';

type Props = {
    token: string
}

function Splash(props: Props) {
    return (
        <div>
            <DisplayRecipes token={props.token}/>
            <RecipeForm token={props.token}/>
            <CommentForm token={props.token}/>
            <DisplayComments token={props.token}/>
        </div>
    )
  }

  export default Splash;

