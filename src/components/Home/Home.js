import React from 'react'
import './Home.css';
import Products from '../Products/Products';


const Home = () => {
  return (
    <div className='home'>
      <div className='home_container'>
        <img className='hero_img' src='https://m.media-amazon.com/images/I/71tZqir0-9L._SX3000_.jpghttps://m.media-amazon.com/images/I/71tZqir0-9L._SX3000_.jpg' alt='hero-img' />
      </div>

      <Products />
    </div>
  )
}

export default Home
