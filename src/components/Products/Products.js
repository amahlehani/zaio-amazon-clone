import React from 'react';
import './Products.css';
import Product from './Product';


const Products = () => {
  return (
    <div className='products_container'>
      <div className='products_row'>
        <Product 
          id='1'
          image='https://m.media-amazon.com/images/I/51b6dyjxy0L._AC._SR360,460.jpg'
          title='Logitech 2.4Ghz Optical Bluetooth POP Mouse, Heartbreaker Rose'
          rating={4}
          price={299.00}
        />

        <Product 
          id='2'
          image='https://m.media-amazon.com/images/I/51SVsC7yygL._AC._SR360,460.jpg'
          title='Apple AirPods (2nd generation) with Charging Case ​​​​​​​'
          rating={4.7}
          price={1995.00}
        />

        <Product 
          id='3'
          image='https://m.media-amazon.com/images/I/51hRglHNyML._AC._SR360,460.jpg'
          title='Body Glove Tempered Glass Screen Protector for Apple iPhone 15'
          rating={5}
          price={249.00}
        />

        <Product 
          id='4'
          image='https://m.media-amazon.com/images/I/61yFmLcjJcL._AC._SR360,460.jpg'
          title='Apple Watch Series 10 (GPS 46mm) Smartwatch Rose Gold'
          rating={4.6}
          price={10299.00}
        />
      </div>   
      <div className='products_row'>
      <Product 
          id='5'
          image='https://m.media-amazon.com/images/I/51JNhjr4McL._AC._SR360,460.jpg'
          title='JBL Tune 720BT Wireless Over-Ear 5.3 Bluetooth Headphones - Black. 76H battery life and speed charge'
          rating={4.6}
          price={1138.00}
        />

        <Product 
          id='6'
          image='https://m.media-amazon.com/images/I/61VuVU94RnL._AC._SR360,460.jpg'
          title='Apple iPhone 13 (128 GB) - Midnight (A15 Bionic chip. All-day battery life. Superfast 5G and a bright...'
          rating={4}
          price={11899.00}
        />
        <Product 
          id='7'
          image='https://m.media-amazon.com/images/I/61Rly6yup7L._AC._SR360,460.jpg'
          title='Apple 2020 MacBook Air (13-inch, Apple M1 chip with 8‑core CPU and 7‑core GPU, 8GB, 256GB)'
          rating={4.5}
          price={13999.00}
        />
        </div>

        <div className='products_row'>
        <Product 
          id='8'
          image='https://m.media-amazon.com/images/I/61WXXeDFcnL._AC._SR360,460.jpg'
          title='Instax Fujifilm Mini 12 Instant Film Camera, Clay White'
          rating={4.8}
          price={1459.00}
        />

        <Product 
          id='9'
          image='https://m.media-amazon.com/images/I/31Lm3P5NYHL._AC._SR360,460.jpg'
          title='Wyze Cam v4, 2K HD Wi-Fi Smart Home Security Camera'
          rating={4.3}
          price={1195.00}
        /> 

        <Product 
          id='10'
          image='https://m.media-amazon.com/images/I/71cOekU3aGL._AC._SR360,460.jpg'
          title='Canon EOS 2000D 24 MP Double IS Digital Camera Kit'
          rating={4.7}
          price={10999.00}
        />

        <Product 
          id='11'
          image='https://m.media-amazon.com/images/I/71EL5jIMgGL._AC._SR360,460.jpg'
          title='[Auto Focus/4K Support] Projector with WiFi 6 and Bluetooth 5.2..'
          rating={4.5}
          price={7500.00}
        />
        </div>

        <div className='products_row'>
        <Product 
          id='12'
          image='https://m.media-amazon.com/images/I/81906M53GdS._AC._SR360,460.jpg'
          title='Seagate 4TB USB 3.0 Expansion Desktop External Hard Drive'
          rating={4.6}
          price={2425.00}
        />
      </div>
    </div>
   
  )
}

export default Products
