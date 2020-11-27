import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { ImBin } from "react-icons/im";
import { RiBillLine } from "react-icons/ri";

import ViewDebit from '../../debit_note';
import Debit from '../../debit_note/src/creaate';
import Swal from 'sweetalert2'
import { getinvoicedec, getAinvoicedec } from '../../../actions/itemdescription';
import { getdebit  } from '../../../actions/debitaction';
import { removeFromStorage } from "../../../storage"
import { Pencil, X } from 'react-bootstrap-icons';

class UpdateCustomer extends Component {
  state = {
    modalInvoiceShow: false,
    modelshow: false,
    modelreceipt: false,
    modelreceiptdet: false,
    modeldebit: false,
    modeldebitdet: false
    

  }

  componentDidMount() {
    this.props.getinvoicedec()

  }
  ontoggleInvoice = () => {
    this.setState({
      modalInvoiceShow: !this.state.modalInvoiceShow
    })
  }
  ontoggleDebit = () => {
    this.setState({
      modeldebit: !this.state.modeldebit
    })
  }
  ontoggleDebitDet = () => {
    this.props.getdebit()
    this.setState({
      modeldebitdet: !this.state.modeldebitdet
    })
  }
  ontoggleInvoiceclose = () => {
    this.setState({
      modalInvoiceShow: !this.state.modalInvoiceShow
    })
    removeFromStorage("items");
    removeFromStorage("program");

  }
  ontogglereceiptdetail = () => {
    this.setState({
      modelreceiptdet: !this.state.modelreceiptdet
    })
  }
  ontoggle = () => {
    this.setState({
      modalshow: !this.state.modalshow
    })
  }
  ontogglereceipt = () => {
    this.setState({
      modelreceipt: !this.state.modelreceipt
    })
  }

  onDelete = (id) => {

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
          title: "You won't be able to revert this!",
          text: "",
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
            this.props.deleteCustomer(id);
          }
        })
      }
    })




  }
  render() {
    
    const { modeldebit, modeldebitdet } = this.state;
    return (

      <div >
        <RiBillLine color="blue" size={20} className="mr-3" onClick={this.ontoggleDebit} /> 
        <Pencil color="green" size={20} className="mr-3" onClick={this.ontoggleDebitDet} />

        <Modal
                    show={modeldebit}
                    dialogClassName="modal-90w"
                    size="xl"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton onClick={this.ontoggleDebit}>
                        <Modal.Title  id="example-custom-modal-styling-title">
              </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <ViewDebit id={this.props.id}/>
                  
                    </Modal.Body>

                </Modal>
                <Modal
                    show={modeldebitdet}
                    dialogClassName="modal-90w"
                    size="xl"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton onClick={this.ontoggleDebitDet}>
                        <Modal.Title  id="example-custom-modal-styling-title">
              </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Debit id={this.props.id}/>
                  
                    </Modal.Body>

                </Modal>

      </div>
    );
  }
}

export default connect(null, { getinvoicedec ,getdebit})(UpdateCustomer);



