class Tweet extends React.Component {
  render() {
    const { username, name, date, message } = this.props;
    return (
      <div>
        <p>{message}</p>
        <p>
          By {name} ({username}) on {date}.
        </p>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Tweet
          username="tketron"
          name="Tyler"
          date="7/17/2018"
          message="My first tweet"
        />
        <Tweet
          username="melliott"
          name="Matt"
          date="7/17/2018"
          message="Crazysauce"
        />
        <Tweet
          username="cora"
          name="Cora"
          date="7/17/2018"
          message="I'm scared"
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
