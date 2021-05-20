import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Payments extends Component{
    render(){
        return(
            <div>
                { <StripeCheckout 
                    name= "Compaign Manager"
                    description= "Subscription for 5 Email Credits"
                    label="Compaign Manager $5 For 5 Credits"
                    panelLabel="Pay $5"
                    amount={500} 
                    image="https://stripe.com/img/documentation/checkout/marketplace.png"
                    token={token=> this.props.handleToken(token)} 
                    stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
                 >
                    <button className="btn" style={{fontWeight: "bolder", cursor: "pointer"}}>Add Credits </button>
                 </StripeCheckout>
                 }
            </div>
        )
    }
}


export default connect(null, actions) (Payments)