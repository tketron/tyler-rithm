import React, { Component } from 'react';
import { editPost } from './actionCreators';
import { connect } from 'react-redux';

class EditablePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: this.props.title,
      body: this.props.body,
      errormessage: '',
      isEditing: false
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.title != '' && this.state.body != '') {
      // edit the post
      this.props.editPost(this.state);

      this.setState({
        title: '',
        body: '',
        errormessage: '',
        isEditing: false
      });
    } else {
      this.setState({
        errormessage: 'Please fill Title and Body field'
      });
    }
  };

  render() {
    if (this.state.isEditing) {
      return (
        <div>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="body">Body:</label>
            <input
              type="text"
              name="body"
              value={this.state.body}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button name="submit" onClick={this.handleSubmit}>
              Submit
            </button>
          </div>
          <div>{this.state.errormessage}</div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            {' '}
            <a href="#">
              {' '}
              <h1>{this.props.title}</h1>
            </a>
          </div>
          <p>{this.props.body}</p>
          <div>
            <button
              name="edit"
              onClick={() => this.setState({ isEditing: true })}
            >
              Edit
            </button>
          </div>
        </div>
      );
    }
  }
}

export default connect(
  null,
  { editPost }
)(EditablePost);
