import React, { Component, createContext } from 'react';
import { createUserProfileDocument, auth } from '../firebase';

export const UserContext = createContext();

class UserProvider extends Component {
  state = { user: null, loading: true };

  componentDidMount = () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            user: { uid: snapshot.id, ...snapshot.data() },
          });
        });
      }

      this.setState({ user: userAuth, loading: false });
    });
      this.setState({ loading: false });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  };

  render() {
    const { children } = this.props;
    return (
      <UserContext.Provider value={this.state}>{children}</UserContext.Provider>
    );
  }
}

export default UserProvider;
