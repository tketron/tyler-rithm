class TodoList extends React.Component {
  static defaultProps = {
    todos: [
      'Go to the store',
      'Make dinner reservations',
      'Call parents',
      'Feed pets'
    ]
  };

  render() {
    return (
      <div id="container">
        <h1>To Do! 📋</h1>
        <ul>
          {this.props.todos.map((td, idx) => <Todo key={idx} todo={td} />)}
        </ul>
      </div>
    );
  }
}
