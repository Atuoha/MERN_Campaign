import React, { useState} from 'react'
import { useHistory } from 'react-router-dom'
import ReactDOM from 'react-dom'

const SurveyNew = ()=>{

    const [title, setTitle] = useState("")
    const [subject, setSubject] = useState("")
    const [body, setBody] = useState("")
    const [recipients, setRecipients] = useState("")
    const history = useHistory()
    

    const postData = ()=>{
        fetch('/api/survery', {
            method: "Post",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                subject,
                body,
                recipients
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
                ReactDOM.findDOMNode(response_paragraph).innerHTML = `<a href="#" class="close" data-dismiss="alert" aria-label="close" >&times;</a> ${data.response} <i className="fa fa-check-circle"><i>`
                ReactDOM.findDOMNode(response_paragraph).className = 'alert alert-success'
                setTimeout(()=>{
                    history.push('/signin');
                }, 5000)
            }
        })
        .catch(err=>console.log(err))
    }


        return(
            <div className="container col-md-5 mx-auto">
            <h2 className="text-center">Create a new Survey <i className="fa fa-plus"></i></h2>
            <form >
                <p id="alert"></p>
                <div className="form-group">
                    <label>Title <i className="fa fa-check-square"></i></label>  
                    <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" className="form-control" placeholder="Enter Title" required autoFocus />  
                </div> 


                <div className="form-group">
                    <label>Subject <i className="fa fa-user"></i></label>  
                    <input value={subject} onChange={(e)=>setSubject(e.target.value)} type="text" className="form-control" placeholder="Enter Subject" required  />  
                </div>

                 <div className="form-group">
                    <label>Body <i className="fa fa-user"></i></label>  
                    <textarea cols="3" rows="5" value={body} onChange={(e)=>setBody(e.target.value)} className="form-control" placeholder="Enter Body" required ></textarea>
                </div>


                 <div className="form-group">
                    <label>Recipients <i className="fa fa-user"></i></label>  
                    <textarea cols="5" rows="2"  value={recipients} onChange={(e)=>setRecipients(e.target.value)} type="text" className="form-control" placeholder="Enter Recipients, separate " required ></textarea>
                </div> 
               

               


                <div className="form-group">
                    <button type="button" onClick={()=>postData()} className="btn btn-success btn-block">Create Account <i className="fa fa-user-plus"></i></button>
                </div> 
            </form> 
        </div>
        )
}


export default SurveyNew