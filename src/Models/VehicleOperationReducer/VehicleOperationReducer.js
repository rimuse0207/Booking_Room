export const VEHICLE_OPERATION_REDUCER_GET = 'VEHICLE_OPERATION_REDUCER_GET';
export const VEHICLE_OPERATION_REDUCER_UPDATE = 'VEHICLE_OPERATION_REDUCER_UPDATE';

const initState = {
    Vehicle_Operation_Input_State: {
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