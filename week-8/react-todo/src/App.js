import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList';
import NewTodoForm from './NewTodoForm';

const INITIAL_TODOS = [
  {
    msg: 'Get Milk'
  },
  {
    msg: 'Feed the dog'
  },
  {
    msg: 'Build a react app'
  }
];

class App extends Component {
  state = {
    todos: INITIAL_TODOS
  };

  addTodo = td => {
    this.setState({
      todos: [...this.state.todos, td]
    });
    console.log(td);
  };

  render() {
    return (
      <div className="App">
        <NewTodoForm handleTodo={td => this.addTodo(td)} />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
