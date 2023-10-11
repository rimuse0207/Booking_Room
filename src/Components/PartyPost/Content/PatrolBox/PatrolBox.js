import React, { useState, useEffect, useCallback } from 'react';
import { InfoBoxMainPageMainDivBox } from '../InfoBox/InfoBoxMainPage';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TimeClicksOptions } from './PatrolOptionData';
import { useDispatch, useSelector } from 'react-redux';
import { Party_Post_State_Change_Func } from '../../../../Models/PartyPostReducer/PartyPostReducer';

const PatrolBox = () => {
    const dispatch = useDispatch();
    const Party_Post_State = useSelector(state => state.PartyPostReduce.Party_Post_State);
    const [textareas, setTextareas] = useState([
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
    ]);

    const Handle_Change_Time_Func = (e, data) => {
        const Change_Data = Party_Post_State.Patrol_State.map(list =>
            list.indexs === data.indexs ? { ...list, Select_Time: e.target.value } : list
        );

        dispatch(Party_Post_State_Change_Func({ ...Party_Post_State, Patrol_State: Change_Data }));
    };

    const handleChange = useCallback(
        (e, index, data) => {
            const textareaLineHeight = 24;

            const updatedTextareas = [...Party_Post_State.Patrol_State];
            const currentTextarea = updatedTextareas[index];

            e.target.rows = 1;

            const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

            if (currentRows === currentTextarea.rows) {
                e.target.rows = currentRows;
            }

            currentTextarea.Patrol_State = e.target.value;
            currentTextarea.height = `${e.target.scrollHeight}px`;

            // setTextareas(updatedTextareas);
            const Change_Data = Party_Post_State.Patrol_State.map(list =>
                list.indexs === data.indexs ? { ...list, Patrol_State: e.target.value } : list
            );

            dispatch(Party_Post_State_Change_Func({ ...Party_Post_State, Patrol_State: Change_Data }));
        },
        [Party_Post_State.Patrol_State]
    );

    useEffect(() => {
        // 페이지가 다시 로드될 때 높이를 초기화
        window.addEventListener('beforeunload', () => {
            const updatedTextareas = Party_Post_State.Patrol_State.map(textarea => {
                textarea.height = 'auto';
                return textarea;
            });
            setTextareas(updatedTextareas);
        });
    }, []);

    return (
        <InfoBoxMainPageMainDivBox>
            <h3>2. 순찰사항</h3>
            {Party_Post_State.Patrol_State.map((textarea, index) => (
                <div className="Box_Container" key={index}>
                    <div>
                        <h4>
                            <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                                <InputLabel id="demo-select-small">순찰시간</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={textarea.Select_Time}
                                    label="순찰시간"
                                    onChange={event => Handle_Change_Time_Func(event, textarea)}
                                >
                                    {TimeClicksOptions.map(list => {
                                        return (
                                            <MenuItem value={list.value} key={list.value}>
                                                {list.label}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            순찰 정보
                        </h4>
                        <div className="Input_Container">
                            <textarea
                                rows={1}
                                style={{ height: textarea.height }}
                                value={textarea.Patrol_State}
                                onChange={e => handleChange(e, index, textarea)}
                                onInput={e => handleChange(e, index, textarea)}
                                placeholder={`Textarea ${index + 1}`}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </InfoBoxMainPageMainDivBox>
    );
};

export default PatrolBox;
