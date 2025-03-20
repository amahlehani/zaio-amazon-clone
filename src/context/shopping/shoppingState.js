import PropTypes from 'prop-types';
import { useReducer, useMemo } from "react";
import { shoppingReducer } from "./shoppingReducer";
import ShoppingContext from './shoppingContext';

export const ShoppingState = (props) => {
    const initialState = {
        basket: JSON.parse(localStorage.getItem('basket')) || [],
        user: null
    };
    const [state, dispatch] = useReducer(shoppingReducer, initialState);

    const addToBasket = async (item) => {
        dispatch({
            type: 'ADD_TO_BASKET',
            payload: item
        });
    };

    const setUser = (user) => {
        dispatch({
            type: 'SET_USER',
            payload: user,
        });
    };

    const getBasketTotal = (basket) => {
        return basket?.reduce((amount, item) => {
            const price = parseFloat(item?.item?.price);
            if (isNaN(price)) {
                console.warn(`Invalid price for item:`, item);
                return amount;
            }
            console.log('Adding price:', price);  
            return amount + price;
        }, 0);
    };

    const emptyBasket = () => {
        dispatch({
            type: 'EMPTY_BASKET',
        })
    }

    const removeFromBasket = (item) => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            payload: item,
        })
    }

    const contextValue = useMemo(() => ({
        basket: state.basket,
        user: state.user,
        addToBasket,
        getBasketTotal,
        setUser,
        emptyBasket,
        removeFromBasket
    }), [state.basket, state.user]);

    return (
        <ShoppingContext.Provider value={contextValue}>
            {props.children}
        </ShoppingContext.Provider>
    )
}

ShoppingState.propTypes = {
    children: PropTypes.node.isRequired, 
  };