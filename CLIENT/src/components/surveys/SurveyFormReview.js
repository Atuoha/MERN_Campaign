import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SurveyFormReview extends Component {
    render() {
        return (
            <div className="container col-md-5 mx-auto mt-5">
                <table className="table table-striped table-hover">
                    <caption><i className="fa fa-check-circle fa-2x"></i> Survey Form Review</caption>

                    <tbody>
                        <tr>
                            <th>Title</th>
                            <td></td>
                        </tr>

                        <tr>
                            <th>Subject</th>
                            <td></td>
                        </tr>

                        <tr>
                            <th>Body</th>
                            <td></td>
                        </tr>

                        <tr>
                            <th>Recipients</th>
                            <td></td>
                        </tr>

                        <tr>
                            <th>Actions</th>
                            <td>
                                <Link to="/survey/new" className="btn btn-danger mr-3"><i className="fa fa-arrow-left"></i> Back</Link>
                                <button className="btn btn-success"><i className="fa fa-send"></i> Submit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}


export default SurveyFormReview