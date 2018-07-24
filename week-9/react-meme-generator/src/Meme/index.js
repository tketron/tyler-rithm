import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Meme(props) {
  return (
    <div className="Meme" id="foo">
      <div className="container">
        <span className="top-text">{props.topText}</span>
        <img src={props.url} alt="a meme" />
        <span className="bottom-text">{props.bottomText}</span>
        <button id="meme_deleteBtn" onClick={() => props.deleteMeme(props.id)}>
          DELETE
        </button>
      </div>
    </div>
  );
}

Meme.propTypes = {
  topText: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  bottomText: PropTypes.string.isRequired
};

export default Meme;
