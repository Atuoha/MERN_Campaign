import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ReactDOM from 'react-dom'

const Signup = ()=>{

        const [name, setName] = useState("")
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const history = useHistory()


        const [profile_name, setProfileName] = useState("")
        const [profile_email, setProfileEmail] = useState("")
        const [profile_id, setProfileId] = useState("")
    
        useEffect(()=>{
            const profile =  JSON.parse(localStorage.getItem('compaign-user'))
            setProfileName(profile.name)
            setProfileEmail(profile.email)
            setProfileId(profile._id)
        }, [])


        const postData = (e)=>{
            fetch(`/api/user/edit/${profile_id}`, {
                method: "post",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.error){
                    let response_paragraph = document.getElementById('alert');
                    ReactDOM.findDOMNode(response_paragraph).style.display = 'block'
                    ReactDOM.findDOMNode(response_paragraph).innerHTML = `<a href="#" class="close" data-dismiss="alert" aria-label="close" >&times;</a> ${data.error}`
                    ReactDOM.findDOMNode(response_paragraph).className = 'alert alert-danger'
                    setTimeout(()=>{
                        ReactDOM.findDOMNode(response_paragraph).style.display = 'none'
                    }, 5000)
                }else{
                    localStorage.removeItem('compaign-user')
                    localStorage.setItem('compaign-user', JSON.stringify(data.user))
                    let response_paragraph = document.getElementById('alert');
                    ReactDOM.findDOMNode(response_paragraph).style.display = 'block'
                    ReactDOM.findDOMNode(response_paragraph).innerHTML = `<a href="#" class="close" data-dismiss="alert" aria-label="close" >&times;</a> Profile Edited Successfully <i className="fa fa-check-circle"><i>`
                    ReactDOM.findDOMNode(response_paragraph).className = 'alert alert-success'
                    setTimeout(()=>{
                        history.push('/profile');
                    }, 5000)
                }
            })
            .catch(err=>console.log(err))
        }
       
        return (
            <div className="container col-md-5 mx-auto">
                <h2 className="text-center">Edit Profile <i className="fa fa-pencil"></i></h2>
                <form >
                    <p id="alert"></p>
                    <div className="form-group">
                        <label>Name <i className="fa fa-user"></i> <b>{profile_name? profile_name: ""}</b></label>  
                        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control" placeholder="Enter Fullname" required autoFocus />  
                    </div> 


                    <div className="form-group">
                        <label>Email <i className="fa fa-envelope"></i> <b>{profile_email? profile_email: ""}</b></label>  
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter Email" required />  
                    </div>    

                    <div className="form-group">
                        <label>Password <i className="fa fa-key"></i></label>  
                        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter Password" required />  
                    </div> 


                    <div className="form-group">
                        <button type="button" onClick={()=>postData()} className="btn btn-success btn-block">Submit Edit <i className="fa fa-check-circle"></i></button>
                    </div> 
                </form> 
            </div>
        )
}


export default Signup