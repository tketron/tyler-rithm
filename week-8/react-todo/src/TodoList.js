import React, { Component } from 'react';
import Todo from './Todo';

export default class TodoList extends Component {
  render() {
    return (
      <div className="TodoList">
        {this.props.todos.map(td => <Todo msg={td.msg} />)}
      </div>
    );
  }
}
