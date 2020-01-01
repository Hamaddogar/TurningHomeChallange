import React from "react";
import PropTypes from "prop-types";
import {withStyles, InputBase, Badge, Drawer, Hidden, IconButton, Button, Toolbar, AppBar} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/icons/Menu';
import {
    NavDropdown,
} from 'react-bootstrap';
import { Link }  from 'react-router-dom';
import styles from './styles';
import store from '../../../../store/index';
import SearchDispaly from  '../../../components/SearchDisplay/index'
import * as alertActions from "../../../../store/actions/alerts";
import {searchaction} from '../../../../store/actions/search/searchaction';
import './style.css';
import {withRouter} from 'react-router-dom';
import withWidth from "@material-ui/core/withWidth/withWidth";
import Searcherror from '../../../../components/ErrorMessage/searchError'
import Home from  '../../.././../screens/Home/index'

class NavBar extends React.Component {

    state = {
        mobileOpen: false,
        cartitem:[this.props.cartproduct],
        cartData:null,
        loading:false
    };

    handleDrawerToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    }

 componentDidMount (){
      window.addEventListener('scroll', (event) => {
        const scrollpos = window.scrollY;
         if(scrollpos > 10){
           this.setState({
              activeClass: 'is-scrolled'
           })
         }else{
             this.setState({
                activeClass: 'is-ontop'
             })
         }
      });
      setTimeout(() => {
           this.setState({
               loading:true
           })
      }, 1000);
      
      fetch("http://localhost:8080/api/cartshow")
              .then(response => response.json())
              .then((res) => {
                  this.setState({
                      cartData:res.data
                  })
                
                
              })
              .catch((error) => console.log(error))
   
     
        
          
            
    }
    SearchProduct=(e)=>{
     e.preventDefault()
     debugger;

     let search = this.search.value;
    
     var option = {
        method: "POST",
        body: JSON.stringify({search}),
        headers: {
            "Content-Type": "application/json",
        }
  
    }
    fetch("http://localhost:8080/searchdata", option)
        .then((res) => {  return res.json() })
        .then((res) => {
          console.log()
          console.log(res)
          if(res.data.length!==0)
          {
           
  
            store.dispatch(searchaction(res));
            
            this.props.history.push('/SearchDispaly') ;
           
      
          }
           else{
            this.props.history.push('/searcherror') ;
           }
  
       })
  
  
        // .catch((error) => console.log(error))
  }
 
    

    render() {

       
        
        
     
             const {
                 classes,
                 brand
                } = this.props;
                
                const brandComponent =
                <Link to={'/'} className={classes.brand}>
          {brand}</Link>
 
        return (
            <div>
                <AppBar className={`mainHeaderHolder ${classes.navBar + ' ' + this.state.activeClass}`}>
                
                    <Toolbar className={classes.toolbar}>
                        <div className={classes.flex}>
                            {brandComponent}
                        </div>
                   
                        <Hidden mdDown>
                        <div className={`departments categories ${classes.linksContainer}`}>
                            <NavDropdown
                                title='Regional'
                                className="department navDropdown"
                            >
                                <NavDropdown.Item
                                    onClick={() => {}}
                                    className="category"
                                >
                                  <Link to={`/Home`} className={classes.navDrawerLink} >
                                      Home
                                    </Link>
                                </NavDropdown.Item>

                                <NavDropdown.Item
                                    onClick={() => {}}
                                    className="category"
                                >
                                    Italian
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    onClick={() => {}}
                                    className="category"
                                >
                                    Irish
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown
                                title='Nature'
                                className="department navDropdown"
                            >
                                <NavDropdown.Item
                                    onClick={() => {}}
                                    className="category"
                                >
                                    Animal
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    onClick={() => {}}
                                >
                                    Flower
                                </NavDropdown.Item>

                            </NavDropdown>

                            <NavDropdown
                                title='Seasonal'
                                className="department navDropdown"
                            >
                                <NavDropdown.Item
                                    onClick={() => {}}
                                    className="category"
                                >
                                    Wedding
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    onClick={() => {}}
                                    className="category"
                                >
                                    Valentine's
                                </NavDropdown.Item>

                            </NavDropdown>
                        </div>
                        </Hidden>
                       
                        <form onSubmit={this.SearchProduct}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                            


                                placeholder="Search…"
                                inputRef={(search) => this.search = search}
                                name="search"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                        </form>
                       
                        <Hidden mdDown>
                            <div className={classes.iconContainer} onClick={() => {this.props.showCart()}}>
                                <Badge classes={{
                                    badge: classes.badge
                                }}
                                    id="menuCartQuantity"
                                    // badgeContent={  this.state.cartData.filter(( item,index)=>{ return item.loginuser===this.props.loginUser._id}).length!=0?this.state.cartData.filter(( item,index)=>{ return item.loginuser===this.props.loginUser._id}).length:null
                                         badgeContent={5}
                                // }
                                    color="danger">
                                    <img alt="Shopping Cart Icon" src="/assets/icons/shopping-cart-white.svg"/>
                                </Badge>
                            </div>
                        </Hidden>
                        <Hidden mdUp>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerToggle.bind(this)}
                            >
                                <Menu />
                            </IconButton>
                        </Hidden>
                    </Toolbar>
                    <Hidden mdUp implementation="css">
                        <Drawer
                            variant="temporary"
                            anchor={"right"}
                            className="py-12"
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle.bind(this)}
                        >
                        <Button classes={{
                                    root: classes.button
                                }}>
                                    <Link to={'`/Home'} className={classes.navDrawerLink} >
                                        Regional
                                    </Link>
                                   
                                </Button>
                                <Button classes={{
                                    root: classes.button
                                }}>
                                    <Link to={`/department/1`} className={classes.navDrawerLink} >
                                        Wedding
                                    </Link>
                                   
                                </Button>
                        </Drawer>
                    </Hidden>
                </AppBar>
            </div>

        );
    
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf([
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "transparent",
        "white",
        "rose",
        "dark"
    ]),
    brand: PropTypes.string.isRequired,
    fixed: PropTypes.bool,
    absolute: PropTypes.bool
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showCart: alertActions.showCart
    }, dispatch);
}
function mapStateToProps({ cartreducers,loginreducers }) {
    debugger;
    return {
      cartproduct: cartreducers,
      loginUser:loginreducers
  
    }
  }
  
const navBar= withRouter(NavBar);
export default withWidth()(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps,mapDispatchToProps)(navBar))));

