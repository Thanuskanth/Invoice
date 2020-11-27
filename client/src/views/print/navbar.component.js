import React, { Component, Fragment } from 'react';
import { Navbar, Container, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import "../bill/src/FromTo.css"
import { connect } from 'react-redux';
import { getFromStorage, removeFromStorage, setInStorage } from "../../storage"
import { Redirect } from 'react-router-dom'

const today = new Date();

class NavBar extends Component {
    state = {
        item: {},
        des: [],
        visible: "",
        address:{}
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
        const add= getFromStorage("program").address
        
        this.setState({
            item: getFromStorage("program"),
            des: getFromStorage("items"),
            address:JSON.parse(add)
        })

    }
    render() {
        console.log((this.state.address), "this.state")
        return (


            <div className="printviewtest" style={{ height: 1400 }}>
                <div className="row">
                    <div className="col-6" style={{ paddingTop: 250, paddingLeft: 160, height: 200 }}>

                        <div className="row fontd" style={{}}>
                            <div className="col-12"> {this.state.item.customer_name}<br />

                            </div>
                            <div className="col-5">
                                {this.state.item.nic}<br/>
                                {this.state.item.phonenumber}

                            </div>
                            <div className="col-7">
                                {(this.state.address.no)}<br/>
                                {this.state.address.area}<br/>
                                {this.state.address.city}<br/>


                            </div>
                        </div>



                    </div>

                    <div className="col-6" style={{ paddingLeft: 40 ,paddingTop:30 ,height:370}} >
                        <div className="row fontd">
                            <div className="col-5"> <p style={{ textAlign: "", marginTop: 110 }} >AK-{this.state.item.id} </p></div>
                            <div className="col-7"> <p className="" style={{ textAlign: "", marginTop: 110 }}> {this.convert(today)} </p></div>
                            <div className="col-12"> <p className="" style={{ textAlign: "", marginTop: 25 }}>{this.state.item.program} </p></div>
                            <div className="col-5"> <p style={{ textAlign: "", marginTop: 25 }} >{this.state.item.package} </p></div>
                            <div className="col-7"> <p className="" style={{ textAlign: "", marginTop: 25 }}> {this.convert(this.state.item.date)}</p></div>
                            <div className="col-10"> <p className="" style={{ textAlign: "", marginTop: 22 }}>{this.state.item.order_id} </p></div>
                            <div className="col-2"> <p className="" style={{ textAlign: "", marginTop: 22 }}> </p></div>

                        </div>

                    </div>


                </div>

                <div className="font"  style={{ paddingTop: 60, paddingLeft: 150, height: 450 }}>
                    {/* <div className=" row col-12" >
                           <div className="col-10" >{this.state.item.program} {this.state.item.package}</div>
                        <div className="col-2" style={{ paddingRight: 50, textAlign: "right" }}>{parseInt(this.state.item.total).toFixed(2)}</div>
                    </div> */}
                   
                    {this.state.des.map(data => {
                        return (
                            // <div className=" row col-12" >   <div className="col-10">{data.detail}</div>
                            //     <div className="col-2" style={{ paddingRight: 50, textAlign: "right" }}>{parseInt(data.amount).toFixed(2)}</div>
                            // </div>

                            <div className=" row " >
                                <div className="col-5" >{data.description}    </div>
                                <div className="col-1" >{data.count}</div>
                                <div className="col-4" style={{ textAlign: "right" }}>{parseInt(data.amount).toFixed(2)}</div>
                                <div className="col-2" ></div>
                            </div>
                        )
                    })}


                </div>

                <button onClick={window.print(), window.onafterprint = function () {
                            
                    removeFromStorage("items");
                    removeFromStorage("program");
                    window.location.replace("/app/invoice")
                }}>tk</button>
                <div className="row font" style={{  paddingTop:20 }}>
                    <div className="col-9"></div>
                    <div className="col-3">{parseInt(this.state.item.total).toFixed(2)}</div>
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