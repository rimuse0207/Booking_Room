import { createAsyncAction, createReducer } from 'typesafe-actions';
import { request } from '../../../API';
import moment from "moment";

const Vehicle_Operation_Show_Content_START = 'Vehicle_Operation_Show_Content_START';
const Vehicle_Operation_Show_Content_SUCCESS = 'Vehicle_Operation_Show_Content_SUCCESS';
const Vehicle_Operation_Show_Content_ERROR = 'Vehicle_Operation_Show_Content_ERROR';
const Vehicle_Operation_Show_Content_Date_Change = 'Vehicle_Operation_Show_Content_Date_Change';
const Vehicle_Operation_Show_Content_Select_Car_Change = 'Vehicle_Operation_Show_Content_Select_Car_Change';

const Vehicle_Operation_Show_Content_Async = createAsyncAction(
    Vehicle_Operation_Show_Content_START,
    Vehicle_Operation_Show_Content_SUCCESS,
    Vehicle_Operation_Show_Content_ERROR
)();

const Vehicle_Operation_Show_Content_Getting = async () => {
    try {
       
        const Vehicle_Operation_Show_Content_Getting_Axios = await request.get(``);
        if (Vehicle_Operation_Show_Content_Getting_Axios.data.dataSuccess) {

            return false;
            
        } else {
            return false;
        }    
    } catch (error) {
        console.log(error);
        return error;
    }
};



export function Vehicle_Operation_Show_Content_Reduce_Thunk(
    
) {
    return async dispatch => {
        const { request, success, failure } = Vehicle_Operation_Show_Content_Async;
        dispatch(request());
        try {
            const Vehicle_Operation_Show_Content_Axios_Getting = await Vehicle_Operation_Show_Content_Getting();
            if (Vehicle_Operation_Show_Content_Axios_Getting) {
                dispatch(success(Vehicle_Operation_Show_Content_Axios_Getting));
            } else {
                dispatch(failure("서버와의 연결 끊김"));    
            }
        } catch (e) {
            dispatch(failure(e));
        }
    };
}

export const Vehicle_Operation_Date_Change_Func = data => ({
    type: Vehicle_Operation_Show_Content_Date_Change,
    payload: data,
});

export const Vehicle_Operation_Select_Car_Change_Func = data => ({
    type: Vehicle_Operation_Show_Content_Select_Car_Change,
    payload: data,
});


const initialState = {
     Vehicle_Operation_Getting_Data_State: {
        loading: false,
        error: null,
        Vehicle_Operation_State: [],
        Vehicle_Selected_Car: "all",
        Vehilce_Selected_Date:moment()
    },
};

const Vehicle_Operation_Show_Content = createReducer(initialState, {
    [Vehicle_Operation_Show_Content_START]: state => ({
        ...state,
        Vehicle_Operation_Getting_Data_State: {
            ...state.Vehicle_Operation_Getting_Data_State,
                loading: true,      
        },
    }),
    [Vehicle_Operation_Show_Content_SUCCESS]: (state, action) => ({
        ...state,
        Vehicle_Operation_Getting_Data_State: {
            ...state.Vehicle_Operation_Getting_Data_State,
            loading: false,
            error: null,
            Vehicle_Operation_State: action.payload
            
        },
    }),
    [Vehicle_Operation_Show_Content_ERROR]: (state, action) => ({
        ...state,
        Vehicle_Operation_Getting_Data_State: {
            ...state.Vehicle_Operation_Getting_Data_State,
            loading: false,
            error: action.payload,
            Vehicle_Operation_State: [],
            
        },
    }),
    [Vehicle_Operation_Show_Content_Date_Change]: (state, action) => ({
        ...state,
        Vehicle_Operation_Getting_Data_State: {
            ...state.Vehicle_Operation_Getting_Data_State,
            Vehilce_Selected_Date:action.payload
        }
    }),
    [Vehicle_Operation_Show_Content_Select_Car_Change]: (state, action) => ({
        ...state,
        Vehicle_Operation_Getting_Data_State: {
            ...state.Vehicle_Operation_Getting_Data_State,
            Vehicle_Selected_Car:action.payload
        }
    })
  
});

export default Vehicle_Operation_Show_Content;
