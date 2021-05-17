import { FETCH_USER } from '../actions/types'

const fnc = (state = null, action)=>{
    // console.log(action)
    switch (action.type) {
       case FETCH_USER:
        return action.payload || false
        default:
            return state;
    }
}

export default fnc

