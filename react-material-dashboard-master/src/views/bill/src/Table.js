import React from 'react';
import GenerateRows from './GenerateRows';
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { getItem } from '../../../actions/itemaction'
import { addinvoicedec, adddisc, } from '../../../actions/itemdescription'
import { deletecurent } from '../../../actions/invoiceacttion'
import { getpropac } from '../../../actions/program_package'
import { connect } from 'react-redux';
import { ImTab } from 'react-icons/im';
import { getinvoice, updateinvoice } from '../../../actions/invoiceacttion'
import { ThreeSixtySharp } from '@material-ui/icons';
import { removeFromStorage, setInStorage, getFromStorage } from "../../../storage/index"

class Table extends React.PureComponent {
  componentDidMount() {
    
   
    this.props.getItem();
    this.props.getpropac();
    this.ongetAmount()
  

  }



  getRowList = () => {
    const rows = {
      id: 1,
      item: '',
      detail: 20,
      amount: 0,
      count: 1,
      total_amo: 0
    };
    if (rows) {
      try {
        return JSON.parse(rows);
      } catch (err) {
        console.error(err);
        return [];
      }
    }
    return [];
  }

  state = {
    rows: this.getRowList(),
    showGenerateRowsModal: false,
    num: 1,
    item: "",
    detail: "",
    count: 1,
    amount: 0,
    package_detail: "",
    pac_amm: 0,
    isprint: true,
    savebut:""
  

  }

  onSubmitinvoicedec = (e) => {
    
    e.preventDefault();
    // console.log("this.state.role", this.state.role)

    const data=  this.state.rows.map(row => {
      return   {
        invoice: this.props.curentinvoice.id,
        description: row.item + "-" + row.detail,
        amount: row.amount,
        count: row.count,
      }

    })
    const val={
      invoice: this.props.curentinvoice.id,
      description: this.props.curentinvoice.program + "-" + this.props.curentinvoice.package,
      amount: this.state.pac_amm,
      count: 1,
    }
    this.props.addinvoicedec(val);

    data.map(row => {
     
      this.props.addinvoicedec(row);

    })
    const total=[...data,val]

    this.props.deletecurent();
    const invoice = this.props.curentinvoice;
    invoice.total = this.getTotal();
    console.log(invoice, "invoiceinvoiceinvoice")
    this.props.updateinvoice(invoice); 
    setInStorage("items", total);
    setInStorage("program",invoice);

    this.setState({
      isprint: false,
      savebut:"none"
    

    })
    // this.updateRows( this.state.rows);
    


  }

  onChangeRowName = (event, aKey) => {
    const rows = this.state.rows.map((row) => {
      if (row.key === aKey) {
        return {
          ...row,
          name: event.currentTarget.textContent
        }
      }
      return row;
    });
    this.updateRows(rows);
  }
  ongetAmount() {
    this.props.program_package.filter((obj => obj.program == this.props.curentinvoice.program && obj.pac == this.props.curentinvoice.package)).map(x => {
      this.setState({
        pac_amm: x.amount
      })
    })
  }

  onChangeamo = (e) => {
    // alert((e.target.value))
    var newData = this.state.rows.map(el => {
      if (el.id == e.target.id)
        return Object.assign(el, { total_amo: parseInt(e.target.value) })
      return el
    });
    this.setState({ rows: newData });
    console.log(this.state.rows, "stateroes")

  }
  onChangeRowPrice(id) {
    const item_data = this.props.item.map(item => {
      return {

        program: item.item_name,
        pac: item.detail,
        amount: item.amount,

      }

    })
    const finaldata = this.props.program_package.concat(item_data)
    const dat = this.state.rows.find(x => x.id == id)
    if (finaldata.filter((obj => obj.program == dat.item && obj.pac == dat.detail)).length == 0) {
      var newData = this.state.rows.map(el => {
        if (el.id == id)
          return Object.assign(el, { amount: 0, total_amo: 0 })
        return el
      });
      this.setState({ rows: newData });
    }
    else {
      finaldata.filter((obj => obj.program == dat.item && obj.pac == dat.detail)).map(data => {
        var newData = this.state.rows.map(el => {
          if (el.id == id)
            return Object.assign(el, { amount: data.amount, total_amo: data.amount })
          return el
        });
        this.setState({ rows: newData });

      })

    }



  }

  onSelectprice = (e) => {

    return this.props.program_package.filter((obj => obj.program == e.target.id && obj.pac == e.target.value)).map(x => {

      return x.amount
    })

  }
  onSelectitem = (e) => {


    this.state.rows.filter(x => x.id == e.target.id).map(x => { x.item = e.target.value })
    console.log(this.state.rows)
    this.onChangeRowPrice(e.target.id)
  }
  onSelectdiscription = (e) => {
    // alert("des")
    this.state.rows.filter(
      x => x.id == e.target.id

    ).map(
      x => { x.detail = e.target.value })
    console.log(this.state.rows)
    this.onChangeRowPrice(e.target.id)

  }
  onSelectqty = (e) => {

    var newData = this.state.rows.map(el => {
      if (el.id == e.target.id)


        return Object.assign(el, { total_amo: (e.target.value) * (el.amount) })
      return el
    });
    this.setState({ rows: newData });
    // console.log(newData,"e target")

    //    
  }

  onSelectamount = (e) => {
    this.state.rows.filter(
      x => x.amount == e.target.id

    ).map(
      x => { x.item = e.target.value })
  }
  getRows = () => {
    return this.state.rows.map((row) => {
      return (<div>
        <tr class="d-flex ">
          <td class=" col-7">
            <div class="row ">
              <div class=" col-5">
                <select class="custom-select" required id={row.id} value={row.item} onChange={this.onSelectitem}  >
                <option >none</option>

                  {this.props.program_package.map((item) => (
                    <option value={item.program}>{item.program}</option>
                  )
                  )
                  }
                  {this.props.item.map((item) => (
                    <option value={item.item_name}   >{item.item_name}</option>
                  )
                  )
                  }

                </select>
              </div>
              <div class=" col-5">

                <select class="custom-select" required id={row.id} value={row.detail} onChange={this.onSelectdiscription}>
                <option >none</option>


                  {this.props.program_package.map((item) => (
                    <option value={item.pac}>{item.pac}</option>
                  )
                  )
                  }
                  {this.props.item.map((item) => (
                    <option value={item.detail}>{item.detail}</option>
                  )
                  )
                  }
                </select>
              </div>
            </div>


          </td>
          <td class=" col-2">
            <div class="form-group  ">

              <input type="number" required class="form-control " style={{textAlign:"right"}} defaultValue={1} onChange={this.onSelectqty} id={row.id} aria-describedby="emailHelp" />
            </div>
            {/* <p
              id={row.id}
              title="name"
              contentEditable
              onBlur={(event) => this.onSelectqty('toName', event)}
            >
              0
          </p> */}

          </td>

          <td class=" col-3">

            {/* <div
              style={{paddingTop:10 ,float:"right"}}
              id={row.id}
             
            // onBlur={ this.onChangeRowPrice(row.id)}
            >

              {this.state.rows.find(x => x.id == row.id).total_amo.toFixed(2)}

            </div> */}
            <div class="form-group  ">

              <input type="number" class="form-control " style={{textAlign:"right"}} value={(this.state.rows.find(x => x.id == row.id).total_amo)} onChange={this.onChangeamo} id={row.id} />
            </div>

            <div className='controls'>
              <AiOutlineClose
                 display={this.state.savebut}

                color="red"
                onClick={() => this.removeRow(row.id)} />
            </div>
          </td>
        </tr>

      </div>
      );
    });
  }

  addRow = () => {
    const rows = [
      ...this.state.rows,
      {
        id: this.state.num,
        item: 'Daily work',
        detail: 20,
        amount: 0,
        count: 1,
        total_amo: 0,
      }
    ]
    this.setState({ num: this.state.num + 1 })
    this.updateRows(rows);

  }

  getTotal = () => {
    const totalval = this.state.rows.reduce((count, { amount }) => count +(amount), 0);
    return parseInt(totalval + this.state.pac_amm).toFixed(2);
  }

  removeRow = (id) => {
    const rows = this.state.rows.filter(x => x.id != id);
this.setState({
  rows:rows
})  }

  removeRows = () => {
    this.updateRows([]);
  }

  toggleGenerateRowsModal = () => {
    this.setState({
      showGenerateRowsModal: !this.state.showGenerateRowsModal
    });
  }

  hideGenerateRowsModal = () => {
    this.setState({
      showGenerateRowsModal: false
    });
  }

  onGenerateRows = (rows) => {
    this.updateRows([
      ...this.state.rows,
      ...rows
    ]);
  }

  updateRows = (rows) => {
    this.setState({ rows });
    localStorage.setItem('rows', JSON.stringify(rows));
    this.props.onUpdateState();
  }

  render() {
 
    this.ongetAmount()

    console.log(this.state.pac_amm, "staterow")


    return (
      <div class="amount">
        <form onSubmit={this.onSubmitinvoicedec}>
          <table class=" table-bordered">
            <thead>
              <tr class="d-flex">
                <th class="col-7" >DESCRIPTION</th>
                <th class="col-2">QTY</th>
                <th class="col-3">AMOUNT</th>

              </tr>
            </thead>
            <tbody>
              <tr class="d-flex">

                <td class=" col-7">
                  <div class="row ">
                    <div class=" col-5">
                      {this.props.curentinvoice.program}

                    </div>
                    <div class=" col-5">
                      {this.props.curentinvoice.package}

                    </div>
                  </div>

                </td>
                <td class=" col-2"></td>
                <td class=" col-3 data">{this.state.pac_amm}</td>
              </tr>
              {this.getRows()}

            </tbody>
          </table>
          <div className='Total'>
            <div class="container">
              <div class="row">
                <div class="col pt-2">
                  <button
                    disabled={!this.props.iscurent}
                    type="button" class="btn btn-success left"
                    onClick={this.addRow}><AiOutlinePlus /></button>
                </div>
                <div class="col">

                </div>
                <div class="col  ">
                  <div class="row">
                    <div class="col-5 tableTotal">
                      Total
    </div>
                    <div class="col-7 totalamount">
                      <span className='total-number'>{(this.getTotal())}</span>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=''>

          </div>

          {this.state.showGenerateRowsModal && (
            <GenerateRows
              hideGenerateRowsModal={this.hideGenerateRowsModal}
              onGenerateRows={this.onGenerateRows}
              onUpdateState={this.props.onUpdateState}
            />
          )}
          <div class="row justify-content-between" style={{ marginTop: 30 }}>
            <div class="col-4">
              <button type="submit" class="btn btn-lg btn-primary btn-block print" disabled={!this.props.iscurent} >Save</button>

            </div>
            <div class="col-4">
              <a href="/print"><button type="button" class="btn btn-lg btn-primary btn-block print" disabled={this.state.isprint} >print</button></a>

            </div>
          </div>

        </form>

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  item: state.item.item,
  iscurent: state.invoice.iscurent,
  curentinvoice: state.invoice.curentinvoice,
  curent: state.invoicedescription.curent,
  program_package: state.program_package.program_package,

  // isauthendicate:state.auth.isauthendicate

})
export default connect(mapStateToProps, { getpropac, getItem, addinvoicedec, updateinvoice, adddisc,deletecurent })(Table);


