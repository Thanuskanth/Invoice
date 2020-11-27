import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import {getOwner} from '../../actions/owneraction';
import { Card ,CardContent,Box,Container} from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import Update from './update';
import{ getFromStorage,setInStorage} from "../../storage/index"

class ListOwner extends Component {
componentDidMount(){
            this.props.getOwner();
          }

    render() {
      const auth= getFromStorage("isauthendicate"); 

        const ownerdata=this.props.owner.owner.map(owner=>
                {      
                  return{
                   name:owner.owner_name,
                     
                      action:<Update id={owner.id}/>
                      }
    
                });

        const data = {
            columns: [
                {
                    label: 'OwnerName',
                    field: 'name',
                   
                    width: 150
                },
               
               
                {
                    label: 'Action',
                    field: 'action',
                    
                    width: 200
                }


            ],
            rows: 
            ownerdata
                
        };


        return (
          <div>
          { auth ?
            <Page
            
            title="Owners"
          >
            <Container maxWidth={false}>
              <Toolbar data={"Owner"}/> 
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
          :""}</div>
        );
    }
}

const mapStateToProps = (state) => ({
    owner: state.owner,
    isauthendicate:state.auth.isauthendicate

})
export default connect(mapStateToProps, {getOwner})(ListOwner);
