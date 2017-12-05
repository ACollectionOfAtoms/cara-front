import React from 'react';
import Dropzone from 'react-dropzone';
import "./index.css";

export default function Face(props) {
  const bgStyle = { backgroundImage: `url(${props.previewURL})` }
  return (
    <Dropzone
      className="face-drop"
      style={bgStyle}
      maxSize={32 << 20}
      multiple={false}
      onDrop={(...args) => props.handleFaceChange.call(null, ...args, props.id)}
    >
    </Dropzone>
  );
}
