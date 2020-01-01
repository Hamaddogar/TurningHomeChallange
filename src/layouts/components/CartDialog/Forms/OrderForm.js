import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, InputAdornment, withStyles } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import NameIcon from '@material-ui/icons/Person';
import {orderaction} from '../../../../store/actions/order/order';
import  store from '../../../../store/index'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import NewHeader from '../../../main/mainHeader/mainHeader';
import Footer from '../../Footer/index'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



  import styles from './styles';
  
class   Orderform extends Component {
    state = {
        email: '',
        uname:'',
        address:'',
        phonenumber:'',
        user: {
            password: '',

        },
    }


    handleChangename=(event)=>{
        const uname = event.target.value;
        this.setState({ uname });
    }
    handleChangee = (event) => {
        const email = event.target.value;
        this.setState({ email });
    }
    handleChangeaddress = (event) => {
        const address = event.target.value;
        this.setState({ address });
    }
    handleChange = (event) => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }
    handleChangephonenumber = (event) => {
        const phonenumber = event.target.value;
        this.setState({ phonenumber });
    }
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    orderSubmit = (e) => {
    

     
     
        let uname = this.uname.value;
        let email = this.email.value;
        let phonenumber = this.phonenumber.value;
        let address = this.address.value;
        

         const orderdata= {uname,email,phonenumber,address}
          
          store.dispatch(orderaction(orderdata))

          this.props.history.push('/orderproduct')
          
//   let signup_data = {uname:uname,email:email,password:password}
      
//         var option = {
//             method: "POST",
//             body: JSON.stringify(signup_data),
//             headers: {
//                 "Content-Type": "application/json",
//             }

//         }
//         fetch("http://localhost:8080/api/orderForm", option)
//         .then((res) => { return res.json() })
//         .then((res) => {
//           if (res.success === true) {
//               console.log(res)
//             this.setState({
//               messagedisplay: " Success! Successfully you have  Sign Up ",
//               uname:'',
//               email:'',
//               user:{
//                 password:''
//               }
//             })
//             {
//               Alert.success(`${this.state.messagedisplay}`, {
//                 position: 'top',
//               })
//             }
//           }
//           else {
//             this.setState({
//                 messagedisplay:" Sorry! Your Email already Exit please use another Email"
//                })
//             {
//               Alert.error(`${this.state.messagedisplay}`, { 
//                   position: 'top',
//                 })
//               }
//           }
//         //   this.props.dispatch(signupAction(res))
//         })
//         .catch((error) => console.log(error))
    }
    render() {
        const { classes } = this.props;
        const { email } = this.state;
        const { user } = this.state;
        const { uname } = this.state;
        const { address } = this.state;
        const { phonenumber } = this.state;
      console.log(this.props.order.uname)
  
        return (

            <div>
                <NewHeader/>
                
            <div className="w-full flex flex-row justify-center">
             
                <ValidatorForm
                    ref="form"
                    onSubmit={this.orderSubmit}
                    onError={errors => console.log(errors)}
                    className="bg-white shadow-md rounded px-8 pt-6 mt-6 pb-8 mb-4"
                >
                    <Alert stack={{ limit: 1 }} />
                    <TextValidator
                        inputRef={(uname) => this.uname = uname}
                        onChange={this.handleChangename}

                        className="w-full mb-4"
                        type="text"
                        name="name"
                        label="Name"
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><NameIcon  /></InputAdornment>
                        }}
                        value={uname}
                        variant="outlined"
                        helperText=''
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextValidator
                        inputRef={(email) => this.email = email}
                        className="w-full mb-4"
                        id="outlined-email-input"
                        label="Email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><EmailIcon  /></InputAdornment>
                        }}
                        onChange={this.handleChangee}
                        name="email"
                        value={email}
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                    />
                     <TextValidator
                        inputRef={(address) => this.address = address}
                        onChange={this.handleChangeaddress}

                        className="w-full mb-4"
                        type="text"
                        name="address"
                        label="address"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">< LocationOnIcon/></InputAdornment>
                        }}
                        value={address}
                        variant="outlined"
                        helperText=''
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextValidator
                        inputRef={(phonenumber) => this.phonenumber = phonenumber}
                        onChange={this.handleChangephonenumber}

                        className="w-full mb-4"
                        type="number"
                        name="phone Numver"
                        label="Phonr Number"
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><PhoneAndroidIcon /></InputAdornment>
                        }}
                        value={phonenumber}
                        variant="outlined"
                        helperText=''
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                       <center> 
                    <Button
                      variant="contained"
           
                      color="primary"
                      type="submit"
                      aria-label="LOG IN"
                      value="legacy"
                      id="btnFormRegister">   
                     
                        submit Info
                        </Button>
                    </center>

                </ValidatorForm>
               
            </div>
            <Footer/>
            </div>
        );
    }
}
function mapStateToProps({ loginreducers ,orderreducers}) {
    return {
      login: loginreducers,
      order:orderreducers
    }
  }
  
  export default withStyles(styles)(connect(mapStateToProps)(Orderform));
  
  


