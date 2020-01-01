import React from "react";
import {withStyles, InputBase, Fab} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import EmailIcon from '@material-ui/icons/EmailOutlined';
import styles from './styles';

class SubscribeBar extends React.Component {



    subscripedsubmitt=(e)=>{
      e.preventDefault();
        let   subscriber= this.subscriber.value;
        

		var option = {
			method: "POST",
			body: JSON.stringify({ subscriber }),
			headers: {
				"Content-Type": "application/json",
			}

		}
        fetch("http://localhost:8080/api/subscriber",option)
        .then((res)=>{
    return(res.json())
        }).then((res)=>{
       console.log(res)
        })



    }


    render() {

        const {
            classes
        } = this.props;


        return (
            <div className={classes.subscribeBar}>
                <form   onSubmit={this.subscripedsubmitt}>
                    <div className={classes.toolbar}>
                        <div className={classes.mainText}>Subscribe for Shop News, Updates and Special Offers</div>
                        <div style={{flex: 1, flexGrow: 1}} />
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <EmailIcon/>
                            </div>
                            
                            <InputBase
                                placeholder="Your Email"
                                type="email"
                                                                   required={true}
                                    inputRef={(subscriber) => this.subscriber= subscriber}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            
                            />
                           
                        </div>
                        <Fab color="primary" size="small"  type="submit"className={classes.subscribeButton}><span className={classes.subscribeText}>Subscribe</span></Fab>
                    </div>
                    </form>
            </div>

        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}


export default withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(SubscribeBar));
