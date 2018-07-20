import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CustomLink from './CustomLink';

const links = [
  { href: 'https://www.rithmschool.com', text: 'Rithm School' },
  { href: 'https://facebook.github.io/react/', text: 'React Docs' },
  { href: 'https://www.codewars.com/dashboard', text: 'CodeWars' }
];

class App extends Component {
  state = {
    enabled: true
  };

  toggleDisablingLinks = () => {
    this.setState({
      enabled: !this.state.enabled
    });
  };

  openLink = evt => {
    if (!this.state.enabled) {
      evt.preventDefault();
    }
  };

  render() {
    return (
      <div className="App">
        {links.map((l, idx) => (
          <CustomLink
            key={idx}
            href={l.href}
            text={l.text}
            clickLink={this.openLink}
          />
        ))}
        <button onClick={this.toggleDisablingLinks}>
          {this.state.enabled ? 'Disable' : 'Enable'} all the links
        </button>
      </div>
    );
  }
}

export default App;
