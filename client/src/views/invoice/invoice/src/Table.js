import React from 'react';
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

import { header } from '../../../../actions/authaction';
import { getFromStorage,setInStorage } from "../../../../storage"
import axios from 'axios';

class Table extends React.PureComponent {
  componentDidMount() {

    // alert(this.props.id)
    // console.log(this.props.id, "table")


    axios.get('http://localhost:8080/description/' + this.props.id, header(getFromStorage("auth"))).then(res => {
      // console.log(this.state, "this from to")

      this.setState({

        des: res.data,


      })
      setInStorage("items", res.data);

    }

    )

  }

  state = {
    des: []


  }

  getTotal = () => {
    const totalval = this.state.des.reduce((count, { amount }) => count + amount, 0);
    return parseInt(totalval).toFixed(2);
    // return parseInt(totalval + this.state.pac_amm).toFixed(2);
  }

  render() {
    // console.log(this.state, "this from to")


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
              
              {this.state.des.map(data => {
                return(

                <tr class="d-flex">

                  <td class=" col-7">
                    <div class="row ">
                      <div class=" col-10" style={{textAlign:"left"}}>

                        {data.description}

                      </div>
                    </div>

                  </td>
                  <td class=" col-2 data">{data.count}</td>
                  <td class=" col-3 data">
                 
                    { (data.amount).toFixed(2)}</td>
                </tr>
                )

              })}


            </tbody>
          </table>
          <div className='Total'>
            <div class="container">
              <div class="row">
                <div class="col pt-2">

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


          <div class="row justify-content-between" style={{ marginTop: 30 }}>
            <div class="col-4">

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

export default (Table);


