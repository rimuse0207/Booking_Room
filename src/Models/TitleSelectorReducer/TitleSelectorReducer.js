export const TITLE_SELECTOR_REDUCER_GET = 'TITLE_SELECTOR_REDUCER_GET';

const initState = {
    SelectBasicTitle: 'Company_Room',
};

export const Title_Change_Func = data => ({
    type: TITLE_SELECTOR_REDUCER_GET,
    payload: data,
});

const ChangeTitleData = (state = initState, action) => {
    switch (action.type) {
        case TITLE_SELECTOR_REDUCER_GET:
            return {
                ...state,
                SelectBasicTitle: action.payload,
            };
        default:
            return state;
    }
};
export default ChangeTitleData;
