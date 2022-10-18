import { combineReducers } from 'redux';
import LoginInfoDataRedux from './LoginInfoReducer/LoginInfoReducer';
import LoaderCheckingRedux from './LoaderCheckReducer/LoaderCheckReducer';
import TitleSelectorRedux from './TitleSelectorReducer/TitleSelectorReducer';
const rootReducer = combineReducers({ LoginInfoDataRedux, LoaderCheckingRedux, TitleSelectorRedux });

export default rootReducer;
