import { combineReducers } from 'redux'
import auth from './authReducers'
import alert from './alertReducer'
export default combineReducers({
    auth,
    alert
})