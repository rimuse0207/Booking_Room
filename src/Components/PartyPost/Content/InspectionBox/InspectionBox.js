import React, { useState, useEffect, useCallback, useRef } from 'react';
import { InfoBoxMainPageMainDivBox } from '../InfoBox/InfoBoxMainPage';
import { useDispatch, useSelector } from 'react-redux';
import { Party_Post_State_Change_Func } from '../../../../Models/PartyPostReducer/PartyPostReducer';

const PatrolBox = () => {
    const dispatch = useDispatch();
    const Party_Post_State = useSelector(state => state.PartyPostReduce.Party_Post_State);

    const handleInputChange = e => {
        dispatch(
            Party_Post_State_Change_Func({
                ...Party_Post_State,
                Inspection_State: { ...Party_Post_State.Inspection_State, Patrol_State: e.target.value },
            })
        );
    };

    return (
        <InfoBoxMainPageMainDivBox>
            <h3>4. 점검 및 순찰내역</h3>

            <div className="Box_Container">
                <div>
                    <h4>{Party_Post_State.Inspection_State.Select_Time}</h4>
                    <div className="Input_Container">
                        <textarea
                            rows={1}
                            style={{ height: Party_Post_State.Inspection_State.height }}
                            value={Party_Post_State.Inspection_State.Patrol_State}
                            onChange={e => handleInputChange(e)}
                            placeholder={`Textarea`}
                        />
                    </div>
                </div>
            </div>
        </InfoBoxMainPageMainDivBox>
    );
};

export default PatrolBox;
