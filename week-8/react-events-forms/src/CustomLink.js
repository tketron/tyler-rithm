import React, { Component } from 'react';

class CustomLink extends Component {
  state = {
    target: '_self'
  };

  openLink = evt => {
    this.setState({
      target: '_blank'
    });
    this.props.clickLink(evt);
  };

  render() {
    return (
      <a
        onClick={this.openLink}
        href={this.props.href}
        target={this.state.target}
      >
        {this.props.text}
      </a>
    );
  }
}

export default CustomLink;
