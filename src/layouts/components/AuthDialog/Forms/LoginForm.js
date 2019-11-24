import React, { Component } from 'react';
import { Button, InputAdornment, withStyles } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import styles from './styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';
import './styles.css';
import {loginaction} from '../../../../store/actions/login/loginaction';
import  store from '../../../../store/index';
import Profile from '../../../../components/UserProfile/userProfile';
import {withRouter} from 'react-router-dom';


class LoginForm extends Component {
    state = {
        loading: true,
        email: '',
        showPassword: false,
        invalidPasswordMsg: '',
        user: {
            password: '',

        },
    };
    handleChange = (event) => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    handleChangee = (event) => {
        const email = event.target.value;
        this.setState({ email });
    }
   
    loginform = (evt) => {
        evt.preventDefault();
        let email = this.email.value;
        let password = this.password.value;
        const login_object = { username: email, password: password }
        
        var option = {
            method: "POST",
            body: JSON.stringify(login_object),
            headers: {
                "Content-Type": "application/json",
            }
        }
        fetch("http://localhost:8080/api/loginUer", option)
            .then((res) => { return res.json() })
            .then((response) => {
                console.log(response);
                if (response) {
                    store.dispatch(loginaction(response));
                    this.props.history.push("/Profile")
                    
                    return;
                }
                else {
                    this.setState({
                        invalidPasswordMsg: 'invalid UserName/Password Pair'
                    })
                    {
                        Alert.error(`${this.state.invalidPasswordMsg}`, {
                            position: 'top',
                            effect: 'slide',
                        })
                    }
                }
             })
                
    }
    render() {
        const { classes } = this.props;
        const { email } = this.state;
        const { user } = this.state;
        return (
            <div className="w-full flex flex-row justify-center">
             <Alert stack={{limit: 1}} />
                  <Card className={classes.card}>
                    <CardHeader
                        className={classes.CardHeaders}
                        subheader='Become Our Family'
                    />
                    <CardContent className={classes.cardContents}>
                        <ValidatorForm
                            ref="form"
                            onSubmit={this.loginform}
                            onError={errors => console.log(errors)}
                        >      <div className={classes.root}>
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
                            </div>
                            <div className={classes.container}>
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
                            </div>
                            <div className="buttonsHolder">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className="w-full logInBtn"
                                    aria-label="LOG IN"
                                    value="legacy"
                                    id="btnFormSignIn"
                                >        Log In
                      </Button>
                            </div>
                        </ValidatorForm>
                     <div><Link to="/forgot">Forgot password?</Link></div>   

                        {/* <div className="socialButtonsHolder">
                            <div>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    className="w-full btnFacebook"
                                    aria-label="LOG IN"
                                    value="legacy"
                                >
                                    Login with Facebook
                          </Button>
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    className="w-full btnGoogle"
                                    aria-label="LOG IN"
                                    value="legacy"
                                    id="btnGoogle"
                                >
                                    Login with Google
                          </Button>
                            </div>
                        </div> */}
                    </CardContent>

                </Card>
            </div>
        );
    }
}

const loginform= withRouter(LoginForm);
export default withStyles(styles) (loginform);
