import React, { Component, Fragment } from 'react';
import { Navbar, Container, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import Register from './register.component';
import Logout from './logout.component';
import Login from './login.component';
import { connect } from 'react-redux';
import{ getFromStorage,setInStorage} from "../../../storage/index"
import { red } from '@material-ui/core/colors';
import image from "../../bill/src/logo.PNG"

class NavBar extends Component {
    state = {
        isOpen: false,
        user:{}
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    componentDidMount(){
        if(getFromStorage("auth") !=null){
            this.setState({
                user:getFromStorage("auth").user
            })
        }
       
    }
    render() {
        const {  isauthendicate } = this.props.auth;

       const auth= getFromStorage("isauthendicate"); 

        console.log(this.state.user,"this state")
        const authlink =
            (<Fragment>

                {auth ? <span className="navbar-text mr-3"><strong>welcome {getFromStorage("auth").user.username}</strong></span> : ""}
                <NavItem >
                    <Logout />
                </NavItem>
            </Fragment>)
        const guestlink =
            (<Fragment>
                <NavItem >
                    <Register />

                </NavItem>
                <NavItem className="mr-4" >
                    <Login />

                </NavItem>
            </Fragment>)

        return (

            <div>
            
<Navbar color="dark mynav" dark expand="sm" className="mb-5" style={{position:"fixed"}}>
    <NavbarBrand href={'/'}><img src={image} width="100%" height="75%"  /></NavbarBrand>
    <NavbarToggler onClick={this.toggle} />
    <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar  >

            {auth ? authlink : guestlink}
        </Nav>
    </Collapse>
</Navbar>

            </div>

        )
    }
}
const mapstateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapstateToProps, {})(NavBar);
