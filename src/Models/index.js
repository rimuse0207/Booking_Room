import { combineReducers } from 'redux';
import LoginInfoDataRedux from './LoginInfoReducer/LoginInfoReducer';
import LoaderCheckingRedux from './LoaderCheckReducer/LoaderCheckReducer';
import TitleSelectorRedux from './TitleSelectorReducer/TitleSelectorReducer';
import KizukiShowCountRedux from "./Kizuki_Show_Count_Reducer/KizukiShowCountReducer"
const rootReducer = combineReducers({ LoginInfoDataRedux, LoaderCheckingRedux, TitleSelectorRedux,KizukiShowCountRedux });

export default rootReducer;
