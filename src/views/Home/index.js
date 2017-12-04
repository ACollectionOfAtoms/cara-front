import React from 'react'
import AlikeCard from '../../components/AlikeCard'
import { Link } from 'react-router-dom'
import "./index.css"

export default () => (
  <div className="home-view">
    <Link to='compare-faces'>
      <AlikeCard
        caption="compare two faces"
        videoSrc="/faces.mp4"
        />
    </Link>
  </div>
) 