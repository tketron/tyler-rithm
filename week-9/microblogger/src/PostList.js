import React, { Component } from 'react';
import EditablePost from './EditablePost';
import EditPostForm from './EditPostForm';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from './actionCreators';
import CommentList from './CommentList';
class PostList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const result = this.props.posts.map(a => (
      <div key={a.id}>
        <EditablePost id={a.id} title={a.title} body={a.body} />
        <button onClick={() => this.props.deletePost(a.id)}> Delete</button>
        <h1>Comments Here</h1>
        <div>
          <CommentList comments={a.comments} post_id={a.id} />
        </div>
      </div>
    ));

    return <div>{result}</div>;
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(
  mapStateToProps,
  { fetchPosts, deletePost }
)(PostList);
