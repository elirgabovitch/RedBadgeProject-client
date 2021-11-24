import React from 'react';
import DisplayRecipes from './DisplayRecipes';
import RecipeForm from './RecipeForm';
import DisplayComments from './DisplayComments';
import CommentForm from './CommentForm';
// import ProfilePage from '../components/ProfilePage'

type Props = {
    token: string,
    userId: number | undefined,
    updateLocalStorage: (newToken: string) => void,
    clearToken: () => void,
    recipeId: string,
    fetchComments: (newToken: string) => void,
}

function Splash(props: Props) {
    return (
        <div>
            <DisplayRecipes token={props.token} updateLocalStorage={props.updateLocalStorage} />
            <RecipeForm token={props.token} />
            <DisplayComments token={props.token} recipeId={props.recipeId}/>
            <CommentForm fetchComments={props.fetchComments} token={props.token} recipeId={props.recipeId}/>
            {/* <ProfilePage token={props.token} userId={props.userId} /> */}
        </div>
    )
  }

  export default Splash;

