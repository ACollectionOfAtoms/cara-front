import React from 'react';
import Dropzone from 'react-dropzone';
import "./index.css";

export default function Face(props) {
  let bgStyle;
  if (props.previewURL) {
    bgStyle = { backgroundImage: `url(${props.previewURL})` }
  }
  return (
    <Dropzone
      className="face-drop"
      style={bgStyle}
      maxSize={32 << 20}
      multiple={false}
      onDrop={(...args) => props.handleFaceChange.call(null, ...args, props.id)}
    >
      {!props.previewURL && 
        <div className="instructions">
          <h3 className="clickHere"> click here</h3>
          <h3> and upload </h3>
          <h3 className="aFace"> a face </h3>
        </div>}
    </Dropzone>
  );
}
