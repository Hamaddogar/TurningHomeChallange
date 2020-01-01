import React from "react";
import PropTypes from "prop-types";
import {withStyles, Link, Badge, Hidden} from '@material-ui/core';
import AppBar from "@material-ui/core/AppBar/index";
import Toolbar from "@material-ui/core/Toolbar/index";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import styles from './styles';
import './style.css';
import Button from "@material-ui/core/Button";
import * as alertActions from "../../../../store/actions/alerts";
 import Profile from './../../.././../components/UserProfile/userProfile'

const links = [{
    title: 'Daily Deals',
    link: '/'
}, {
    title: 'Sell',
    link: '/'
}, {
    title: 'Help & Contact',
    link: '/'
}];

class TopBar extends React.Component {

    render() {
 console.log(this.props.login.length)
        const {
            classes,
        } = this.props;

        return (
        
                <Toolbar className={classes.toolbar}>
                   
                   <div className={classes.linksContainer}>
                            {
                                links.map((item, index) => (
                                    <Button key={index} classes={{root: classes.button}}>
                                        <Link to={item.link} className={classes.navLink}>
                                            {item.title}
                                        </Link>
                                    </Button>
                                ))
                            }
                           
                        </div>
                  
                  <div className="movetocenter">
                   <div   className={classes.authText + ' ' + classes.divTopBar }>

                        {this.props.login.length!=0?<div><span>Hi!</span>{this.props.login.uname} <Link to="/Profile">
                              
                            </Link></div>:<div> <span>Hi!</span>
                            <Link onClick={() => {
                              this.props.showAuth(false)
                              }} className={classes.authLink} id="btnSignIn" style={{color: 'red'}}>
                              Sign in
                            </Link>
                            <span>or</span>
                            <Link onClick={() => {
                              this.props.showAuth(true)
                              }} className={classes.authLink} id="btnRegister" style={{color: 'red'}}>
                              Register
                          </Link></div>}
                           
                    </div>
                    </div>
                </Toolbar>
       
        );
    }
}

TopBar.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showCart: alertActions.showCart,
        showAuth: alertActions.showAuth
    }, dispatch);
}
function mapStateToProps({ loginreducers }) {
    return {
      login: loginreducers
    }
  }


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(TopBar));
