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



// WHAT AND WHY WE USE THUNK MIDDLEWARE? -- Below explanation makes sense, Copied from the udemy q&a section
// --------------------------------------


// Normally in redux we dispatch plain objects (actions) that update state
// store.dispatch({ type, payload })
// Then we have action creators that can can take some value and return a action to dispatch

// const myActionCreator = data => ({ type: 'UPDATE_DATA', payload: data })
 
// store.dispatch(myActionCreator('foo for update'))
// Now what if we want to do some async action?
// We can't dispatch a promise, we can only dispatch plain objects.
// Enter thunk middleware for redux.
// All thunk does is check if what we dispatched was a function or an object.
// If it's an object, it dispatches it as normal.
// If it's a function then thunk calls that function for us passing store.dispatch as an argument, so we get to choose when to dispatch.
// At a higher level you can think of thunk doing something like...

// // oh you gave me a function...
// functionYouGaveToThunk(store.dispatch)
// Now that store.dispatch is available to us in our function that we return from our action creator.
// Which is why we return a function.
// Thunk in itself is only a few lines of code.