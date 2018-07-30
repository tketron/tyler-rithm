import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost } from './actionCreators';

class TitleList extends Component {
  render() {
    return (
      <div>
        <h2>Titles</h2>
        <ul>
          {this.props.posts.map(p => {
            return (
              <li key={p.id}>
                {p.title}{' '}
                <button onClick={() => this.props.deletePost(p.id)}>
                  {' '}
                  Delete{' '}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(
  mapStateToProps,
  { deletePost }
)(TitleList);
