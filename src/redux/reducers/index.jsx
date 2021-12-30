import { combineReducers } from "redux"
import { collection, getDocsFromServer } from "firebase/firestore";
import { database } from "../../Firebase/firebaseconfig";
const initialstate = {
    count: 0
}


const countreducers = (state = initialstate.count, action) => {
    switch (action.type) {
        case 'cartcount':
            {
                const countcart = async () => {
                    const cart = collection(database, "cart", sessionStorage.getItem("email"), "items")
                    const data = await getDocsFromServer(cart)
                    return data.docs.length
                
                }
                console.log(countcart());
                return countcart()
            }
        default:
            return state
    }
}


export const reducers = combineReducers({
    count: countreducers
})