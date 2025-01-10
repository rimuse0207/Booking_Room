import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import KizukiListContent from './KizukiListContent/KizukiListContent';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Kizuki_Show_Count_Change_Func } from '../../../../Models/Kizuki_Show_Count_Reducer/KizukiShowCountReducer';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const KizukiListMainDivBox = styled.div`
    
    .MoreSomthingRoom_Container{
        button{
            border:none;
            font-size:1.3em;
            color:gray;
            background-color:#fff;
            margin-left:30px;
            :hover{
                cursor: pointer;
                color:blue;
            }
        }
    }


`

const KizukiList = ({ Kizuki_Division_State, Kizuki_List_State }) => {
    const ScrollDown = useRef();
    const { team_code } = useParams();
    const dispatch = useDispatch();
    const showCounts = useSelector((state)=>state.KizukiShowCountRedux.showCounts)
        const groupedData = {};

        for (const division of Kizuki_Division_State) {
            const code = division.kizuki_notepad_division_code;
            if (!groupedData[code]) {
                groupedData[code] = { name: division.kizuki_notepad_division_name, items: [] };
            }
        }

        for (const item of Kizuki_List_State) {
            const code = item.kizuki_notepad_kizuki_list_division_code;
                if (groupedData[code]) {
                groupedData[code].items.push(item);
                }
        }

    const handleItemClick = (code) => {
     dispatch(Kizuki_Show_Count_Change_Func({
      ...showCounts,
      [code]: (showCounts[code] || 0) + 3,
    }))

       
        
    };

    return (
        <KizukiListMainDivBox>
            {Object.keys(groupedData).map((code) => {
               const division = groupedData[code];
                const items = division.items ? division.items.slice(0, showCounts[code] ? showCounts[code] + 3 : 3) : [];


                return (
                    <div key={code }>
                    <fieldset className="Kizuki_List_Container">
                        <legend>
                            <h2>{division.name }</h2>
                        </legend>
                            <div>
                                {items.map((item, index) => (
                                    <Link to={`/KIZUKI_Notepad_List_Select/${team_code}/${item.kizuki_notepad_kizuki_list_key}`} key={item.kizuki_notepad_kizuki_list_indexs}>
                                        <KizukiListContent item={item}></KizukiListContent>
                                    </Link>
                                ))}
                                <div ref={ScrollDown}></div>
                                {division.items.length > items.length && (
                                    <div className="MoreSomthingRoom_Container" >
                                        <button onClick={() => handleItemClick(code)}>...more</button>
                                    </div>
                                )}
                            </div>
                    </fieldset>
                </div>
            );
            })}
        </KizukiListMainDivBox>
    )
}


export default KizukiList;
