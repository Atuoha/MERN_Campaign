import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom'


const Surveys = ()=>{

    const [surveys, setSurvey] = useState([])
    const [search, setSearch] = useState("")

    const history = useHistory()

    useEffect(()=>{
        const multiple =  JSON.parse(localStorage.getItem('multi_searched_surveys'))
        setSurvey(multiple)
    },[])


    const search_post = ()=>{
        fetch('/api/survey/search',{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                search
            })
        })
        .then(res=>res.json())
        .then(response=>{
            if(response.surveys){
                localStorage.removeItem('multi_searched_surveys')
                localStorage.setItem('multi_searched_surveys', JSON.stringify(response.surveys))
                history.push('/multi_searched_surveys');
            }else if(response.survey){
                localStorage.removeItem('single_searched_survey')
                localStorage.setItem('single_searched_survey', JSON.stringify(response.survey))
                history.push('/single_searched_survey');
            }else{
                let response_paragraph = document.getElementById('alert');
                ReactDOM.findDOMNode(response_paragraph).style.display = 'block'
                ReactDOM.findDOMNode(response_paragraph).innerHTML = `<a href="#" class="close" data-dismiss="alert" aria-label="close" >&times;</a> No Survey Found!`
                ReactDOM.findDOMNode(response_paragraph).className = 'alert alert-danger'
                setTimeout(()=>{
                    ReactDOM.findDOMNode(response_paragraph).style.display = 'none'
                }, 5000)
            }
        })
        .catch(err=>console.log(err))
    }


    const delSurvey = (id)=>{
       fetch('/api/survey/delete',{
           method: "DELETE",
           headers:{
               "Content-Type": "application/json"
           },
           body: JSON.stringify({
               id
           })
       })
       .then(res=>res.json())
       .then(response=>{
        let response_paragraph = document.getElementById('alert');
        ReactDOM.findDOMNode(response_paragraph).style.display = 'block'
        ReactDOM.findDOMNode(response_paragraph).innerHTML = `<a href="#" class="close" data-dismiss="alert" aria-label="close" >&times;</a> Terminated Survey <i className="fa fa-check-circle"><i>`
        ReactDOM.findDOMNode(response_paragraph).className = 'alert alert-success'

        // dispatch(data)
        setTimeout(()=>{
           history.push('/surveys')
        }, 5000)

       })
       .catch(err=>console.log(err))
    }

        return(
            <div className="container">
                     <div className="col-md-6 mx-auto mt-5">
                        <form>
                            <p id="alert"></p>
                            <div className="form-group">
									<div className="input-group dates-wrap">                                              
										<input value={search} onChange={(e)=>setSearch(e.target.value)}  className="dates form-control"  placeholder="Search Survey" type="text" />                        
										<div className="input-group-prepend">
											<button type="button" onClick={()=>search_post()} className="btn btn-success"><i className="fa fa-search"></i></button>
										</div>											
									</div>
							</div>
                        </form>    
                    </div>


                <p id="alert"></p>
                <div className="row" style={{width:"100%"}}>
                {surveys ?
                    surveys.map(survey=>
                                <div className="col-md-4 mt-5">
                                    <Card className="card_element" style={{paddingTop: "10px", borderRadius: "50px 50px 0px 0px"}}>
                                            <Card.Img className="center-align text-center align-content-center" variant="top " src="hl.png" style={{ width: '120px', margin: "0 auto" }}  />
                                            <Card.Body> 
                                                <Card.Title>
                                                    <b>Title: </b> {survey.title}  
                                                </Card.Title>            
                                                    <b>Subject: </b> {survey.subject}
                                                    <hr />

                                                    <p><b>Body <i className="fa fa-paragraph"></i>: </b> 
                                                        "{survey.body}"
                                                    </p>

                                                    <p><b>Recipients: </b> 
                                                        {survey.recipients.email}
                                                    </p>

                                                    <button onClick={()=>delSurvey(survey.id)} className="btn btn-success btn-block">Terminate <i className="fa fa-remove"></i></button>
                                            </Card.Body>
                                    </Card>
                               </div>
                    )
                :
                    `<div className="col-md-5 mx-auto alert alert-success"> NO SURVEYS TO DISPLAY ): </div>`    
                }
                </div>
                 

            </div>
        )
}

export default Surveys