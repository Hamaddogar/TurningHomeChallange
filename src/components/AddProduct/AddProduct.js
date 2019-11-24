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
import './style.css'
import styles from './styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import ImageUploader from 'react-images-upload';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import { connect } from 'react-redux';






class  Addproduct extends React.Component {

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
    
    evt.preventDefault();
    var formData = new FormData();
    var photos = document.querySelector("input[type='file'][multiple]");
    
    formData.append('title', 'My Vegas Vacation');
    for (var i = 0; i < photos.files.length; i++) {
      formData.append('photos', photos.files[i]);
    }
    
    formData.append('name', this.name.value);
    
    
    formData.append('price', this.price.value);
    
    formData.append('discounted_price', this.discounted_price.value);
    
    formData.append('description', this.refs.description.value);
    formData.append('userId', this.props.login._id);

    
    
    var option = {
      method: "POST",
      body: formData,
    }
    fetch("http://localhost:8080/api/addProduct", option)
    .then((res) => { return res.json() })
    .then((res) => {
      if (res.success === true && res.data.photoname.length<=7) {
        console.log(res)
      this.setState({
        messagedisplay: " congratulations ! Successfully your product Has been  Published ",
        name:'',
        price:'',
        discounted_price:'',
      })
      {
        Alert.success(`${this.state.messagedisplay}`, {
          position: 'top',
        })
      }
    }
    else {
      this.setState({
          messagedisplay:" Sorry!You Cann't upload more than 7 Images"
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
            <TextValidator
    inputRef={(name) => this.name = name}
    onChange={this.handleChangename}
       id="outlined-dense"
       helperText=" Product Name !"
       label="Product Name"
       className={classNames(classes.textField, classes.dense)}
       margin="dense"
       value={name}
       variant="outlined"
       validators={['required']}
       errorMessages={['this field is required']}
     />
     <br/>
          <TextValidator
         inputRef={(price) => this.price = price}
         id="outlined-adornment-amount"
          onChange={this.handleChangeprice}
          value={price}
         className={classNames(classes.margin, classes.textField)}
         variant="outlined"
         label="Price"
         type="number"
         helperText=" Price in $ "
         InputProps={{
           startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          {...someProps}
          validators={['minNumber:0', 'maxNumber:255', 'matchRegexp:^[0-9]$']}
          validators={['required']}
          errorMessages={['this field is required']}
       />
        <br/><br/>
        <TextField
          onChange={this.handleChangediscounted_price}
      value={discounted_price}
         inputRef={(discounted_price) => this.discounted_price= discounted_price}
         id="outlined-adornment-amount"
         className={classNames(classes.margin, classes.textField)}
         variant="outlined"
         label=" Discount Price"
         
        
         helperText="Discount Price"
         InputProps={{
           startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          {...someProps}
         
          />
        <br/>
     

<div class="box">
<ImageUploader
                withIcon={true}
                helperText="you can upload only 6 images othwise it will not show"
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                type="file"
                name="photos" multiple 
                
            />



</div>
<br/>

       <div>
       <br/>
       <Typography ariant="h6" gutterBottom>
     Description
     </Typography>
       <textarea  rows="7" cols="60" ref="description" placeholder="write all which you Have not Above?"
    ></textarea>
       </div>
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

export default withStyles(styles)(connect(mapStateToProps)(Addproduct));


