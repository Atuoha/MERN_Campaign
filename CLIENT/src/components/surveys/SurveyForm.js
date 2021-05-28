import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField'
import _ from 'lodash'
import validateEmail from '../utils/validateEmail'
import formFields from './formField'

class SurveyForm extends Component {

    renderFields(){
        return _.map(formFields, ({label, name, placeholder})=>{
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
            <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
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

    errors.recipients = validateEmail(values.recipients || '') // validating email formate

    _.each(formFields, ({name})=>{
        if(!values[name]){
            errors[name] = `${name} can not empty!`
        }
    })


    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
}) (SurveyForm)