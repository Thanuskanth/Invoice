import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Page from 'src/components/Page';
import DatePicker from "react-datepicker";
import PrintProvider, { Print } from 'react-easy-print';

import Form from 'react-bootstrap/Form';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import {getPackage} from '../../actions/packageaction';
import {getProgram} from '../../actions/programaction';
import {getOwner} from '../../actions/owneraction';
import { isNull } from 'lodash';
import{ getFromStorage,setInStorage} from "../../storage/index"

class ListItem extends Component {
  state = {
    startdate: new Date(),
    
    

}
onChangestartdate = (date) => {
  this.setState({
      startdate:date
  })
}
componentDidMount(){
  // window.print()

            this.props.getProgram();
            this.props.getPackage();
            this.props.getOwner();
          }

    render() {
      
      const auth= getFromStorage("isauthendicate"); 

        return (
          <div>
          { auth ?
            <PrintProvider
            
            title="Item"
          >
            <Print >
            <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        mt={10}
      >
        <Container maxWidth="sm">
         
              <form >
                <Box mb={3} ml={14}>
                  <Typography
                    color="textSecondary"
                    variant="h2"
                  >
                    Create new Invoice
                  </Typography>
                
                </Box>
               

    <div class="form-group row">
    <label for="staticEmail" class="col-sm-4 col-form-label">Select Program</label>
    <div class="col-sm-6">
    <Form.Group controlId="exampleForm.SelectCustom">
                                
                                <Form.Control as="select" ref="role" custom onChange={this.onChangerole}>
                                    {this.props.program.map((program) => (
                                        <option value={program.id}>{program.program_name}</option>
                                    )
                                    )
                                    }

                                </Form.Control>
                            </Form.Group>    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword" class="col-sm-4 col-form-label">Select Package</label>
    <div class="col-sm-6">
    <Form.Group controlId="exampleForm.SelectCustom">
                                
                                <Form.Control as="select" ref="role" custom onChange={this.onChangerole}>
                                    {this.props.package.map((pac) => (
                                        <option value={pac.id}>{pac.package_name}</option>
                                    )
                                    )
                                    }

                                </Form.Control>
                            </Form.Group>    </div>
  </div>
  <div class="form-group row">
    <label for="staticEmail" class="col-sm-4 col-form-label">Select Owner</label>
    <div class="col-sm-6">
    <Form.Group controlId="exampleForm.SelectCustom">
                               
                                <Form.Control as="select" ref="role" custom onChange={this.onChangerole}>
                                    {this.props.owner.map((owner) => (
                                        <option value={owner.id}>{owner.owner_name}</option>
                                    )
                                    )
                                    }

                                </Form.Control>
                            </Form.Group>    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword" class="col-sm-4 col-form-label">Select Date</label>
    <div class="col-sm-6">
    <DatePicker  selected={this.state.startdate} onChange={this.onChangestartdate}/>
    </div>
  </div>
      
                <TextField
                  
                  fullWidth
                  id="standard-read-only-input" 
                  label="Amount"
                  margin="normal"
                  disabled                                
                  name="amount"
                 
                  type="password"
                 
                  variant="outlined"
                />
               
                
                <Box my={2} mt={5}>
                  <Button
                    color="primary"
                    
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Print Bill
                  </Button>
                </Box>
                
              </form>
           
        </Container>
      </Box>
      </Print>
          </PrintProvider>
           :""}
           </div>
        );
    }
}

const mapStateToProps = (state) => ({
    owner: state.owner.owner,
    package: state.package.package,
    program: state.program.program,
    // isauthendicate:state.auth.isauthendicate

})
export default connect(mapStateToProps, {getOwner,getPackage,getProgram})(ListItem);

