import React from 'react'
//assets=>
import video from '../../assets/video.mp4'
import train from '../../assets/train.png'
import { SectionWrapper } from '../../hoc'


const Home = () => {
  return (
    <div className='home flex container'>
      <div className="mainText">
        <h1>TRAIN TICKET BOOKING</h1>
      </div>
      <div className="homeImages flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop className='video'></video>
        </div>
        <img src={train} className='train' />
      </div>
    </div>
  )
}

export default SectionWrapper(Home,"home")
// export default Home;