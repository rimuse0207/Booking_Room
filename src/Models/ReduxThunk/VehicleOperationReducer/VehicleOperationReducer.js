import { createAsyncAction, createReducer } from 'typesafe-actions';
import { request } from '../../../API';


const Vehicle_Operation_Input_Content_START = 'Vehicle_Operation_Input_Content_START';
const Vehicle_Operation_Input_Content_SUCCESS = 'Vehicle_Operation_Input_Content_SUCCESS';
const Vehicle_Operation_Input_Content_ERROR = 'Vehicle_Operation_Input_Content_ERROR';

export const VEHICLE_OPERATION_REDUCER_GET = 'VEHICLE_OPERATION_REDUCER_GET';
export const VEHICLE_OPERATION_REDUCER_UPDATE = 'VEHICLE_OPERATION_REDUCER_UPDATE';




const Vehicle_Operation_Input_Content_Async = createAsyncAction(
    Vehicle_Operation_Input_Content_START,
    Vehicle_Operation_Input_Content_SUCCESS,
    Vehicle_Operation_Input_Content_ERROR
)();

const Vehicle_Operation_Input_Content_Getting = async (company_car_epid,Login_id,select_date) => {
    try {
       
        const Vehicle_Operation_Input_Content_Getting_Axios = await request.get(`/DepartmentRouter/Submit_Data_Checking`, {
            params: {
                company_car_epid,
                Login_id,
                select_date
            }
        });
        console.log(Vehicle_Operation_Input_Content_Getting_Axios);
        if (Vehicle_Operation_Input_Content_Getting_Axios.data.dataSuccess) {
            if (Vehicle_Operation_Input_Content_Getting_Axios.data.Submit_Data_Checking_Rows) {
                if (Vehicle_Operation_Input_Content_Getting_Axios.data.Submit_Data_Checking_Rows.length > 0) {
                    return Vehicle_Operation_Input_Content_Getting_Axios.data.Submit_Data_Checking_Rows[0];
                } else {
                    return initState.Vehicle_Operation_Input_State;
                }

            } else {
                return false;
            }
            
        } else {
            return false;
        }    
    } catch (error) {
        console.log(error);
        return error;
    }
};



export function Vehicle_Operation_Input_Content_Reduce_Thunk(
    company_car_epid,
    Login_id,
    select_date
) {
    return async dispatch => {
        const { request, success, failure } = Vehicle_Operation_Input_Content_Async;
        dispatch(request());
        try {
            const Vehicle_Operation_Input_Content_Axios_Getting = await Vehicle_Operation_Input_Content_Getting(company_car_epid,Login_id,select_date);
            if (Vehicle_Operation_Input_Content_Axios_Getting) {
                dispatch(success(Vehicle_Operation_Input_Content_Axios_Getting));
            } else {
                dispatch(failure("서버와의 연결 끊김"));
            }
        } catch (e) {
            dispatch(failure(e));
        }
    };
}



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
    },
};

export const Vehicle_Operation_State_Change_Func = data => ({
    type: VEHICLE_OPERATION_REDUCER_UPDATE,
    payload: data,
});

const Vehicle_Operation_State = (state = initState, action) => {
    switch (action.type) {
        case Vehicle_Operation_Input_Content_START:
            return {
                ...state,
                loading: true
            };
        case Vehicle_Operation_Input_Content_SUCCESS:
            return {
                ...state,
                loading: false,
                Vehicle_Operation_Input_State: {
                    ...state.Vehicle_Operation_Input_State,
                    company_car_keys:action.payload.company_input_list_keys,
                    company_car_epid:action.payload.company_car_epid,
                    company_car_userId:action.payload.company_car_userId,
                    company_car_name:action.payload.company_car_name,
                    company_car_place:action.payload.company_car_place,
                    company_car_explain:action.payload.company_car_explain,
                    company_select: {
                        value:action.payload.company_car_epid,
                        label:`${action.payload.company_car_place}_${action.payload.company_car_name}`,
                    },
                    company_car_use_purpose_select: {
                        value:action.payload.company_input_list_purpose?.split(":")[0],
                        label:`${action.payload.company_input_list_purpose}`
                    },
                    company_car_start_place: action.payload.company_input_start_history_place,
                    company_car_end_place: action.payload.company_input_end_history_place,
                    company_car_start_dispatnce:action.payload.company_input_start_history_distance,
                    company_car_end_dispatnce: action.payload.company_input_end_history_distance,
                    company_car_oil_cost: action.payload.company_input_list_oil_cost,
                    company_car_road_cost: action.payload.company_input_list_road_cost,
                    company_car_etc_cost: action.payload.company_input_list_etc_cost,
                }
            };
        case Vehicle_Operation_Input_Content_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case VEHICLE_OPERATION_REDUCER_UPDATE:
            return {
                ...state,
                Vehicle_Operation_Input_State: action.payload,
            };
        default:
            return state;
    }
};
export default Vehicle_Operation_State;
