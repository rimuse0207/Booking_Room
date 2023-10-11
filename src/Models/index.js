import { combineReducers } from 'redux';
import LoginInfoDataRedux from './LoginInfoReducer/LoginInfoReducer';
import LoaderCheckingRedux from './LoaderCheckReducer/LoaderCheckReducer';
import TitleSelectorRedux from './TitleSelectorReducer/TitleSelectorReducer';
import KizukiShowCountRedux from './Kizuki_Show_Count_Reducer/KizukiShowCountReducer';
import VehicleOperationRedux from './ReduxThunk/VehicleOperationReducer/VehicleOperationReducer';
import VehicleOperationShowContentReduxThunk from './ReduxThunk/VehicleOperationShowContentRedux/VehicleOperationShowContent';
import PartyPostReduce from './PartyPostReducer/PartyPostReducer';

const rootReducer = combineReducers({
    LoginInfoDataRedux,
    LoaderCheckingRedux,
    TitleSelectorRedux,
    KizukiShowCountRedux,
    VehicleOperationRedux,
    PartyPostReduce,
    VehicleOperationShowContentReduxThunk,
});

export default rootReducer;
