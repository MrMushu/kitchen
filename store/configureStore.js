import { createStore, combineReducers, applyMiddleware } from 'redux';
import tickets from '../reducers/ticketReducer'
import account from '../reducers/accountReducer'
import dashboard from '../reducers/dashboardReducer'
import thunk from 'redux-thunk';
import { LOG_OUT } from '../actions/settings'



const appReducer = combineReducers({
    tickets,
    account,
    dashboard,
});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = undefined;
    }
    return appReducer(state, action)
}

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;