import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/layouts/Footer'
import Header from './components/layouts/Header'
import Landing from './components/Landing'
import Surveys from './components/Surveys'
import SurveyNew from './components/surveys/SurveyNew'
import Signin from './components/screens/Signin'
import Signup from './components/screens/Signup'
import Forgot from './components/screens/Forgot'
import Profile from './components/screens/Profile'
import Edit_Profile from './components/screens/Edit_Profile'
import Reset from './components/screens/Reset'
import { connect } from 'react-redux'
import * as actions from './actions'
import Thankyou from './components/Thankyou'
import Multi_searched_surveys from './components/surveys/Multi_searched_surveys'
import Single_searched_survey from './components/surveys/Single_searched_survey'

// import SurveyFormReview from './components/surveys/SurveyFormReview'

class App extends Component {
  constructor(props){
    super(props)
      this.state = {
        
      }
     
  }

  componentDidMount(){
    this.props.fetchUser()
  }

  render() {
    return (
      <div>
          <Router>
            <Header />
              <Route exact path="/" component={Landing} />
              <Route path="/surveys" component={Surveys} />
              <Route path="/survey/new" component={SurveyNew} />
              <Route path="/signin" component={Signin} />
              <Route path="/signup" component={Signup} />
              <Route path="/forgot" component={Forgot} />
              <Route path="/profile" component={Profile} />
              <Route path="/edit_profile" component={Edit_Profile} />
              <Route path="/token/:token" component={Reset} />
              <Route path="/thankyou" component={Thankyou} />
              <Route path="/multi_searched_surveys" component={Multi_searched_surveys} />
              <Route path="/single_searched_survey" component={Single_searched_survey} />
              {/* <Route path="/formreview" component={SurveyFormReview} /> */}

            <Footer />
          </Router>   
      </div>
            
    )
  }
}

export default connect(null, actions) (App)