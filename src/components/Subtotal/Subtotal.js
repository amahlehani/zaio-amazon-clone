import React, { useContext } from 'react';
import './Subtotal.css';
import ShoppingContext from '../../context/shopping/shoppingContext';
import { useNavigate } from 'react-router-dom';

const Subtotal = () => {
    const shoppingContext = useContext(ShoppingContext);
    const {basket, getBasketTotal} = shoppingContext;
    const navigate = useNavigate();

    const handleCheckout = () => {
      navigate('/payment');
    }

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-ZA', {
          style: 'currency',
          currency: 'ZAR',
      }).format(amount);
  };

  const basketTotal = getBasketTotal(basket);

  return (
    <div className='subtotal'>
        <p className='subtotal_text'>
            Subtotal: ({basket.length} items: {''} 
            <strong>{formatCurrency(basketTotal)}</strong>)
        </p>
        <div className='subtotal_gift' >
          <input type='checkbox' id='gift_checkbox'/>
          <label htmlFor='gift_checkbox'>This order contains a gift</label>
        </div>
        <button onClick={handleCheckout}>Proceed to checkout</button>
    </div>
  )
}

export default Subtotal
