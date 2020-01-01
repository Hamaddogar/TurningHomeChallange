import React from 'react';
import {withRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config'
import {withStyles} from '@material-ui/core';
import {connect} from 'react-redux';
import Header from '../../components/Header';

import AppContext from '../../../AppContext';
import systemConfig from '../../../config/system';





    



class MainHeader extends React.Component {

    render() {
        const {children } = this.props;

        return (<AppContext.Consumer>
            {({routes}) => (
                <div>
                    <Header
                        color="dark"
                      
                        brand={systemConfig.appName}
                        fixed
                    />
                  
                  
                    
             

                </div>
            )}
        </AppContext.Consumer>)
    };
}


function mapStateToProps({products}) {
    return {
        products: products.all.data.rows,
    }
}

export default withStyles( {withTheme: true})(withRouter(connect(mapStateToProps)(MainHeader)));
