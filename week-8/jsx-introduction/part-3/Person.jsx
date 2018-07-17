class Person extends React.Component {
  render() {
    const { age, name, hobbies } = this.props;
    return (
      <div>
        <p>Learn some information about this person: </p>
        <p>{age > 18 ? 'please go vote!' : 'you must be 18'}</p>
        <p>{name.slice(0, 6)}</p>
        <ul>{hobbies.map(h => <li key={h}>{h}</li>)}</ul>
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <Person age={30} name="Tyler" hobbies={['Music', 'Weightlifting']} />
    <Person age={6} name="Cora" hobbies={['Sleeping', 'Eating']} />
    <Person age={19} name="Bartholomew" hobbies={['Chanting']} />
  </div>,
  document.getElementById('root')
);
