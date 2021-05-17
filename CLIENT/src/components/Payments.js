import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'


class Payments extends Component{
    render(){
        return(
            <div>
                { <StripeCheckout 
                    name= "Compaign Manager"
                    description= "Subscription for 5 Email Credits"
                    amount={500} 
                    token={token=>console.log(token)} 
                    StripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
                 >
                    <button className="btn" id="login-btn">Add Credits <i className="fa fa-money"></i></button>
                 </StripeCheckout>
                 }
            </div>
        )
    }
}


export default Payments