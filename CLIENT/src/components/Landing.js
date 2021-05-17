import React, { Component } from 'react'

class Landing extends Component{
    render(){
      

        return(
            <div className="container">
               <div className="row" id="landingDiv">
                   <div className="col-md-6">
                        <img src="./index.jpg" id="imagery" alt="index imagery" />
                   </div>

                   <div className="col-md-6" style={{marginTop: "20px"}}>
                       <p><b>Campaign Manager</b> is a snippet written using React, Node.Js as backend API(Express, Bcrypt, Passport(LocalStrategy and Google Oauth20), Mongoose, body-parser, Express-session and more), Axios, Fetch API, Redux, Redux-thunk, React-Router, React-Bootstrap, Browser-LocalStorage, Stripe Payment Gateway and more. It's all about managing compaign and resources with a willingness to create the best surveys with.... <i className="fa fa-smile-o"></i></p>
                   </div>
               </div>
            </div>
        )
    }
}


export default Landing