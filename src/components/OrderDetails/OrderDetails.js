import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import './OrderDetailPage.css';

const OrderDetailPage = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            const orderRef = db.collection("users")
                .doc("user-id")  // Replace with actual user UID
                .collection("orders")
                .doc(orderId);

            const doc = await orderRef.get();

            if (doc.exists) {
                setOrderDetails(doc.data());
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (!orderDetails) return <p>Loading...</p>;

    return (
        <div className="orderDetailPage">
            <h2>Order {orderId}</h2>
            <p>Total: R{(orderDetails.amount / 100).toFixed(2)}</p>
            <p>Status: {orderDetails.status}</p>
            <p>Order placed: {new Date(orderDetails.created * 1000).toLocaleString()}</p>

            <div className="orderItems">
                {orderDetails.basket.map((item, index) => (
                    <div key={index} className="orderItem">
                        <img src={item.image} alt={item.title} />
                        <div>
                            <p>{item.title}</p>
                            <p>R{item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderDetailPage;
