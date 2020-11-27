import React, { Component, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import {login} from '../../../actions/authaction';
import {clearError} from '../../../actions/erroraction';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, Container, NavLink, Alert } from 'reactstrap';
class Register extends Component {
    state = {
        modal: false,
      
        password: '',
        email: '',
        err:""
    }
    toggole = () => {
        this.props.clearError();
        this.setState({
            modal: !this.state.modal
        })
    }
    onChangeemail = (e) => {
        this.setState({
            email: e.target.value
        })
    } 
    onChangepassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
      
        const {email,password}=this.state;
        const user={
           email,password
        }
     
        this.props.login(user)
        this.toggole();

    }
    
    
    onChange = (e) => {
        this.setState({
           [ e.target.name]: e.target.value
        })
    }
    componentDidUpdate(prevProps){
        const {error}= this.props;
        if(error !== prevProps.error){
            if(error.id == "login_error"){
                this.setState({
                    msg:error.msg.msg
                })
            }
            else{
                this.setState({
                    msg:null
                })
            }
        }

        if(this.state.modal){
            if(this.props.isAutenticate){
                this.toggole();
                
            }
        }
    }
    render() {
        return (

            <div>

                <NavLink color="dark" onClick={this.toggole} href="#" >Login</NavLink>
                <Modal isOpen={this.state.modal}  >
                    <ModalHeader  toggle={this.toggole}>Login</ModalHeader>
        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                           
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="text" id="email" onChange={this.onChangeemail} placeholder="Enter Email " />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="text" id="password" onChange={this.onChangepassword} placeholder="Enter Password " />
                            </FormGroup>
                            <Button>Submit</Button>

                        </Form>
                    </ModalBody>

                </Modal>
               
                
            </div>

        )
    }
}


const mapStatetoprops=(state)=>({
    error:state.error,
    auth:state.auth
})
export default connect(mapStatetoprops,{login,clearError}) (Register);