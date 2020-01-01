import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
 
export default class TakeMoney extends React.Component {
  onToken = (token) => {
       console.log(token)
    fetch('http://localhost:8080/api/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }
 
 
 
  render() {
    return (
     
      <StripeCheckout
        token={this.onToken}
             name="T Shirt Shop"
             description=" Seller best T shirt"
        stripeKey="	
        sk_test_Bo9XHotRwOXDbGhN6EaFzyJr002QKJGuZ0"
      />
    )
  }
}