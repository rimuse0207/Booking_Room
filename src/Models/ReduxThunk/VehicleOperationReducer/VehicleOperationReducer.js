import { createAsyncAction, createReducer } from 'typesafe-actions';
import { request } from '../../../API';

export const VEHICLE_OPERATION_REDUCER_UPDATE = 'VEHICLE_OPERATION_REDUCER_UPDATE';
export const VEHICLE_OPERATION_REDUCER_RESET = 'VEHICLE_OPERATION_REDUCER_RESET';


const initState = {
    loading: false,
    error: null,
    Vehicle_Operation_Input_State: {
        company_car_keys:'',
        company_car_epid: '',
        company_car_userId: '',
        company_car_name: '',
        company_car_place: '',
        company_car_explain: '',
        company_car_erp_id:'',
        company_select: null,
        company_car_use_purpose_select:null,
        company_car_use_date: new Date(),
        company_car_start_place: "",
        company_car_end_place: "",
        company_car_start_dispatnce: 0,
        company_car_end_dispatnce: 0,
        company_car_oil_cost: 0,
        company_car_road_cost: 0,
        company_car_etc_cost: 0,
        company_car_erp_id:'',
    },
};

export const Vehicle_Operation_State_Change_Func = data => ({
    type: VEHICLE_OPERATION_REDUCER_UPDATE,
    payload: data,
});

export const Vehicle_Operation_State_Reset_Func = () => ({
    type: VEHICLE_OPERATION_REDUCER_RESET,

})

const Vehicle_Operation_State = (state = initState, action) => {
    switch (action.type) {
       
        case VEHICLE_OPERATION_REDUCER_UPDATE:
            return {
                ...state,
                Vehicle_Operation_Input_State: action.payload,
            };
        case VEHICLE_OPERATION_REDUCER_RESET:
            return initState;
        default:
            return state;
    }
};
export default Vehicle_Operation_State;
