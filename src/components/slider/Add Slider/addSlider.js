import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import '../../UserProfile/styles.css'
import styles from '../../UserProduct/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import ImageUploader from 'react-images-upload';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import { connect } from 'react-redux';






class  Addslider extends React.Component {

  state = {
    price: '',
    name:'',
    discounted_price:'',
    messagedisplay:''
   
}
  
  constructor(props) {
    super(props);
     this.state = { pictures: [] };
     this.onDrop = this.onDrop.bind(this);
}
onDrop(picture) {
  this.setState({
      pictures: this.state.pictures.concat(picture),
  });
}
handleChangename=(event)=>{
  const name = event.target.value;
  this.setState({ name });
}
handleChangeprice=(event)=>{
  const price = event.target.value;
  this.setState({ price });
}
handleChangediscounted_price=(event)=>{
  const discounted_price = event.target.value;
  this.setState({ discounted_price });
}
  
  handleSubmit = (evt) => {
    debugger
    const formData = new FormData();
const picture1 = document.getElementById("picture1")
const picture2 = document.getElementById("picture2")
const picture3 = document.getElementById("picture3")

formData.append('picture', picture1 .files[0]);
formData.append('picture', picture2 .files[0]);
formData.append('picture', picture3 .files[0]);

 console.log(formData)


    
    
    var option = {
      method: "POST",
      body: formData,
    }
    fetch("http://localhost:8080/api/addslider", option)
    .then((res) => { return res.json() })
    .then((res) => {
      
          console.log(res)   
    
 
  })
  
   
    
    
    .catch((error) => console.log(error))
  }
  render()
  
  {
       console.log(this.props)
    const { classes } = this.props;
    const { name } = this.state;
    const { price } = this.state;
    const { discounted_price } = this.state;
    const {...someProps} = this.props

  
    return(
      <div>     
        < ValidatorForm
       
         enctype="multipart/form-data"
         ref="form"
         onSubmit={this.handleSubmit}
         onError={errors => console.log(errors)}
         className="bg-white shadow-md rounded px-8 pt-6 mt-6 pb-8 mb-4"
        >
             <Alert stack={{ limit: 1 }} />
           
           
             <input className='' type="file" id="picture1" />
             
             <input type="file" id="picture2" />
             <input type="file" id="picture3" />
           >




<br/>

     
 
       <Button variant="contained" color="secondary"  type="Submit"className={classes.button}>
      Post Now
     
     </Button>
     </ValidatorForm>
         
            
        </div>
                  






                    


     
    )


    }
}


function mapStateToProps({ loginreducers }) {
  return {
    login: loginreducers
  }
}

export default withStyles(styles)(connect(mapStateToProps)(Addslider));


