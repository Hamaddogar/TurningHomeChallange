import React, { Component } from 'react';
import { Button, InputAdornment, withStyles } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import NameIcon from '@material-ui/icons/Person';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import styles from './styles';

class RegisterForm extends Component {
    state = {
        email: '',
        uname:'',
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
    handleChange = (event) => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    registerSubmit = (e) => {
        e.preventDefault();
        let uname = this.uname.value;
        let email = this.email.value;
        let password = this.password.value;
  let signup_data = {uname:uname,email:email,password:password}
      
        var option = {
            method: "POST",
            body: JSON.stringify(signup_data),
            headers: {
                "Content-Type": "application/json",
            }

        }
        fetch("http://localhost:8080/api/signup", option)
        .then((res) => { return res.json() })
        .then((res) => {
          if (res.success === true) {
              console.log(res)
            this.setState({
              messagedisplay: " Success! Successfully you have  Sign Up ",
              uname:'',
              email:'',
              user:{
                password:''
              }
            })
            {
              Alert.success(`${this.state.messagedisplay}`, {
                position: 'top',
              })
            }
          }
          else {
            this.setState({
                messagedisplay:" Sorry! Your Email already Exit please use another Email"
               })
            {
              Alert.error(`${this.state.messagedisplay}`, { 
                  position: 'top',
                })
              }
          }
        //   this.props.dispatch(signupAction(res))
        })
        .catch((error) => console.log(error))
    }
    render() {
        const { classes } = this.props;
        const { email } = this.state;
        const { user } = this.state;
        const { uname } = this.state;
        return (
            <div className="w-full flex flex-row justify-center">
             
                <ValidatorForm
                    ref="form"
                    onSubmit={this.registerSubmit}
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
                            endAdornment: <InputAdornment position="end"><NameIcon className="text-20" color="action" /></InputAdornment>
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
                            endAdornment: <InputAdornment position="end"><EmailIcon className="text-20" color="action" /></InputAdornment>
                        }}
                        onChange={this.handleChangee}
                        name="email"
                        value={email}
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                    />
                    <TextValidator
                        inputRef={(password) => this.password = password}
                        id="outlined-adornment-password"
                        className="w-full mb-4"

                        variant="outlined"
                        type={this.state.showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                    >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        label="Password"
                        onChange={this.handleChange}
                        name="password"
                        validators={['required']}
                        errorMessages={['this field is required']}
                        value={user.password}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto normal-case"
                        aria-label="LOG IN"
                        value="legacy"
                        id="btnFormRegister"
                    >
                        Register
                    </Button>

                </ValidatorForm>
               
            </div>
        );
    }
}


export default withStyles(styles)(RegisterForm);
