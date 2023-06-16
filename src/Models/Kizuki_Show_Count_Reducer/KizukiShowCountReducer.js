export const KIZUKI_SHOW_COUNT_REDUCER_GET = 'KIZUKI_SHOW_COUNT_REDUCER_GET';

const initState = {
    showCounts: {},
};

export const Kizuki_Show_Count_Change_Func = data => ({
    type: KIZUKI_SHOW_COUNT_REDUCER_GET,
    payload: data,
});

const Kizuki_Show_Count_Change_State = (state = initState, action) => {
    switch (action.type) {
        case KIZUKI_SHOW_COUNT_REDUCER_GET:
            return {
                ...state,
                showCounts: action.payload,
            };
        default:
            return state;
    }
};
export default Kizuki_Show_Count_Change_State;
