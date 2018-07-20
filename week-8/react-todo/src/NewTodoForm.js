import React, { Component } from 'react';

export default class NewTodoForm extends Component {
  state = {
    message: ''
  };

  handleMessageChange = e => {
    this.setState({
      msg: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleTodo(this.state);
  };
  render() {
    return (
      <div className="NewTodoForm">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="message">Todo: </label>
          <input
            type="text"
            name="message"
            id="message"
            onChange={this.handleMessageChange}
            value={this.state.msg}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
    return null;
  }
}
