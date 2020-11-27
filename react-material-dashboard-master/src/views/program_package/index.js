import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import {getpropac} from '../../actions/program_package';
import { Card ,CardContent,Box,Container} from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import Update from './update';
import{ getFromStorage,setInStorage} from "../../storage/index"

class ListItem extends Component {
componentDidMount(){
            this.props.getpropac();
          }

    render() {
      const auth= getFromStorage("isauthendicate"); 

        const itemdata=this.props.propac.map(item=>
                {      
                  return{
                    program:item.program,
                      package:item.pac,
                      amount:item.amount,
                     
                      
                      action:<Update id={item.id}/>
                      }
    
                });

        const data = {
            columns: [
                {
                    label: 'Program',
                    field: 'program',
                   
                    width: 370
                },
                {
                    label: 'Package',
                    field: 'package',
                    
                    width: 370
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    
                    width: 270
                },
               
                {
                    label: 'Action',
                    field: 'action',
                    
                    width: 100
                }


            ],
            rows: 
            itemdata
                
        };


        return (
          <div>
          { auth ?
            <Page
            
            title="Item"
          >
            <Container maxWidth={false}>
              <Toolbar data={"Pragram Package"}/> 
              <Box mt={5} >
              <Card >
             <CardContent>
              <MDBDataTable
               entriesOptions={[5, 20, 25]}
               entries={5}
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
    propac: state.program_package.program_package,
    isauthendicate:state.auth.isauthendicate

})
export default connect(mapStateToProps, {getpropac})(ListItem);
