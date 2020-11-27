import React, { Component, Fragment } from 'react';
import { Navbar, Container, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import "../../bill/src/FromTo.css"
import { connect } from 'react-redux';
import { getFromStorage, removeFromStorage, setInStorage } from "../../../storage"
import { Redirect } from 'react-router-dom'
import { NoPrint } from 'react-easy-print';

const today = new Date();

class NavBar extends Component {
    state = {
        debit: [],
        debitdet: [],
        visible: "",
        address: {},
        invoice: [],
        debit_total:0,
        dis:""
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    getTotal = () => {
        const totalval = this.state.des.reduce((count, { amount }) => count + amount, 0);
        return parseInt(totalval).toFixed(2);
    }
    convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
    }
    componentDidMount() {
        const add = getFromStorage("debit").invoice

        this.setState({
            debit: getFromStorage("debit").debit,
            invoice: getFromStorage("debit").invoice,
            debitdet: getFromStorage("debitdet"),
            debit_total: getFromStorage("debit_total"),
            address: JSON.parse(add.address)
        })

    }
    render() {
        console.log((this.state.address), "this.state")
        return (

<div>
   
            <div className="printviewdebit" style={{ height: 1400 ,display:this.state.dis}}>

                <div style={{ height: 625 }}>
                    <div className="row" >

                        <div className=" row col-6" style={{ paddingTop: 60, paddingLeft: 135,height: 160 }}>

                            <div className=" col-6 " style={{}}>

                                <div className="col-3"></div>
                                <div className="col-9" style={{height:25}}>  {this.state.invoice.customer_name} </div>
                                <div className="col-3"></div>
                                <div className="col-9"style={{height:25}} >   {this.state.invoice.nic} </div>
                                <div className="col-12"style={{height:25}}>   {this.state.invoice.phonenumber} </div>

                            </div>

                            <div className="col-6 " style={{ paddingTop: 20 }}>

                                <div className="col-12">   </div>
                                <div className="col-12" style={{height:20}}>   {this.state.address.no} </div>
                                <div className="col-12" style={{height:20}}>   {this.state.address.area} </div>
                                <div className="col-12" style={{height:20}}>   {this.state.address.city} </div>
                            </div>



                        </div>

                        <div className="col-6" style={{ paddingLeft: 60, paddingTop: 60, }} >
                            <div className="row fontd">
                                <div className="col-5"> <p style={{ textAlign: "" }} >DN-{this.state.debit.id} </p></div>
                                <div className="col-7"> <p className="" style={{ textAlign: "" }}> {this.convert(this.state.debit.createdAt)} </p></div>
                                <div className="col-5"> <p className="" style={{ textAlign: "", paddingTop: 15 }}>{this.state.invoice.id} </p></div>
                                <div className="col-7"> <p className="" style={{ textAlign: "", paddingTop: 15 }}>{this.state.debit.balance_due} </p></div>

                            </div>

                        </div>


                    </div>
                    <div  style={{ paddingLeft: 145, paddingTop: 20,height: 140 }} >
                        {this.state.debitdet.map(data => {
                            return (
                                <div className="row " style={{height:20}}>
                                    <div className="col-8 " >
                                        {data.description}
                                     </div>
                                    <div className="col-3" style={{ textAlign: "right", paddingRight: 70 }} >
                                        {parseInt(data.amount).toFixed(2)}
                                    </div>
                                    <div className="col-1" >
                                        
                                        </div>
                                </div>

                            )
                        })}

                    </div>

                    <div className="row " style={{}}>
                                    <div className="col-8 " >
                                       
                                     </div>
                                    <div className="col-3" style={{ textAlign: "right", paddingRight: 70 }} >
                                     {parseInt(this.state.debit_total).toFixed(2)}
                                    </div>
                                    <div className="col-1" >
                                        
                                        </div>
                                </div>
                </div>
                <div style={{  }}>
                    <div className="row" >

                        <div className=" row col-6" style={{ paddingTop: 60, paddingLeft: 135,height: 160 }}>

                            <div className=" col-6 " style={{}}>

                                <div className="col-3"></div>
                                <div className="col-9" style={{height:25}}>  {this.state.invoice.customer_name} </div>
                                <div className="col-3"></div>
                                <div className="col-9" style={{height:25}}>   {this.state.invoice.nic} </div>
                                <div className="col-12" style={{height:25}}>   {this.state.invoice.phonenumber} </div>

                            </div>

                            <div className="col-6 " style={{ paddingTop: 20 }}>

                                <div className="col-12">   </div>
                                <div className="col-12" style={{height:20}}>   {this.state.address.no} </div>
                                <div className="col-12" style={{height:20}}>   {this.state.address.area} </div>
                                <div className="col-12" style={{height:20}}>   {this.state.address.city} </div>
                            </div>



                        </div>

                        <div className="col-6" style={{ paddingLeft: 60, paddingTop: 60, }} >
                            <div className="row fontd">
                                <div className="col-5"> <p style={{ textAlign: "" }} >DN-{this.state.debit.id} </p></div>
                                <div className="col-7"> <p className="" style={{ textAlign: "" }}> {this.convert(this.state.debit.createdAt)} </p></div>
                                <div className="col-5"> <p className="" style={{ textAlign: "", paddingTop: 15 }}>{this.state.invoice.id} </p></div>
                                <div className="col-7"> <p className="" style={{ textAlign: "", paddingTop: 15 }}>{this.state.debit.balance_due} </p></div>

                            </div>

                        </div>


                    </div>
                    <div  style={{ paddingLeft: 145, paddingTop: 20,height: 140 }}  >
                        {this.state.debitdet.map(data => {
                            return (
                                <div className="row " style={{height:20}}>
                                    <div className="col-8 " >
                                        {data.description}
                                     </div>
                                    <div className="col-3" style={{ textAlign: "right", paddingRight: 70 }} >
                                        {parseInt(data.amount).toFixed(2)}
                                    </div>
                                    <div className="col-1" >
                                        
                                        </div>
                                </div>

                            )
                        })}

                    </div>
                    <div className="row " style={{}}>
                                    <div className="col-8 " >
                                       
                                     </div>
                                    <div className="col-3" style={{ textAlign: "right", paddingRight: 70 }} >
                                     {parseInt(this.state.debit_total).toFixed(2)}
                                    </div>
                                    <div className="col-1" >
                                        
                                        </div>
                                </div>
                </div>
                <button onClick={window.print(), window.onafterprint = function () {

                    window.location.replace("/app/invoice")
                    removeFromStorage("debit");
                    removeFromStorage("debitdet");
                    removeFromStorage("debit_total");
                 
                }}>tk</button>
                <div className="row font" style={{ paddingTop: 20 }}>
                    <div className="col-9"></div>
                    {/* <div className="col-3">{parseInt(this.state.item.total).toFixed(2)}</div> */}
                </div>


                
            </div>
            </div>
        )
    }
}
const mapstateToProps = (state) => ({
    auth: state.auth,
    curentinvoice: state.invoice.curentinvoice,
    curent: state.invoicedescription.curent,

})
export default connect(mapstateToProps, {})(NavBar);