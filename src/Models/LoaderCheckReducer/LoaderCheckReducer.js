export const LOADER_CHECK_REDUCER_TRUE_GET = 'LOADER_CHECK_REDUCER_TRUE_GET';
export const LOADER_CHECK_REDUCER_FALSE_GET = 'LOADER_CHECK_REDUCER_FALSE_GET';

const initState = {
    loading: true,
};

export const Loader_Check_For_True = data => ({
    type: LOADER_CHECK_REDUCER_TRUE_GET,
    payload: false,
});

export const Loader_Check_For_False = data => ({
    type: LOADER_CHECK_REDUCER_FALSE_GET,
    payload: false,
});

const LoaderChecking = (state = initState, action) => {
    switch (action.type) {
        case LOADER_CHECK_REDUCER_TRUE_GET:
            return {
                ...state,
                loading: true,
            };
        case LOADER_CHECK_REDUCER_FALSE_GET:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
export default LoaderChecking;
