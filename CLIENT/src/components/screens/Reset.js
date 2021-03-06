import React, { useState} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import ReactDOM from 'react-dom'


const Signin = ()=>{
    const {token} = useParams()
    console.log(token)
    const [password, setPassword] = useState("");
    const history = useHistory()

    const postData = ()=>{
        fetch(`/api/token/${token}`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
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
                let response_paragraph = document.getElementById('alert');
                ReactDOM.findDOMNode(response_paragraph).style.display = 'block'
                ReactDOM.findDOMNode(response_paragraph).innerHTML = `<a href="#" class="close" data-dismiss="alert" aria-label="close" >&times;</a> ${data.success} <i className="fa fa-check-circle"><i>`
                ReactDOM.findDOMNode(response_paragraph).className = 'alert alert-success'
                setTimeout(()=>{
                    history.push('/signin');
                }, 5000)
            }
        })
        .catch(err=>console.log(err))
    }

        return (
            <div className="container col-md-5 ">
                <h2 className="text-center">Reset Password <i className="fa fa-user"></i> </h2>
                <form>
                    <p id="alert"></p>
                   
                    <div className="form-group">
                        <label>Password <i className="fa fa-key"></i></label>  
                        <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter New Password" required autoFocus />  
                    </div> 

                    

                    <div className="form-group">
                        <button type="button" onClick={()=>postData()} className="btn btn-success btn-block">Submit Password <i className="fa fa-lock"></i></button>
                    </div> 
                </form> 
            </div>
        )
}


export default Signin