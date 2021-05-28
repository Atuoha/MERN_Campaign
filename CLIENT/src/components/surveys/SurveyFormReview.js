import React from 'react'
import { connect } from 'react-redux'
import formField from './formField'
import _ from 'lodash'

const SurveyFormReview = ({formReview, onCancel})=>{
    

    const renderFormReview = ()=>{
        return _.map(formField, ({label, name})=>{
            return(
                <tr>
                    <th>{label}</th>
                    <td>{formReview[name]}</td>
                </tr>
            )
        })
    }
        return (
            <div className="container col-md-5 mx-auto mt-5">
                <p className="lead text-center">Are these inputs correct?</p>
                <table className="table table-striped table-hover">
                    <caption><i className="fa fa-check-circle fa-2x"></i> Saved Survey Form Review</caption>

                    <tbody>
                        {renderFormReview()}
                        
                        <tr>
                            <th>Actions</th>
                            <td>
                                <button onClick={onCancel} className="btn btn-danger mr-3"><i className="fa fa-arrow-left"></i> Back</button>
                                <button className="btn btn-success"><i className="fa fa-send"></i> Submit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
}


function mapStateToProps(state){
    console.log(state)

    return{
        formReview: state.form.surveyForm.values
    }
}

export default connect(mapStateToProps)(SurveyFormReview)