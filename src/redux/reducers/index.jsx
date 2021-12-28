import { combineReducers } from "redux"

const initialstate = {
    cart: []
}


 const cartreducers = (state = initialstate.cart, action) => {
    switch (action.type) {
        case 'addcart':
            {
                const temp = state
                temp.push(action.data)
                return temp
            }
        default:
            return state
    }
}


export const reducers = combineReducers({
    cart : cartreducers
})