import { combineReducers } from 'redux';
import LoginInfoDataRedux from './LoginInfoReducer/LoginInfoReducer';
import LoaderCheckingRedux from './LoaderCheckReducer/LoaderCheckReducer';
const rootReducer = combineReducers({ LoginInfoDataRedux, LoaderCheckingRedux });

export default rootReducer;
