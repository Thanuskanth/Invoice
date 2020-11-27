import React ,{ useRef }from 'react';
import './Table.css';
import Table from './Table';
import FromTo from './FromTo';

import { Card ,CardContent,Box,Container} from '@material-ui/core';
import { connect } from 'react-redux';
import Page from "../../print/navbar.component";
import { PDFViewer } from '@react-pdf/renderer';
import PrintProvider, { NoPrint } from 'react-easy-print';
import{ getFromStorage,setInStorage} from "../../../storage/index"

import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { useReactToPrint } from 'react-to-print';

import Print  from '../../print/navbar.component';


class App extends React.PureComponent {

  state = {
    startdate:new Date(),
        modalShow: false,
        modalInvoiceShow :false,
        customer_name: "",
        nic: "",
        address: "",
        phonenumber: "",
        program:"none",
          package:"none",
          date:new Date(),
          amount:"none",
          owner:"none"
  }

  updateTitle = (event) => {
    const title = event.target.textContent;
    this.setState({title});
    localStorage.setItem('title', title);
    this.onUpdateState();
  }
 
  onUpdateState = () => {
    this.setState({saved: 0})
    setTimeout(() => {
      this.setState({
        saved: Date.now() + 2 * 1000
      })
      setTimeout(() => {
        if (Date.now() > this.state.saved) {
          this.setState({ saved: 0 })
        }
      }, 2500)
    }, 300) 
  }

  render() {
    const auth= getFromStorage("isauthendicate"); 

    return (

      <div>
      { auth ?
      
      <div  className="container">
        
          <NoPrint>
        <div className='App'>
      
          <div className='page mb-4'>
            
            <div className="bill">
            <FromTo onUpdateState={this.onUpdateState} />
            {/* <Invoice onUpdateState={this.onUpdateState} /> */}
            <Table onUpdateState={this.onUpdateState} />
            </div>
          </div>
          <div  class=" print">
         {/* <a href="/print"> <button type="button" class="btn btn-lg btn-primary print" >Print</button></a> */}
          </div>
          {/* <img className='print' src={printer} onClick={() => window.print()} alt='print' /> */}
        </div>
        {/* {!!this.state.saved && (<img className='save' src={save} alt='save' />)} */}

        </NoPrint>
      
        
        
      
     
      
      </div>
     
     :""}</div>
     
    );
  }
}

const mapStateToProps = (state) => ({

})
export default connect(mapStateToProps, {})(App);



