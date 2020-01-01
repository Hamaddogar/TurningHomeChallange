import React, {Component} from 'react';
import {
    Paper,
    Dialog,
    DialogContent,
    withStyles,
    Fab
} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Cart from './Cart'
import * as Actions from '../../../store/actions/alerts';
import OrderForm from "./Forms/OrderForm";
import Close from '@material-ui/icons/Close';
import styles from './styles';
import {Link} from "react-router-dom"

function PaperComponent(props) {
    return (
        <Paper {...props} style={{width: "820px"}}/>
    );
}

class CartDialog extends Component {

    state = {
        open: false,
        activeStep: 0,
        completed: false
    };

    handleClose = () => {
        this.props.hideCart();
    };


    handleNext() {
        this.setState({
            activeStep: this.state.activeStep + 1
        })
    }

    handlePrevious() {
        if (this.state.activeStep > 0) {
            this.setState({
                activeStep: this.state.activeStep - 1
            })
        }
    }

    render() {
        const {classes} = this.props;
        const {activeStep} = this.state;


        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose.bind(this)}
                    PaperComponent={PaperComponent}
                    maxWidth="lg"
                    scroll="paper"
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogContent style={{overflow: 'hidden'}}>
                        <div className="flex">
                            <div className="w-3/5 sm-12">
                                <span className={classes.titleText}> items in Your Cart</span>
                            </div>
                            <div className="w-1/5 sm-12 flex justify-end">
                                <span className={classes.totalText} onClick={this.handleClose.bind(this)}> <span id="cartTotalPriceValue"></span></span>
                            </div>
                            <div className="w-1/5 sm-12 flex justify-end">
                                <Close onClick={this.handleClose.bind(this)} style={{cursor: 'pointer'}} />
                            </div>
                        </div>
                        <div className="w-full flex flex-grow flex-col" style={{height: "450px"}}>
                            { activeStep === 0 ? <Cart/> : <OrderForm />}
                        </div>
                        <div className="flex mb-4">
                            <div className="w-1/2">
                                <Fab color="primary"
                                     onClick={activeStep === 0 ? this.handleClose.bind(this) : this.handlePrevious.bind(this)}
                                     style={{borderRadius: 48, height: 48, width: 160 ,top:-42}}
                                     className={classes.cartButton}>
                                    <span
                                        className={classes.submitButtonText}>{activeStep === 0 ? 'Back to Shop' : 'Back'}</span></Fab>
                            </div>
                            <div className="w-1/2 flex justify-end">
                                <Fab color="primary"
                                     
                                     style={{borderRadius: 48, height: 48, width: 160 ,top:-42}}

                                     className={classes.cartButton}>
                                   
                                   <Link to="/orderform">   <span className={classes.submitButtonText} id="btnCheckout">Next</span></Link>
                                  
                                    </Fab>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        hideCart: Actions.hideCart,
        showAuth: Actions.showAuth,
    }, dispatch);
}

function mapStateToProps({alerts, cart, auth}) {
    return {
        open: alerts.cart.open,
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CartDialog));
