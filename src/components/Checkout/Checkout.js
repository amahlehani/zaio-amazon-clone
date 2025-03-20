import React, { useContext } from 'react';
import './Checkout.css';
import ShoppingContext from '../../context/shopping/shoppingContext';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import Subtotal from '../Subtotal/Subtotal';

const Checkout = () => {
    const shoppingContext = useContext(ShoppingContext);
    const { basket, user } = shoppingContext;

  return (
    <div className='checkout'>
      <div className='checkout_content'>
        <h3>Hello {user?.email},</h3>
        <h2 className='checkout_title'>Your Shopping Basket</h2>
        {basket.map((item) => {
          return (
            <CheckoutProduct 
                key={item.item.id}
                id={item.item.id}
                title={item.item.title}
                image={item.item.image}
                rating={item.item.rating}
                price={item.item.price}
            />
          );
        })}   
      </div>
      <div className='checkout_right'>
        <Subtotal />
      </div>
    </div>
  )
}

export default Checkout
