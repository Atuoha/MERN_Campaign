import React, { Component } from 'react'
import { Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import Payments from '../Payments'

class Header extends Component{
    constructor(props){
        super(props)
        this.state = {

        }   
        this.google_login = this.google_login.bind(this)     
        this.local_login = this.local_login.bind(this)     
        this.renderContent = this.renderContent.bind(this)     
        this.logout = this.logout.bind(this)     
    }


    

     google_login(){
        window.location.replace('http://localhost:4010/api/auth/google')
    }

    local_login(){
        window.location.replace('/signin')
    }


    logout(){
       axios.get('/api/signout')
        .then(response=>{
            window.location.replace('/')
        })
        localStorage.removeItem('compaign-user')
    }


    renderContent(){
        console.log(this.props.auth)
        switch(this.props.auth){
            case null:
                return 
            case false:
                return(
                    <>
                        <button onClick={this.google_login} className="link btn" id="google-btn">Signin with Google <i className="fa fa-google-plus"></i></button>

                        <button onClick={this.local_login} className="link btn" id="login-btn">Signin with Email <i className="fa fa-sign-in"></i></button>
                    </>
                )
            default:
                return(
                    <>
                        <button onClick={this.logout} className="link btn" id="login-btn">Sign Out <i className="fa fa-user"></i></button>
                        <button className="link btn" id="google-btn">Credits: {this.props.auth.credit} <i className="fa fa-check"></i></button>
                        <button className="link btn" id="login-btn"> <Payments /> </button>
                    </>
                )
        }
    }


    navBarRender(){
        switch(this.props.auth){
            case null:
                return 
            case false:
                return(
                    <>
                        <NavLink className="link" to="/signup">Signup <i className="fa fa-user-plus"></i></NavLink>
                    </>
                )
            default:
                return(
                    <>
                        <NavLink className="link" to="/survey/new">Create</NavLink>
                        <NavLink  className="link" to="/surveys">Surveys</NavLink>
                        <NavLink className="link" to="/profile">Profile</NavLink>
                       
                    </>
                )
        }
    }


    render(){
        console.log(this.props)
        return (
            <div>
               <Navbar id="navbar" variant="dark">
                    <Navbar.Brand><NavLink exact className="link" to="/"><i className="fa fa-home"></i></NavLink></Navbar.Brand>
                    <Nav>
                        {this.navBarRender()}
                    </Nav>
                </Navbar>
                

                <div className="jumbotron text-white text-center">
                    <h1><strong>CompaignManag <i className="fa fa-check-circle"></i></strong></h1>
                    <p className="small-text">Sharing surveys and moments bigger than ourselves with notations of a brighter view </p>

                    {this.renderContent()}
                    {/* <button onClick={this.google_login} className="link btn btn-primary">Signin with Google <i className="fa fa-google-plus"></i></button>

                    <button onClick={this.local_login} className="link btn btn-secondary">Signin with Email <i className="fa fa-sign-in"></i></button> */}

                </div>
            </div>
        )

        }  
    }

    function mapStateToProps({ auth }){
        return { auth }
    }

export default connect(mapStateToProps) (Header)

