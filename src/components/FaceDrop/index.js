import React from 'react';

export default function Face(props) {
  const figureStyle = {
    backgroundImage:`url(${props.faceImage})` 
  }
  return (
    <div>
      <h2>{props.title}</h2>
      <input 
        type="file" 
        onChange={props.handleFaceChange}
        name={props.filename} />
      <figure
        style={figureStyle}>
        <div className='face'></div>
        <figcaption>face</figcaption>
      </figure>
    </div>
  );
}
