import React, { Component } from 'react';
import Box from './Box';

class BoxList extends Component {
  render() {
    return (
      <div>
        {this.props.boxes.map((b, i) => (
          <Box
            key={i}
            backgroundColor={b.backgroundColor}
            width={b.width}
            height={b.height}
          />
        ))}
      </div>
    );
  }
}

export default BoxList;
