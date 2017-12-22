import React from 'react'
import PropTypes from 'prop-types'
import "./index.css"

const propTypes = {
  videoSrc: PropTypes.string,
}

class AlikeCard extends React.Component {
  constructor(props) {
    super(props)
    this.handleHover = this.handleHover.bind(this)
    this.state = {
      videoPlaying: false,
    }
  }

  handleHover() {
    if (this.videoPlaying) {
      this.video.pause()
      this.videoPlaying = false;
    } else {
      this.video.play()
      this.videoPlaying = true;
    }
  }

  render() {
    // TODO: Use this for a fancy animation of sorts
    const captionArray = this.props.caption.split(" ")

    return (
      <div 
        onMouseLeave={this.handleHover}
        onMouseEnter={this.handleHover}
        className="alike-card">
        <figure className="alike-card-figure">
          <video 
            loop
            ref={(video) => {this.video = video}}
            className="alike-card-video" 
            src={this.props.videoSrc}></video>
        </figure>
        <figcaption className="alike-card-caption">
          {captionArray.map((word, i) => (
            <p key={i} className="caption-word"> {word} </p>
          ))}
        </figcaption>
      </div>
    )
  }
}

AlikeCard.propTypes = propTypes

export default AlikeCard
