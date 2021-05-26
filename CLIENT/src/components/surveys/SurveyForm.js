import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField'
import _ from 'lodash'

const FIELDS = [
    {label: "Survey Title", name: "title", placeholder: "Enter Title"},
    {label: "Survey Subject", name: "subject", placeholder: "Enter Subject"},
    {label: "Survey Body", name: "body", placeholder: "Enter Body"},
    {label: "Survey Recipients", name: "recipients", placeholder: "Enter recipient's email"}
]


class SurveyForm extends Component {

    renderFields(){
        return _.map(FIELDS, ({label, name, placeholder})=>{
            return(
                <div className="form-group">
                    <Field key={name} type="text" label={label} component={SurveyField} name={name} className="form-control" placeholder={placeholder} required autoFocus  />
                </div> 
             )
        })
      
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

    _.each(FIELDS, ({name})=>{
        if(!values[name]){
            errors[name] = `${name} can not empty!`
        }
    })


    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm'
}) (SurveyForm)