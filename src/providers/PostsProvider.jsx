import React, { Component, createContext } from 'react';
import { collectIDsAndDocs } from '../utilities';
import { firestore } from '../firebase';

export const PostsContext = createContext();

class PostProvider extends Component {
  state = { posts: [] };

  componentDidMount = () => {
    this.unsubscribeFromFireStore = firestore
      .collection('posts')
      .onSnapshot(snapshot => {
        const posts = snapshot.docs.map(collectIDsAndDocs);
        this.setState({ posts });
      });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFireStore();
  };

  render() {
    const { posts } = this.state;
    const { children } = this.props;
    return (
      <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
    );
  }
}

export default PostProvider;
