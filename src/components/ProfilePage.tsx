import React, { Component } from 'react';
import UserComments from './UserComments';
import UserRecipes from './UserRecipes';

type Props = {
    userId: number | undefined,
    token: string,
    updateLocalStorage: (newToken: string) => void,
    clearToken: () => void
}

class ProfilePage extends Component<Props, {}>{
    // constructor(props: Props) {
    //     super(props)

    // }
render() {
  return (
    <div className="ProfilePage">
      <UserComments userId={this.props.userId} token={this.props.token} updateLocalStorage={this.props.updateLocalStorage}/>
      <UserRecipes userId={this.props.userId} token={this.props.token} updateLocalStorage={this.props.updateLocalStorage}/>
    </div>
  );
}
}


export default ProfilePage;