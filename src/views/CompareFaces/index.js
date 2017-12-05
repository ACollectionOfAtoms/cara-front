import React from 'react';
import FaceDrop from '../../components/FaceDrop'
import "./index.css";

export default class CompareContainer extends React.Component {
  constructor(props) {
    super(props);
    this.faceDropIdOne = "one"
    this.faceDropIdTwo = "two"
    this.state = {
      results: null,
      [this.faceDropIdOne]: {
        file: null,
        imgUrl: '',
      },
      [this.faceDropIdTwo]: {
        file: null,
        imgUrl: '',
      }
    };
    this.handleFaceChange = this.handleFaceChange.bind(this);
    this.uploadImages = this.uploadImages.bind(this);
  }

  handleFaceChange(acceptedFile, rejectedFile, _, id) {
    if (rejectedFile.length > 0) {
      // TODO: Image is a no go, display error to user...
      return;
    }
    const file = acceptedFile[0];
    const imageUrl = window.URL.createObjectURL(file); 
    this.setState({
      [id]: {
        file: file,
        imgUrl: imageUrl,
      }
    });
  }

  async uploadImages() {
    const uploadUri = "http://acollectionofatoms.me/upload";
    const form = new FormData();
    const files = [
      this.state[this.faceDropIdOne].file,
      this.state[this.faceDropIdTwo].file
    ]
    files.forEach((file, index) => {
      console.log(file);
      form.append(`file-${index}`, file);
    });
    try {
      const resp = await fetch(uploadUri, {
        method: 'POST',
        'Content-Type': 'multipart/form-data',
        body: form,
      });
      let results = await resp.text();
      console.log(results);
      results = Math.round(results, 2);
      this.setState({
        results
      })
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const compareControlElement = () => {
      let el;
      if (this.state.results) {
        el = (<h3> These faces are {this.state.results}% similar</h3>);
      } else if (this.state.fetching) {
        el = (<h3>fetching results...</h3>);
      } else if (this.state.error) {
        el = (<h3> there was an error! </h3>);
      } else {
        el = (
        <button
          onClick={this.uploadImages}
        >Compare</button>
      );
      }
      return el;
    };

    const faceObjOne = this.state[this.faceDropIdOne];
    const faceObjTwo = this.state[this.faceDropIdTwo];
    return (
      <div>
        <h1>Compare these faces</h1>
        <div className="face-compare-zone">
          <FaceDrop
            id={this.faceDropIdOne}
            previewURL={faceObjOne.imgUrl}
            handleFaceChange={this.handleFaceChange} />
          <FaceDrop
            id={this.faceDropIdTwo}
            previewURL={faceObjTwo.imgUrl}
            handleFaceChange={this.handleFaceChange} />
          <div className="compare-control">
            {compareControlElement()}
          </div>
        </div>
      </div>
    );
  }
}
