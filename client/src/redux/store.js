import {createStore,applyMiddleware} from 'redux';
//For the browser extension to work
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers'


const initialState={};
const middleware=[thunk]



const store=createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))//Middleware passed like this since i use the devtools(Needs to investigate more)
)

export default store;

