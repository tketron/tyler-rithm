import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from './Comment';
import { addComment } from './actionCreators';

class CommentList extends Component {
  state = {
    text: ''
  };

  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addComment({
      post_id: this.props.post_id,
      text: this.state.text
    });
    this.setState({
      text: ''
    });
  };

  render() {
    const result = this.props.comments.map(a => (
      <li>
        <Comment key={a.id} id={a.id} text={a.text} />
      </li>
    ));
    return (
      <div>
        <ul>{result}</ul>
        <div>
          <form>
            <label for="text">Comment: </label>
            <input
              type="text"
              name="comment"
              value={this.state.text}
              onChange={this.handleChange}
            />
            <button type="submit" onClick={this.handleSubmit}>
              Comment
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addComment }
)(CommentList);
