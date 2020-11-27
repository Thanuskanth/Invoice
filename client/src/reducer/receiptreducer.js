import { GET_RECEIPT,ADD_RECEIPT,DELETE_RECEIPT,UPDATE_RECEIPT } from '../actions/type';

const initialState = {
    receipt: [],
    curent:{}
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RECEIPT:
            return {
                ...state,
                receipt: action.payload
            }

        case ADD_RECEIPT:
            return {
                ...state,
                receipt: [...state.receipt, action.payload],
                curent:action.payload
            }
            case DELETE_RECEIPT:
                return{
                    ...state,
                    receipt:state.receipt.filter(receipt=>receipt.id!==action.payload)
                }
                case UPDATE_RECEIPT:
                    state.receipt=state.receipt.filter(receipt=>receipt.id!==action._id)
                    return{
                        ...state,
                        receipt: [...state.receipt, action.payload]
                    }
    
        default: return state;
    }
}