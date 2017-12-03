import React from 'react';
import FaceDrop from '../components/FaceDrop'

export default class CompareContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFiles: {},
      faceOneUrl: '',
      faceTwoUrl: ''
    };
    this.handleFaceChange = this.handleFaceChange.bind(this);
  }

  handleFaceChange() {
    // const fileName = preview.className;
    // var curFiles = input.files;
    // if(curFiles.length === 0) {
    //   preview.textContent = 'No files currently selected for upload';
    // } else {
    //   const file = curFiles[0];
    //   if(validFileType(file)) {
    //     const url = window.URL.createObjectURL(file);
    //     preview.src = url;
    //     // store the file to be uploaded...
    //     uploadedFiles[fileName] = file;
    //   } else {
    //     preview.textContent = 'File name ' + file.name + ': Not a valid file type. Update your selection.';
    //   }
    // }
  }

  render() {
    return (
      <div>
        <FaceDrop
          handleFaceChange={this.handleFaceChange}
          filename='uploadfile1'
          title={'upload face 1'}/>
        <FaceDrop
          handleFaceChange={this.handleFaceChange}
          filename='uploadfile2'
          title={'upload face 2'}/>
      </div>
    );
  }
}
