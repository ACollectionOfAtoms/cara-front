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
      fetching: false,
      error: false,
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
    const uploadUri = "http://localhost:7777/upload";
    const form = new FormData();
    const files = [
      this.state[this.faceDropIdOne].file,
      this.state[this.faceDropIdTwo].file
    ]
    files.forEach((file, index) => {
      form.append(`file-${index}`, file);
    });
    try {
      this.setState({
        fetching: true,
      })
      const resp = await fetch(uploadUri, {
        method: 'POST',
        'Content-Type': 'multipart/form-data',
        body: form,
      })
      let results = await resp.text();
      results = Math.round(results, 2);
      this.setState({
        results
      })
      this.setState({
        fetching: false,
      })
    } catch (err) {
      this.setState({
        fetching: false,
        error: true,
      })
      console.log(err);
    }
  }

  render() {
    const compareControlElement = () => {
      let el;
      if (this.state.results) {
        el = (<h1> These <span className="red-emph">faces</span> are <span className="green-emph">{this.state.results}% </span><span className="red-emph">similar!</span></h1>);
      } else if (this.state.fetching) {
        el = (<h2> <span aria-label="man-fetching-results" role="img">🏃‍♂️</span> fetching results, brb real quick...</h2>);
      } else if (this.state.error) {
        // TODO: add button to clear error state!
        el = (<h2> there was an error! Refresh page plz <span aria-label="sad face" role="img">😫</span></h2>);
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
    const containerClass = this.state.fetching 
                         ? "face-compare-container face-compare-container_fetching"
                         : "face-compare-container";
    return (
      <div className={containerClass}>
        <h1 className="page-title">are these faces similar??</h1>
        <div className="face-compare-zone">
          <div className="face-drop-one">
            <FaceDrop
              id={this.faceDropIdOne}
              previewURL={faceObjOne.imgUrl}
              handleFaceChange={this.handleFaceChange} />
          </div>
          <div className="face-drop-two">
            <FaceDrop
              id={this.faceDropIdTwo}
              previewURL={faceObjTwo.imgUrl}
              handleFaceChange={this.handleFaceChange} />
          </div>
          <div className="compare-control">
            {compareControlElement()}
          </div>
        </div>
      </div>
    );
  }
}
