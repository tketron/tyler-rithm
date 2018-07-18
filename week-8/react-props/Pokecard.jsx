class Pokecard extends React.Component {
  render() {
    //add styles
    return (
      <div className="pokecard">
        <h3>{this.props.name}</h3>
        <img src={this.props.image} />
        <p>Type: {this.props.type}</p>
      </div>
    );
  }
}
