import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'

class SurveyForm extends Component {


    renderFields(){
        return(
           <>
                 <div className="form-group">
                    <label>Title <i className="fa fa-text-height"></i></label>  
                    <Field type="text" name="title" className="form-control" component="input" placeholder="Enter Title" required autoFocus  />
                    {/* <p className="alert alert-danger">{meta.error}</p> */}
                </div> 


                <div className="form-group">
                    <label>Subject <i className="fa fa-check-square"></i></label>  
                    <Field type="text" name="subject" className="form-control" component="input" placeholder="Enter Subject" required  /> 
                </div>

                 <div className="form-group">
                    <label>Body <i className="fa fa-paragraph"></i></label>  
                    <Field type="textarea" cols="3" rows="3" name="body" className="form-control" component="textarea" placeholder="Enter Body" required  />
                </div>


                 <div className="form-group">
                    <label>Recipients <i className="fa fa-envelope"></i></label>  
                    <Field type="email" cols="5" rows="2" name="recipients" className="form-control" component="textarea" placeholder="Enter recipient's mail address(es), separate with comma" required  />
                </div> 
               
           </>
        )
    }

    render() {
        return (
            <div className="container col-md-5 mx-auto">
            {/* <h2 className="text-center">New Survey <i className="fa fa-plus"></i></h2> */}
            <form onSubmit={this.props.handleSubmit(values=>console.log(values))}>
                {this.renderFields()}

                <div className="form-group">
                    <Link to="/dashboard" className="btn btn-danger mr-5"><i className="fa fa-remove"></i> Cancel</Link>
                    <button type="submit" onClick="" className="btn btn-success"><i className="fa fa-check-circle"></i> Next</button>
                </div> 
            </form> 
        </div>
        )
    }
}

function validate(values){
    let errors = {}

    if(!values.title){
        errors.title = 'Title can not be empty'
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm'
}) (SurveyForm)