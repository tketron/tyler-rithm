import React, { Component } from 'react';

class BoxListForm extends Component {
  state = {
    width: '',
    height: '',
    backgroundColor: ''
  };

  handleWidthChange = evt => {
    this.setState({
      width: evt.target.value
    });
  };

  handleHeightChange = evt => {
    this.setState({
      height: evt.target.value
    });
  };

  handleColorChange = evt => {
    this.setState({
      backgroundColor: evt.target.value
    });
  };

  handleFormSubmit = evt => {
    evt.preventDefault();
    this.props.createBox(this.state);
    this.setState({
      width: '',
      height: '',
      backgroundColor: ''
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="width">Width:</label>
          <input
            name="width"
            type="text"
            id="width"
            value={this.state.width}
            onChange={this.handleWidthChange}
          />
          <label htmlFor="height">Height:</label>
          <input
            name="height"
            type="text"
            id="height"
            value={this.state.height}
            onChange={this.handleHeightChange}
          />
          <label htmlFor="backgroundColor">Background Color:</label>
          <input
            name="backgroundColor"
            type="text"
            id="backgroundColor"
            value={this.state.backgroundColor}
            onChange={this.handleColorChange}
          />
          <button type="submit">Create New Box</button>
        </form>
      </div>
    );
  }
}

export default BoxListForm;
