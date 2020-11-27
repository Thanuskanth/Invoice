import { GET_CUSTOMER,ADD_CUSTOMER,DELETE_CUSTOMER,UPDATE_CUSTOMER } from '../actions/type';

const initialState = {
    customer: []
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CUSTOMER:
            return {
                ...state,
                customer: action.payload
            }

        case ADD_CUSTOMER:
            return {
                ...state,
                customer: [...state.customer, action.payload]
            }
            case DELETE_CUSTOMER:
                return{
                    ...state,
                    customer:state.customer.filter(customer=>customer.id!==action.payload)
                }
                case UPDATE_CUSTOMER:
                    state.customer=state.customer.filter(customer=>customer.id!==action._id)
                    return{
                        ...state,
                        customer: [...state.customer, action.payload]
                    }
    
        default: return state;
    }
}