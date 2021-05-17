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
    