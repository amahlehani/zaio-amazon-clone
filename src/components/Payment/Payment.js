import React, { useContext, useEffect, useState } from 'react';
import './Payment.css';
import ShoppingContext from '../../context/shopping/shoppingContext';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from '../axios';
import CurrencyFormat from 'react-currency-format';
import { db } from '../../firebase';
import { doc, setDoc } from "firebase/firestore";


const Payment = () => {
    const shoppingContext = useContext(ShoppingContext);
    const { basket, user, getBasketTotal, emptyBasket } = shoppingContext;

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");

    const navigate = useNavigate();
    
    useEffect(() => {
        const getClientSecret = async () => {
            try {
                const response = await axios({
                    method: "post",
                    url: `/payments/create`,
                    data: {
                        total: getBasketTotal(basket) * 100,
                    }, 
                });
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error("Error fetching client secret:", error);
                setError("Unable to fetch client secret.");
            }
        };
        getClientSecret();
    }, [basket, getBasketTotal]);
    
    console.log("the secret is => ", clientSecret);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {card: elements.getElement(CardElement)},
        }).then(({paymentIntent}) => {
            setDoc(doc(db, "users", user?.uid, "orders", paymentIntent.id), {
                basket: basket.map(item => ({
                    id: item.item.id,
                    title: item.item.title,
                    image: item.item.image,
                    price: item.item.price,
                })),
                amount: paymentIntent.amount,
                created: paymentIntent.created,
                status: paymentIntent.status,
            });

            setSucceeded(true);
            setError(null);
            setProcessing(false);
            emptyBasket();
            navigate('/orders');
        })   
    };
    
    const handleOnChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

  return (
    <div className='payment'>
        <div className='payment_container'>
            <h1>Checkout: <Link to='/checkout'>{basket?.length} items</Link></h1>
        </div>
        <div className='payment_section'>
            <div className='payment_title'>
                <h3>Delivery Address</h3>
            </div>
            <div className='payment_address'>
                <p>{user?.email}</p>
                <p>123 Monument Road</p>
                <p>Glen Marais</p>
                <p>Kempton Park</p>
            </div>
        </div>
        <div className='payment_section'>
            <div className='payment_title'>
                <h3>Review items and delivery</h3>
            </div>
            <div className='payment_items'>
                {basket.map((item) => (
                    <CheckoutProduct 
                        key={item.item.id}
                        id={item.item.id}
                        title={item.item.title}
                        image={item.item.image}
                        rating={item.item.rating}
                        price={item.item.price}
                    />
                ))}
            </div>
        </div>
        <div className='payment_section'>
            <div className='payment_title'>
                <h3>Payment Details</h3>
                <div className='payment_details'>

                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleOnChange} />
                        <div className='payment_priceContainer'>
                            <CurrencyFormat 
                                renderText={(value) =>
                                    <h3>Order Total: {value}</h3>
                                }
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'R'}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                            </button>
                        </div>
                        {error && <div>{error}</div>}
                    </form>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment
