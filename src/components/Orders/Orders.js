import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './Orders.css';

const Orders = ({ user }) => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch orders for the current user from Firestore
        const fetchOrders = async () => {
            if (user?.uid) {
                const ordersRef = db.collection("users")
                    .doc(user.uid)
                    .collection("orders");

                // Query all orders for the user
                const snapshot = await ordersRef.orderBy("created", "desc").get();

                const fetchedOrders = snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }));

                setOrders(fetchedOrders);
            }
        };

        fetchOrders();
    }, [user]);

    // Navigate to the specific order's details page (if you want to show detailed view)
    const goToOrderDetail = (orderId) => {
        navigate(`/order/${orderId}`);
    };

    return (
        <div className="orderPage">
            <h2>Your Orders</h2>
            <div className="ordersContainer">
                {orders.length === 0 ? (
                    <p>You have no orders yet.</p>
                ) : (
                    orders.map(order => (
                        <div
                            key={order.id}
                            className="order"
                            onClick={() => goToOrderDetail(order.id)}
                        >
                            <div className="orderInfo">
                                <h3>Order ID: {order.id}</h3>
                                <p>
                                    Total: R{(order.data.amount / 100).toFixed(2)}
                                </p>
                                <p>
                                    Order placed:{" "}
                                    {new Date(order.data.created * 1000).toLocaleString()}
                                </p>
                                <p>Status: {order.data.status}</p>
                            </div>

                            <div className="orderItems">
                                {order.data.basket.map((item, index) => (
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
                    ))
                )}
            </div>
        </div>
    );
};

export default Orders;
