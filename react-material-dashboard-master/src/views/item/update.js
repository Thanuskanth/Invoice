
import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteItem, updateItem } from '../../actions/itemaction';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Pencil, X } from 'react-bootstrap-icons';
import { ImBin } from "react-icons/im";
import * as Yup from 'yup';
import { getFromStorage, setInStorage } from "../../storage"
import { header } from '../../actions/authaction';
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
import axios from 'axios';
import Swal from 'sweetalert2'
// import { header } from '../../actions/authaction';

class UpdateItem extends Component {
    state = {
        modalShow: false,
        item:{},
        item_name:"",
        detail:"",
        amount:"",
        

    }




    onChangeitem_name = (e) => {
        this.setState({
            item_name: e.target.value
        })
    }
    onChangedetail = (e) => {
        this.setState({
            detail: e.target.value
        })
    }
    onChangeamount = (e) => {
        this.setState({
            amount: e.target.value
        })
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        // console.log("this.state.role", this.state.role)
        const item={
            item_name:this.state.item_name,
            amount:this.state.amount,
            detail:this.state.detail,
            
            id:this.props.id 
        }
        this.props.updateItem(item);
        this.ontoggle()
    }

    ontoggle = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
        this.componentDidMount();
    }
    componentDidMount() {
        console.log(this.props,"props")
        axios.get('http://localhost:8080/item/' + this.props.id,header(getFromStorage("auth"))).then(res => {
            console.log(res.data)
            this.setState({
               
                item_name:res.data.item_name,
                detail:res.data.detail,
                amount:res.data.amount
                
            })
        }

        )
        
    }
    onDelete=(id)=>{
  
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.value) {
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                  this.props. deleteItem(id);
                }
              })
          }
        })
            
  
         
       
  }
    render() {
        const { modalShow } = this.state;
        return (

            <div >

<Pencil color="green"  size={20} className="mr-3" onClick={this.ontoggle}/>
                
               
                <ImBin color="red" size={20} onClick={()=>this.onDelete(this.props.id)}/>
              

                <Modal
                    show={modalShow}
                    size="auto"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton onClick={this.ontoggle}>
                        <Modal.Title  id="contained-modal-title-vcenter">
                            {/* Create {this.props.data} */}
              </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
        
              <form onSubmit={this.onSubmit}>
                <Box mb={3} ml={12}>
                  <Typography
                    color="textSecondary"
                    variant="h3"
                  >
                    Update Item
                  </Typography>
                  
                </Box>
                <TextField
                  
                  fullWidth
                  required
                  defaultValue={this.state.item_name}
                  label="Item Name"
                  margin="normal"
                  name="itemName"                  
                  variant="outlined"
                  onChange={this.onChangeitem_name}
                />
                <TextField
                  
                  fullWidth
                  required
                  defaultValue={this.state.detail}
                  label="Detail"
                  margin="normal"
                  name="detail"
                  variant="outlined"
                  onChange={this.onChangedetail}

                />
                <TextField
                  fullWidth
                  required
                  defaultValue={this.state.amount}
                  label="Amount"
                  margin="normal"
                  name="amount"                  
                  variant="outlined"
                  onChange={this.onChangeamount}

                />
                
               
              
                <Box ml={20}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    
                  >
                    Save
                  </Button>
                </Box>
                
              </form>
           
        </Container>
      </Box>
                    </Modal.Body>

                </Modal>
            </div>
        );
    }
}

export default connect(null, { deleteItem,updateItem })(UpdateItem);



