import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import {getCustomer} from '../../../actions/customeraction';
import { Card ,CardContent,Box,Container} from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import Update from './update';
import{ getFromStorage,setInStorage} from "../../../storage/index"

class ListCustomer extends Component {
componentDidMount(){
            this.props.getCustomer();
          }

    render() {
      const auth= getFromStorage("isauthendicate"); 

        const customerdata=this.props.customer.customer.map(customer=>
                {      
                  return{
                    name:customer.customer_name,
                      nic:customer.nic,
                      phone:customer.phonenumber,
                      address:customer.address,
                      
                      action:<Update id={customer.id}/>
                      }
    
                });

        const data = {
            columns: [
                {
                    label: 'CustomerName',
                    field: 'name',
                   
                    width: 150
                },
                {
                    label: 'NIC',
                    field: 'nic',
                    
                    width: 270
                },
                {
                    label: 'Address',
                    field: 'address',
                    
                    width: 200
                },
                {
                  label: 'PhoneNumber',
                  field: 'phone',
                  
                  width: 200
              },
                {
                    label: 'Action',
                    field: 'action',
                    
                    width: 200
                }


            ],
            rows: 
            customerdata
                
        };


        
        return ( 
          <div>
           { auth ?
            <Page
            
            title="Customers"
          >
            <Container maxWidth={false}>
              <Toolbar data={"Customer"} /> 
              <Box mt={5} >
              <Card >
             <CardContent>
              <MDBDataTable
                     striped
                     hover
                     data={data}
                />
                </CardContent>
                </Card>
              </Box>
            </Container>
          </Page>
          :""}
          </div>
        );
    }
}

const mapStateToProps = (state) => ({
    customer: state.customer,

})
export default connect(mapStateToProps, {getCustomer})(ListCustomer);
