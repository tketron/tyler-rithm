class Todo extends React.Component {
  render() {
    return (
      <div className="todo-item">
        <p>{this.props.todo}</p>
      </div>
    );
  }
}
