import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { addCustomer } from '../../../actions/customeraction';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
 
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Invoice from "../../bill/src/App"
class AddCustomer extends Component {
    state = {
        modalShow: false,
         customer_name: "",
         address: "",
         nic: "",
         phonenumber: ""

    }

    onChangename = (e) => {
        this.setState({
          customer_name: e.target.value
        })
    }
    onChangeadress = (e) => {
        this.setState({
          address: e.target.value
        })
    }
    onChangenic = (e) => {
        this.setState({
            nic: e.target.value
        })
    }
    onChangephone= (e) => {
      this.setState({
        phonenumber: e.target.value
      })
  }
    onSubmit = (e) => {
        e.preventDefault();
        // console.log("this.state.program_name", this.state.program_name)
        const customer={customer_name:this.state.customer_name,address:this.state.address,nic:this.state.nic,phonenumber:this.state.phonenumber}
                console.log("customer", customer)
        this.props.addCustomer(customer);
        this.ontoggle()
    }

    ontoggle = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
    }


    render() {
        const { modalShow } = this.state;
        return (

            <div  >
 <Box
                  display="flex"
                  justifyContent="flex-end"
                  mt={3}
                >
                 
                  <Button
                    color="primary"
                    
                    onClick={this.ontoggle} 
                  >
                   ADD {this.props.data}
                  </Button>
                </Box>

                    

                <Modal
                    show={modalShow}
                    dialogClassName="modal-90w"
                    size="xl"
                    aria-labelledby="example-custom-modal-styling-title"
                    centered
                >
                    <Modal.Header closeButton onClick={this.ontoggle}>
                        <Modal.Title  id="contained-modal-title-vcenter">
                            ADD INVOICE
              </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                   <Invoice/>
                    </Modal.Body>

                </Modal>
            </div>
        );
    }
}

export default connect(null, { addCustomer })(AddCustomer);

