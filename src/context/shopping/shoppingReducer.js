export const shoppingReducer = (state, action) => {
    let newBasket;

    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.payload],
            }
        
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            }

        case 'EMPTY_BASKET': 
            return {
                ...state,
                basket: [],
            }

        case 'REMOVE_FROM_BASKET': 
            const index = state.basket.findIndex(
                (basketItem) => basketItem.item.id === action.payload.id
            );

            newBasket = [...state.basket];
            if (index >= 0) {
                newBasket.splice(index, 1);
                localStorage.setItem('basket', JSON.stringify(newBasket)); // Update localStorage after removing item
            } else {
                console.warn(`Can't remove (id: ${action.payload.id}) as it's not in the basket.`);
            }
            return {
                ...state,
                basket: newBasket,
            };
        
        default:
            return state;
    }
}