import axios from 'axios'
import { FETCH_USER } from './types'


export const fetchUser = ()=>

     dispatch=>{
      axios.get('/api/current_user')
        .then(response=>{
            dispatch({ type: FETCH_USER, payload: response.data })
        })
        .catch(err=>console.log(err))

    }
    

export const handleToken = (token)=>
    
    dispatch=>{
      axios.post('/api/stripe', token)
        .then(response=>{
            dispatch({ type: FETCH_USER, payload: response.data })
        })
        .catch(err=>console.log(err))
    }


export const submitSurvey = (values, history) =>
    dispatch=>{
        axios.post('/api/survey', values)
        .then(response=>{
            // history.push('/dashboard')  // Works perfectly with the aid of withRouter help function but doesn't give exactly the expected results
           window.location.replace('/surveys')
            dispatch({ type: FETCH_USER, payload: response.data })
        })
        .catch(err=>console.log(err))
    }