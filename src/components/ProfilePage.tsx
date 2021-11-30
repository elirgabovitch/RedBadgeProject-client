import React, { Component } from 'react';
import UserComments from './UserComments';
import UserRecipes from './UserRecipes';

type Props = {
    userId: number | undefined,
    token: string,
    updateLocalStorage: (newToken: string) => void,
    clearToken: () => void,
    recipes: any,
    recipeId: number
}

class ProfilePage extends Component<Props, {}>{
    // constructor(props: Props) {
    //     super(props)

    // }
render() {
  return (
    <div className="ProfilePage">
      <UserRecipes userId={this.props.userId} token={this.props.token} updateLocalStorage={this.props.updateLocalStorage} recipeId={this.props.recipeId} recipes={this.props.recipes} />
      <UserComments userId={this.props.userId} token={this.props.token} updateLocalStorage={this.props.updateLocalStorage} recipeId={this.props.recipeId}/>
    </div>
  );
}
}


export default ProfilePage;