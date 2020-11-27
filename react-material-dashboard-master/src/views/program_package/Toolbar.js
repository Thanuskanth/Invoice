import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { addpropac } from '../../actions/program_package';
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
class AddProgram extends Component {
  state = {
    modalShow: false,
    program: "",
    package: "",
    amount: "",

  }

  onChangeprogram = (e) => {
    this.setState({
      program: e.target.value
    })
  }
  onChangepackage = (e) => {
    this.setState({
      package: e.target.value
    })
  }
  onChangeamount = (e) => {
    this.setState({
      amount: e.target.value
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    // console.log("this.state.program_name", this.state.program_name)
    const item = { program: this.state.program, pac: this.state.package, amount: this.state.amount }
    this.props.addpropac(item);
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
          size="auto"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton onClick={this.ontoggle}>
            <Modal.Title id="contained-modal-title-vcenter">
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
                      Create new Item
                  </Typography>

                  </Box>
                  <TextField

                    fullWidth
                    required
                    label="Program"
                    margin="normal"
                    name="itemName"
                    variant="outlined"
                    onChange={this.onChangeprogram}
                  />
                  <TextField

                    fullWidth
                    required
                    label="Package"
                    margin="normal"
                    name="detail"
                    variant="outlined"
                    onChange={this.onChangepackage}

                  />
                  <TextField
                    fullWidth
                    required
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

export default connect(null, { addpropac })(AddProgram);

