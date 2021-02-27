import {REMOVE_ALERT,SET_ALERT} from './types';

import {v4 as uuid} from 'uuid';



export const setAlert=(msg,alertType)=>dispatch=>{
    
    const id=uuid();

    dispatch({
        type : SET_ALERT,
        payload : {msg,alertType,id}
    });

    //dispatch 5 secons after to remove the alert
    setTimeout(()=>dispatch({type:REMOVE_ALERT,payload:id}),5000)


}

//since we have used thunk middlewear, we are able to dispatch from within this action 