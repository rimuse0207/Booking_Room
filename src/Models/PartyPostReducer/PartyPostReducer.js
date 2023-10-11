export const PARTY_POST_REDUCER_GET = 'PARTY_POST_REDUCER_GET';

const initState = {
    Party_Post_State: {
        Info_State: {
            Select_User: null,
        },
        Patrol_State: [
            {
                indexs: 1,
                Select_Time: '10:00',
                Patrol_State: `
            보고사항 :
            주차 내역 : B2 - 7대,   B3 - 4대,   B4 - 9대`,
                height: 'auto',
            },
            {
                indexs: 2,
                Select_Time: '13:00',
                Patrol_State: `
            보고사항 : 
            주차 내역 : B2 - 7대,   B3 - 4대,   B4 - 9대`,
                height: 'auto',
            },
            {
                indexs: 3,
                Select_Time: '17:00',
                Patrol_State: `
            보고사항 :
            주차 내역 : B2 - 7대,   B3 - 4대,   B4 - 9대`,
                height: 'auto',
            },
        ],
        Argument_State: { indexs: 1, Select_Time: '특이사항(인계사항)', Patrol_State: '특이사항 없습니다.', height: 'auto' },
        Inspection_State: { indexs: 2, Select_Time: '건물 출입 인원', Patrol_State: '8층 :           (최종퇴실자: )', height: 'auto' },
    },
};

export const Party_Post_State_Change_Func = data => ({
    type: PARTY_POST_REDUCER_GET,
    payload: data,
});

const Party_Post_Reduce = (state = initState, action) => {
    switch (action.type) {
        case PARTY_POST_REDUCER_GET:
            return {
                ...state,
                Party_Post_State: action.payload,
            };
        default:
            return state;
    }
};
export default Party_Post_Reduce;
