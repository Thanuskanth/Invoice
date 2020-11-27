import { GET_USER,ADD_USER,DELETE_USER,UPDATE_USER} from '../actions/type';
import axios from 'axios';
import {header} from './authaction';
import{getFromStorage}from "../storage/index"

export const getUser = () =>  (dispatch,getState) => {

    axios.get('/user/',header(getState().auth.token)).then(res =>
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    ).catch(err => console.log(err))

};

export const addUser = (user) =>  (dispatch,getState) => {
    console.clear()

  await  axios.post('/user/add',user).then(res =>
        dispatch({
            type: ADD_USER,
            payload:res.data.user
         //set this payload
           
        })
    ).catch(err => console.log(err))
    
};

export const deleteUser = (id) =>  (dispatch,getState) => {

    axios.delete('/user/'+id,header(getState().auth.token)).then(() =>
        dispatch({
            type: DELETE_USER,
            payload: id
        })
    ).catch(err => console.log(err))

};

