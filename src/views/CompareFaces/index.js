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
      comment: null,
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
    this.commentary = {
      90: "If these aren't the same people, they must be twins! 😳",
      80: "Are these the same people?! 😲",
      75: "An uncanny resemblance! 😲",
      70: "Whoa are you guys siblings? 🤗",
      60: "Hm, not so similar 🤔 but there's something there! 😊",
      50: "Quite different faces indeed! 😌",
      40: "Such very different faces! 🙂",
    }
    this.handleFaceChange = this.handleFaceChange.bind(this);
    this.uploadImages = this.uploadImages.bind(this);
    this.reset = this.reset.bind(this);
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

  chooseComment(percentResult) {
    let commentKey, delta = Infinity;
    Object.keys(this.commentary).forEach(percentage => {
      const diff = Math.abs(percentResult - percentage);
      if (diff < delta) {
        commentKey = percentage;
        delta = diff;
      }
    });
    return this.commentary[commentKey];
  }

  async uploadImages() {
    const uploadUri = `${process.env.REACT_APP_FACE_COMPARE_SERVER}/upload`
    const form = new FormData()
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
        comment: this.chooseComment(results)
      })
    } catch (err) {
      this.setState({
        fetching: false,
        error: true,
        comment: null,
      })
    }
  }

  reset() {
    this.setState({
      results: null,
      comment: null,
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
    })
  }

  render() {
    const compareControlElement = () => {
      let el;
      if (this.state.results) {
        el = (
          <div className="results-container">
            <h1 className="blue"> These <span className="red-emph">faces</span> are <span className="green-emph">{this.state.results}% </span><span className="red-emph">similar!</span></h1>
            <h2> {this.state.comment} </h2>
            <button onClick={this.reset}> Shall we start over? </button>
          </div>
        );
      } else if (this.state.fetching) {
        el = (<h2 className="fetching-text"> <span aria-label="man fetching results" role="img">🏃‍♂️</span> fetching results, brb real quick...</h2>);
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
        <div className="note">
          <h3> NOTE: for best results provide clear photos of faces with good lighting <span role="img" aria-label="emoji of lightbulb">💡</span></h3>
        </div>
      </div>
    );
  }
}
