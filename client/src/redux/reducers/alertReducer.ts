import { ALERT, IAlert, IAlertType } from '../types/alertTypes'


const authReducer = (state: IAlert = {}, action: IAlertType): IAlert => {
    switch (action.type) {
        case ALERT:
            return action.payload
        default:
            return { ...state }
    }
}

export default authReducer;