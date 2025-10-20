import React, { useEffect } from 'react';
import styled from 'styled-components';
import { DivideType } from '../../DailyPims/HomeCalendar/ScheduleRegistration/ScheduleRegistration';

const ContentTableMainDivBox = styled.div`
    margin: 0 auto;
    margin-top: 20px;
    height: 50vh;
    overflow: auto;
    border-radius: 5px;
    @media only screen and (max-width: 800px) {
        height: 47vh;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9em;
        overflow: auto;
        background-color: #fff;
        border-radius: 5px;
        @media only screen and (max-width: 800px) {
            width: 300%;
        }
    }

    th,
    td {
        border: none;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        padding: 5px;
        text-align: center;
        border-left: 1px solid lightgray;
        border-right: 1px solid lightgray;
    }

    th {
        color: black;
        background-color: #efefef;
    }
    .Open_Click_Modal_Container {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .Button_Container {
            margin-left: 20px;

            button {
                border: none;
                padding: 5px;
                background-color: #fff;
                border: 1px solid lightgray;
                border-radius: 5px;
                &:hover {
                    cursor: pointer;
                    opacity: 0.7;
                }
            }
        }
    }
    thead {
        position: sticky;
        top: 0px;
        height: 30px;
        background-color: #fff;
    }
    tbody {
        button {
            padding: 7px 12px;
            background-color: #fff;
            border: 1px solid lightgray;
            border-radius: 5px;
            margin-right: 10px;
            font-weight: 550;
            &:hover {
                cursor: pointer;
                opacity: 0.7;
            }
        }
    }
`;

const ContentTable = ({ Selected_Lists, TableData }) => {
    return (
        <ContentTableMainDivBox>
            <table>
                <thead>
                    <tr>
                        <th>장소</th>
                        <th>부서</th>
                        <th>팀명</th>
                        <th>이름</th>
                        <th>구분</th>
                        <th>고객사</th>
                        <th>안건</th>
                        <th>동행자</th>
                    </tr>
                </thead>
                <tbody>
                    {TableData.filter(item =>
                        Selected_Lists.find(i => i.Type === 'place').lists.length > 0
                            ? Selected_Lists.find(i => i.Type === 'place').lists.includes(item.places)
                            : item
                    )
                        .filter(item =>
                            Selected_Lists.find(i => i.Type === 'department').lists.length > 0
                                ? Selected_Lists.find(i => i.Type === 'department').lists.includes(item.department)
                                : item
                        )
                        .filter(item =>
                            Selected_Lists.find(i => i.Type === 'team').lists.length > 0
                                ? Selected_Lists.find(i => i.Type === 'team').lists.includes(item.second_department.toUpperCase())
                                : item
                        )
                        .filter(item =>
                            Selected_Lists.find(i => i.Type === 'division').lists.length > 0
                                ? Selected_Lists.find(i => i.Type === 'division').lists.includes(item.division)
                                : item
                        )

                        .map(list => {
                            return (
                                <tr key={list.indexs ? list.indexs : list.id}>
                                    <td style={{ width: '50px' }}>{list.places}</td>
                                    <td style={{ width: '50px' }}>{list.department}</td>
                                    <td style={{ width: '70px' }}>{list.second_department}</td>
                                    <td style={{ width: '70px' }}>{list.name}</td>
                                    <td
                                        style={
                                            list.division === '출근'
                                                ? { color: 'green', width: '50px' }
                                                : list.division === '연차'
                                                ? { color: 'red', width: '50px' }
                                                : list.division === '외근'
                                                ? { color: 'goldenrod', width: '50px' }
                                                : list.division === '해외출장'
                                                ? { color: 'black', width: '50px' }
                                                : { width: '50px' }
                                        }
                                    >
                                        {list?.division === '연차'
                                            ? list.title === 'morning_off'
                                                ? '오전반차'
                                                : list.title === 'afternoon_off'
                                                ? '오후반차'
                                                : list.division
                                            : list.division}
                                    </td>
                                    <td>{list.custom}</td>
                                    <td>{list.description}</td>
                                    <td>{list.companion}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </ContentTableMainDivBox>
    );
};

export default ContentTable;
