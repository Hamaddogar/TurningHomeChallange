import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import styles from './styles';
import UserProduct from '../UserProduct/UserProduct';
import AddProduct from '../AddProduct/AddproductAlert';




class Profile extends React.Component {
  state = {
    loading: true
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false })
    }, 4000)


  }
  logout = () => {
    var option = {

      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      }


    }
    fetch("http://localhost:8080/logout", option)
      .then((response) => {
        console.log(response);
        if (response) {

          this.props.history.push("/");
        }


      })

  }

  render() {
    const { classes } = this.props;


    console.log(this.props.open)
    if (this.state.loading) {
      return <div>loading......</div>

    }
    else {

      return (

        <div>

          <div class="container">
            <div class="row profile">
              <div class="col-md-3">
                <div class="profile-sidebar">

                  <div class="profile-userpic">
                    &nbsp;		&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	<img src="https://i0.wp.com/zblogged.com/wp-content/uploads/2019/02/FakeDP.jpeg?resize=567%2C580&ssl=1" class="img-responsive" alt="" />
                  </div>

                  <div class="profile-usertitle">
                    <div class="profile-usertitle-name">
                      {this.props.login.uname}

                    </div>
                    <div class="profile-usertitle-job">
                      {this.props.login.email}
                    </div>
                  </div>

                  <div class="profile-userbuttons">
                    <button type="button" class="btn btn-success btn-sm" onClick={this.logout}>Logout</button>
                    <br/>   <br/>

                   <AddProduct/>
                  </div>

                  <div class="profile-usermenu">
                    <ul class="nav">
                      <li class="active">
                        <a href="#">
                          <i class="glyphicon glyphicon-home"></i>
                          Overview </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="glyphicon glyphicon-user"></i>
                          Account Settings </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          <i class="glyphicon glyphicon-ok"></i>
                          Tasks </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="glyphicon glyphicon-flag"></i>
                          Help </a>
                      </li>
                    </ul>
                  </div>


                  <div class="portlet light bordered">

                    <div class="row list-separated profile-stat">
                      <div class="col-md-4 col-sm-4 col-xs-6">
                        <div class="uppercase profile-stat-title"> 37 </div>
                        <div class="uppercase profile-stat-text"> Projects </div>
                      </div>
                      <div class="col-md-4 col-sm-4 col-xs-6">
                        <div class="uppercase profile-stat-title"> 51 </div>
                        <div class="uppercase profile-stat-text"> Tasks </div>
                      </div>
                      <div class="col-md-4 col-sm-4 col-xs-6">
                        <div class="uppercase profile-stat-title"> 61 </div>
                        <div class="uppercase profile-stat-text"> Uploads </div>
                      </div>
                    </div>

                    <div>

                      <h4 class="profile-desc-title">About </h4>
                      <span class="profile-desc-text"> </span>
                      <div class="margin-top-20 profile-desc-link">
                        <i class="fa fa-globe"></i>

                        <a href="https://www.apollowebstudio.com"></a>
                      </div>
                      <div class="margin-top-20 profile-desc-link">
                        <i class="fa fa-twitter"></i>
                        <a href="https://www.twitter.com/jasondavisfl/"> {this.props.login.uname}</a>
                      </div>
                      <div class="margin-top-20 profile-desc-link">
                        <i class="fa fa-facebook"></i>
                        <a href="https://www.facebook.com/"> {this.props.login.uname}</a>
                      </div></div></div>



                </div>
              </div>
              <div class="col-md-9">
                <div class="profile-content">
                <UserProduct/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )

    }



  }
}

function mapStateToProps({ loginreducers }) {
  return {
    login: loginreducers
  }
}

export default withStyles(styles)(connect(mapStateToProps)(Profile));

