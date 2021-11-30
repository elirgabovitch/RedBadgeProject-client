import React, { Component } from 'react';
import UserComments from './UserComments';
import UserRecipes from './UserRecipes';

type Props = {
    userId: number | undefined,
    token: string,
    updateLocalStorage: (newToken: string) => void,
    clearToken: () => void,
    recipes: any,
    recipeId: number,
    id: number,
    comments: []
}

class ProfilePage extends Component<Props, {}>{
    
render() {
  return (
    <div className="ProfilePage">
      <UserRecipes userId={this.props.userId} token={this.props.token} updateLocalStorage={this.props.updateLocalStorage} recipeId={this.props.recipeId} recipes={this.props.recipes} id={this.props.id}/>
      <UserComments userId={this.props.userId} token={this.props.token} updateLocalStorage={this.props.updateLocalStorage} recipeId={this.props.recipeId} id={this.props.id} comments={this.props.comments}/>
    </div>
  );
}
}


export default ProfilePage;