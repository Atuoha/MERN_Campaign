import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'


const Dashboard = ()=>{

    const [surveys, setSurvey] = useState([])

    useEffect(()=>{
        fetch('/api/survey', {
            method: "GET"
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data.surveys)
            setSurvey(data.surveys)
        })
    },[])

        return(
            <div className="container">
                {surveys ?
                    surveys.map(survey=>
                                <div className="col-md-4 mt-2">
                                    <Card className="card_element" style={{paddingTop: "10px", borderRadius: "50px 50px 0px 0px"}}>
                                            <Card.Img className="center-align text-center align-content-center" variant="top " src="hl.png" style={{ width: '120px', margin: "0 auto" }}  />
                                            <Card.Body> 
                                                <Card.Title>
                                                    <b>Title: </b> {survey.title}  
                                                </Card.Title>            
                                                    <b>Subject: </b> {survey.subject}
                                                    <hr/>
                                                    <p><b>Body <i className="fa fa-paragraph"></i>: </b> 
                                                        "{survey.body}"
                                                    </p>

                                                    <p><b>Recipients: </b> 
                                                        {survey.recipients}
                                                    </p>
                                            </Card.Body>
                                    </Card>
                            </div>
                    )
                :
                `<div className="col-md-5 mx-auto alert alert-success"> NO SURVEYS TO DISPLAY ): </div>`    
                }
                 

            </div>
        )
}

export default Dashboard