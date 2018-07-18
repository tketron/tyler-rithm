class Pokedex extends React.Component {
  static defaultProps = {
    pokemon: [
      {
        id: 1,
        name: 'Charmander',
        type: 'fire',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'
      },
      {
        id: 2,
        name: 'Squirtle',
        type: 'water',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'
      },
      {
        id: 3,
        name: 'Butterfree',
        type: 'flying',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png'
      },
      {
        id: 4,
        name: 'Rattata',
        type: 'normal',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png'
      },
      {
        id: 5,
        name: 'Metapod',
        type: 'bug',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png'
      }
    ]
  };

  //add styles

  render() {
    return (
      <div id="container">
        <h1 id="title">Pokedex</h1>
        <div id="pokeContainer">
          {this.props.pokemon.map(p => (
            <Pokecard key={p.id} name={p.name} type={p.type} image={p.image} />
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Pokedex />, document.getElementById('root'));
