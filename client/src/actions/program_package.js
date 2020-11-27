import { GET_PROPAC,ADD_PROPAC,DELETE_PROPAC,UPDATE_PROPAC } from './type';
import axios from 'axios';
import invoice from 'src/views/invoice';
import {header} from './authaction';
import{getFromStorage}from "../storage/index"

export const getpropac = () => (dispatch,getState) => {

    axios.get('http://localhost:8080/program_package/',header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: GET_PROPAC,
            payload: res.data,
        })
    ).catch(err => console.log(err))

};
export const getApropac=(id)=>(dispatch,getState)=>{

    axios.get('http://localhost:8080/program_package/' +id,header(getFromStorage("auth")))
        .then(data =>Response.json(data))
        .catch(err => console.log(err))
}
export const updatepropac = (id, invoice) => (dispatch,getState,) => {
    axios.post('http://localhost:8080/program_package/' +invoice.id,{
         package:invoice.package,
    owner:invoice.owner,
    date:invoice.date,
    program:invoice.program,
     order_id:invoice.order_id,
     total:invoice.total,
     customer_name:invoice.customer_name,
     nic:invoice.nic,
     phonenumber:invoice.phonenumber,
    address:invoice.address
},header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: UPDATE_PROPAC,
            _id:invoice.id,
           payload:invoice
        })
    ).catch(err => console.log(err))

};

export const addpropac= (invoice) => (dispatch,getState) => {
    console.log(invoice,"invoiceoutpit")
    axios.post('http://localhost:8080/program_package/add', invoice ,header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: ADD_PROPAC,
            payload: res.data,
        })
    ).catch(err => console.log(err))

};

export const deletepropac = (id) => (dispatch,getState) => {

    axios.delete('http://localhost:8080/program_package/'+id,header(getFromStorage("auth"))).then(() =>
        dispatch({
            type: DELETE_PROPAC,
            payload: id
        })
    ).catch(err => console.log(err))

};
