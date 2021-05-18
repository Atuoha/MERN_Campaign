import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import * as actions from './actions'

class Payments extends Component{
    render(){
        return(
            <div>
                { <StripeCheckout 
                    name= "Compaign Manager"
                    description= "Subscription for 5 Email Credits"
                    amount={500} 
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