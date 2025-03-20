import React, { useContext } from 'react';
import './Product.css'
import PropTypes from 'prop-types';
import ShoppingContext from '../../context/shopping/shoppingContext';


const Product = ({id, image, title, rating, price}) => {

  const shoppingContext = useContext(ShoppingContext);
  const { addToBasket } = shoppingContext;

  const handleAddToBasket = () => {
    addToBasket({item: {id, image, title, rating, price}});
  }

  return (
    <div className='product' key={id}>
        <img className='product_img' src={image} alt='' />
      <div className='product_info'>
        <p className='product_title'>
           {title} 
        </p>
        <div className='product_rating'>
          {Array.from({ length: rating }).fill().map((_, i) => (<p key={i}> ⭐ </p>))}
        </div>
        <p className='product_price'>
          {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(price)}
        </p>
      </div>
      <button className='product_button' onClick={handleAddToBasket}>Add to Basket</button>
    </div>
  )
}

Product.propTypes = {
  id: PropTypes.string.isRequired,     
  image: PropTypes.string.isRequired,   
  title: PropTypes.string.isRequired,   
  rating: PropTypes.number.isRequired, 
  price: PropTypes.number.isRequired,  
};

export default Product;
