import React from 'react';
import styled from 'styled-components';
import { InfoBoxMainPageMainDivBox } from '../InfoBox/InfoBoxMainPage';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Party_Post_State_Change_Func } from '../../../../Models/PartyPostReducer/PartyPostReducer';

const ArgumentsBoxMainDivBox = styled.div``;

const ArgumentsBox = () => {
    const dispatch = useDispatch();
    const Party_Post_State = useSelector(state => state.PartyPostReduce.Party_Post_State);

    const handleChange = useCallback(
        e => {
            dispatch(
                Party_Post_State_Change_Func({
                    ...Party_Post_State,
                    Argument_State: { ...Party_Post_State.Argument_State, Patrol_State: e.target.value },
                })
            );
        },
        [Party_Post_State.Argument_State]
    );

    return (
        <InfoBoxMainPageMainDivBox>
            <h3>3. 특이사항</h3>

            <div className="Box_Container">
                <div>
                    <h4>{Party_Post_State.Argument_State.Select_Time}</h4>
                    <div className="Input_Container">
                        <textarea
                            rows={1}
                            style={{ height: Party_Post_State.Argument_State.height }}
                            value={Party_Post_State.Argument_State.Patrol_State}
                            onChange={e => handleChange(e)}
                            onInput={e => handleChange(e)}
                            placeholder={`Textarea`}
                        />
                    </div>
                </div>
            </div>
        </InfoBoxMainPageMainDivBox>
    );
};

export default ArgumentsBox;
