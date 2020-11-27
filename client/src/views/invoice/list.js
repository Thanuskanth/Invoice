import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { MDBDataTableV5 } from 'mdbreact';

import { getinvoice } from '../../actions/invoiceacttion';
import { Card, CardContent, Box, Container } from '@material-ui/core';
import Page from 'src/components/Page';
// import Toolbar from './Toolbar';
// import Update from './update';
import{ getFromStorage,setInStorage} from "../../storage/index"

class ListItem extends Component {
  componentDidMount() {
    this.props.getinvoice();
  }
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
  render() {
    const auth= getFromStorage("isauthendicate"); 

    const itemdata = this.props.invoice.map(invoice => {
      return {
        id: invoice.id,
        program: invoice.program,
        package: invoice.package,
        name: invoice.customer_name,
        date:this.convert(invoice.createdAt) 


        // action:<Update id={item.id}/>
      }

    });

    const data = {
      columns: [
        {
          label: 'InvoiceID',
          field: 'id',

          width: 370
        },
        {
          label: 'Program',
          field: 'program',

          width: 370
        },
        {
          label: 'Package',
          field: 'package',

          width: 270
        },

        {
          label: 'CustomerName',
          field: 'name',

          width: 100
        },
        {
          label: 'Date',
          field: 'date',

          width: 100
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
        
        title="Invoice"
      >
        <Container maxWidth={false}>
          {/* <Toolbar data={"Invoice"}/>  */}
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
  invoice: state.invoice.invoice,

})
export default connect(mapStateToProps, { getinvoice })(ListItem);
