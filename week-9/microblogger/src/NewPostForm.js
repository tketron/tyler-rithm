import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from './actionCreators';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      errormessage: ''
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
      this.props.addPost(this.state);
      this.setState({
        title: '',
        body: '',
        errormessage: ''
      });
    } else {
      this.setState({
        errormessage: 'Please fill Title and Body field'
      });
    }
  };
  render() {
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
  }
}

export default connect(
  null,
  { addPost }
)(PostForm);
