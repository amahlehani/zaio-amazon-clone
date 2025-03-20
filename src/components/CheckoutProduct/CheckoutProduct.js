import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './CheckoutProduct.css';
import ShoppingContext from '../../context/shopping/shoppingContext';

const Checkout = ({ id, image, title, rating, price, hideButton }) => {
  const shoppingContext = useContext(ShoppingContext);
  const { removeFromBasket } = shoppingContext;

  const handleRemoveFromBasket = () => {
    removeFromBasket({ id: id });
  };

  return (
    <div>
      <div className="checkout_product" key={id}>
        <img className="checkout_product_img" src={image} alt="" />
        <div className="chekout_product_info">
          <p className="checkout_product_title">{title}</p>
          <div className="checkout_product_rating">
            {Array.from({ length: rating })
              .fill()
              .map((_, i) => (
                <p key={i}> ⭐ </p>
              ))}
          </div>
          <p className="checkout_product_price">
            {new Intl.NumberFormat("en-ZA", {
              style: "currency",
              currency: "ZAR",
            }).format(price)}
          </p>
          <div className='remove_product_btn'>
            {!hideButton && (
            <button className='remove_product_btn' onClick={handleRemoveFromBasket}>
              Remove from Basket
            </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Checkout.propTypes = {
  id: PropTypes.string.isRequired,     
  image: PropTypes.string.isRequired,   
  title: PropTypes.string.isRequired,   
  rating: PropTypes.number.isRequired, 
  price: PropTypes.number.isRequired,  
  hideButton: PropTypes.bool,
};

export default Checkout
