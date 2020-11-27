import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import {getProgram} from '../../actions/programaction';
import { Card ,CardContent,Box,Container} from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import Update from './update';
import{ getFromStorage,setInStorage} from "../../storage/index"

class ListProgram extends Component {
componentDidMount(){
            this.props.getProgram();
          }

    render() {
      const auth= getFromStorage("isauthendicate"); 

        const programdata=this.props.program.program.map(program=>
                {      
                  return{
                    name:program.program_name,
                      
                      
                      action:<Update id={program.id}/>
                      }
    
                });

        const data = {
            columns: [
                {
                    label: 'ProgramName',
                    field: 'name',
                   
                    width: 1000
                },
                
                {
                    label: 'Action',
                    field: 'action',
                    
                    width: 200
                }


            ],
            rows: 
            programdata
                
        };


        return (
          <div>
          {auth ?
           
            <Page
            
            title="Program"
          >
            <Container maxWidth={false}>
              <Toolbar data={"Program"}/> 
              <Box mt={1} >
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
  program: state.program,
    isauthendicate:state.auth.isauthendicate

})
export default connect(mapStateToProps, {getProgram})(ListProgram);
