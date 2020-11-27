import { GET_INVOICE,ADD_INVOICE,DELETE_INVOICE,UPDATE_INVOICE ,DELETE_UPDATEIN} from './type';
import axios from 'axios';
import invoice from 'src/views/invoice';
import {header} from './authaction';
import{getFromStorage}from "../storage/index"

export const getinvoice = () => (dispatch,getState) => {

    axios.get('http://localhost:8080/invoice/',header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: GET_INVOICE,
            payload: res.data,
        })
    ).catch(err => console.log(err))

};
export const getAinvoice=(id)=>(dispatch,getState)=>{

    axios.get('http://localhost:8080/invoice/' +id,header(getFromStorage("auth")))
        .then(data =>Response.json(data))
        .catch(err => console.log(err))
}
export const updateinvoice = ( invoice) => (dispatch,getState,) => {
    axios.post('http://localhost:8080/invoice/' +invoice.id,{
         package:invoice.package,
    owner:invoice.owner,
    status:invoice.status,
    date:invoice.date,
    program:invoice.program,
     order_id:invoice.order_id,
     total:invoice.total,
     customer_name:invoice.customer_name,
     nic:invoice.nic,
     phonenumber:invoice.phonenumber,
    address:invoice.address},header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: UPDATE_INVOICE,
            _id:invoice.id,
           payload:invoice
        })
    ).catch(err => console.log(err))

};

export const addinvoice = (invoice) => (dispatch,getState) => {
    console.log(invoice,"invoiceoutpit")
    axios.post('http://localhost:8080/invoice/add', invoice ,header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: ADD_INVOICE,
            payload: res.data,
        })
    ).catch(err => console.log(err))

};

export const deleteinvoice = (id) => (dispatch,getState) => {

    axios.delete('http://localhost:8080/invoice/'+id,header(getFromStorage("auth"))).then(() =>
        dispatch({
            type: DELETE_INVOICE,
            payload: id
        })
    ).catch(err => console.log(err))

};
export const deletecurent = () => (dispatch,getState) => {

    dispatch({
      type: DELETE_UPDATEIN,
      
  })

};