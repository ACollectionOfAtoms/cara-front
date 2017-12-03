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

  render = () => (
    <div className="alike-card">
      <figure 
        className="alike-card-figure"
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
      >
        <video 
          ref={(video) => {this.video = video}}
          className="alike-card-video" 
          src={this.props.videoSrc}></video>
      </figure>
      <figcaption className="alike-card-caption">
      </figcaption>
    </div>
  )
}

AlikeCard.propTypes = propTypes

export default AlikeCard
