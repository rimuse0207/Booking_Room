import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiRotateCw } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import { Request_Get_Axios } from '../../../../API';
import { toast } from '../../../ToasMessage/ToastManager';

const FilterContainerMainDivBox = styled.div`
    border: 1px solid lightgray;
    width: 90%;
    margin: 0 auto;
    border: 1px solid lightgray;
    padding-bottom: 10px;
    margin-top: 10px;
    background-color: #fff;
    border-radius: 5px;
    .Filter_Lists_Container {
        display: flex;
        align-items: center;
        text-align: center;
        @media only screen and (max-width: 800px) {
            flex-flow: wrap;
            font-size: 0.9em;
        }
        .Labeling {
            width: 60px;
            font-size: 1.1em;
        }

        ul {
            display: flex;
            align-items: center;
            margin-bottom: 0px;
            li {
                list-style: none;
                padding: 7px 17px;
                border-radius: 30px;
                border: 2px solid lightgray;
                margin: 0px 7px;
                &:hover {
                    cursor: pointer;
                    opacity: 0.7;
                }
                @media only screen and (max-width: 800px) {
                    margin-right: 3px;
                    padding: 2px 10px;
                }
            }
            @media only screen and (max-width: 800px) {
                margin: 0px;
                margin-top: 5px;
                margin-bottom: 2px;
                flex-flow: wrap;
                padding-left: 5px;
                align-items: start;
            }
            .selected {
                border: 2px solid #93c7f3;
                background-color: #e3f2fd;
                color: #3c8ed2;
                font-weight: bolder;
            }
            .disabled {
                opacity: 0.4;
                color: gray;
                &:hover {
                    cursor: no-drop;
                }
            }
        }
    }
    .Filter_Selected_Lists_Container {
        margin-top: 30px;
        @media only screen and (max-width: 800px) {
            margin-top: 0px;
        }
        .Incons {
            font-size: 1.2em;
            border: none;
        }
        ul {
            display: flex;
            align-items: center;
            margin-bottom: 0px;
            padding-left: 0px;
            @media only screen and (max-width: 800px) {
                flex-flow: wrap;
            }
            li {
                background-color: #e9ecf3;
                list-style: none;
                padding: 7px 17px;
                border-radius: 30px;
                @media only screen and (max-width: 800px) {
                    margin-right: 3px;
                    padding: 2px 10px;
                    font-size: 0.9em;
                    margin-bottom: 3px;
                }
                margin: 0px 3px;
                display: flex;
                > :first-child {
                    margin-right: 10px;
                }
                > :nth-child(2) {
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }
`;

const Lists = [
    {
        Type: 'place',
        lists: [
            { label: '판교', value: '판교' },
            { label: '동탄', value: '동탄' },
            { label: '아산', value: '아산' },
        ],
    },
    {
        Type: 'department',
        lists: [
            { label: '영업', value: '영업', placeMatch: ['동탄', '아산'] },
            { label: 'CE', value: 'CE', placeMatch: ['판교'] },
        ],
    },
    {
        Type: 'team',
        lists: [
            { label: '장비영업', value: '장비영업', placeMatch: ['동탄', '아산'], departmentMatch: ['CE'] },
            { label: '영업기술', value: '영업기술', placeMatch: ['동탄', '아산'], departmentMatch: ['CE'] },
            { label: '부품소재', value: '부품소재', placeMatch: ['동탄', '아산'], departmentMatch: ['CE'] },
            { label: 'OEM', value: 'OEM', placeMatch: ['동탄', '아산'], departmentMatch: ['CE'] },
            { label: 'DICER', value: 'DICER', placeMatch: ['판교'], departmentMatch: ['영업'] },
            { label: 'GRINDER', value: 'GRINDER', placeMatch: ['판교'], departmentMatch: ['영업'] },
            { label: 'LASER', value: 'LASER', placeMatch: ['판교'], departmentMatch: ['영업'] },
            { label: 'CE지원', value: 'CE지원', placeMatch: ['판교'], departmentMatch: ['영업'] },
        ],
    },
    {
        Type: 'division',
        lists: [
            { label: '외근', value: '외근' },
            { label: '해외출장', value: '해외출장' },
            { label: '연차', value: '연차' },
            { label: '출근', value: '출근' },
        ],
    },
];

const FilterContainer = ({ Selected_Lists, setSelected_Lists, Selected_Date, setSelected_Date }) => {
    const SelectedData = (selectMenu, selectData) => {
        const Select_Object = Selected_Lists.find(list => list.Type === selectMenu);

        let newSelectedLists;
        if (Select_Object.lists.includes(selectData)) {
            // 데이터 제거
            const Delete_Lists = Select_Object.lists.filter(item => item !== selectData);
            newSelectedLists = Selected_Lists.map(item => (item.Type === selectMenu ? { ...item, lists: Delete_Lists } : { ...item }));
        } else {
            // 데이터 추가
            newSelectedLists = Selected_Lists.map(item =>
                item.Type === selectMenu ? { ...item, lists: [...item.lists, selectData] } : { ...item }
            );
        }

        // disabled 항목 정리
        const cleaned = newSelectedLists.map(group => {
            if (group.Type === 'department') {
                const selectedPlace = newSelectedLists.find(i => i.Type === 'place').lists;
                const before = group.lists;
                const after = before.filter(depValue => {
                    const depObj = Lists.find(item => item.Type === 'department').lists.find(d => d.value === depValue);
                    return !selectedPlace.some(place => depObj.placeMatch.includes(place));
                });
                const removed = before.filter(x => !after.includes(x));
                if (removed.length > 0) {
                    toast.show({
                        title: `부서 선택값 [${removed.join(', ')}] 이(가) 조건에 의해 해제되었습니다..`,
                        successCheck: false,
                        duration: 6000,
                    });
                }
                return { ...group, lists: after };
            }

            if (group.Type === 'team') {
                const selectedPlace = newSelectedLists.find(i => i.Type === 'place').lists;
                const selectedDep = newSelectedLists.find(i => i.Type === 'department').lists;
                const before = group.lists;
                const after = before.filter(teamValue => {
                    const teamObj = Lists.find(item => item.Type === 'team').lists.find(t => t.value === teamValue);
                    const blockedByDep = selectedDep.some(dep => teamObj.departmentMatch.includes(dep));
                    const blockedByPlace = selectedPlace.some(place => teamObj.placeMatch.includes(place));
                    return !(blockedByDep || blockedByPlace);
                });
                const removed = before.filter(x => !after.includes(x));
                if (removed.length > 0) {
                    toast.show({
                        title: `팀 선택값 [${removed.join(', ')}] 이(가) 조건에 의해 해제되었습니다.`,
                        successCheck: false,
                        duration: 6000,
                    });
                }
                return { ...group, lists: after };
            }
            return group;
        });

        setSelected_Lists(cleaned);
    };

    return (
        <FilterContainerMainDivBox>
            <div>
                <div className="Filter_Lists_Container">
                    <div className="Labeling"> 일 시 </div>
                    <ul>
                        <li>
                            <input
                                style={{ border: 'none', outline: 'none' }}
                                type="date"
                                placeholder="날짜."
                                value={Selected_Date}
                                onChange={e => setSelected_Date(e.target.value)}
                            ></input>
                        </li>
                    </ul>
                </div>
                <div className="Filter_Lists_Container">
                    <div className="Labeling"> 장 소 </div>
                    <ul>
                        {Lists.find(item => item.Type === 'place').lists.map(list => {
                            return (
                                <li
                                    onClick={() => SelectedData('place', list.value)}
                                    className={
                                        Selected_Lists.find(item => item.Type === 'place').lists.includes(list.label) ? 'selected' : ''
                                    }
                                >
                                    {list.label}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="Filter_Lists_Container">
                    <div className="Labeling"> 부 서 </div>
                    <ul>
                        {Lists.find(item => item.Type === 'department').lists.map(list => {
                            return Selected_Lists.find(item => item.Type === 'place').lists.some(matching =>
                                list.placeMatch.includes(matching)
                            ) ? (
                                <li className="disabled" key={list.value}>
                                    {list.label}
                                </li>
                            ) : (
                                <li
                                    key={list.value}
                                    onClick={() => SelectedData('department', list.value)}
                                    className={
                                        Selected_Lists.find(item => item.Type === 'department').lists.includes(list.label) ? 'selected' : ''
                                    }
                                >
                                    {list.label}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="Filter_Lists_Container">
                    <div className="Labeling"> 팀 명 </div>
                    <ul>
                        {Lists.find(item => item.Type === 'team').lists.map(list => {
                            return Selected_Lists.find(item => item.Type === 'department').lists.some(matching =>
                                list.departmentMatch.includes(matching)
                            ) ||
                                Selected_Lists.find(item => item.Type === 'place').lists.some(matching =>
                                    list.placeMatch.includes(matching)
                                ) ? (
                                <li key={list.value} className="disabled">
                                    {list.label}
                                </li>
                            ) : (
                                <li
                                    key={list.value}
                                    onClick={() => SelectedData('team', list.value)}
                                    className={
                                        Selected_Lists.find(item => item.Type === 'team').lists.includes(list.label) ? 'selected' : ''
                                    }
                                >
                                    {list.label}
                                </li>
                            );
                        })}
                        {/* })} */}
                    </ul>
                </div>
                <div className="Filter_Lists_Container">
                    <div className="Labeling"> 구 분 </div>
                    <ul>
                        {Lists.find(item => item.Type === 'division').lists.map(list => {
                            return (
                                <li
                                    key={list.value}
                                    onClick={() => SelectedData('division', list.value)}
                                    className={
                                        Selected_Lists.find(item => item.Type === 'division').lists.includes(list.label) ? 'selected' : ''
                                    }
                                >
                                    {list.label}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="Filter_Selected_Lists_Container">
                <ul>
                    <li
                        className="Incons"
                        style={{ backgroundColor: '#fff' }}
                        onClick={() =>
                            setSelected_Lists([
                                { Type: 'place', lists: [] },
                                { Type: 'department', lists: [] },
                                { Type: 'team', lists: [] },
                                { Type: 'division', lists: [] },
                            ])
                        }
                    >
                        <FiRotateCw />
                    </li>
                    {Selected_Lists.map(list => {
                        return list.lists.map(item => {
                            return (
                                <li onClick={() => SelectedData(list.Type, item)} key={item}>
                                    <span>{item}</span>{' '}
                                    <span>
                                        <GrClose />
                                    </span>
                                </li>
                            );
                        });
                    })}
                </ul>
            </div>
        </FilterContainerMainDivBox>
    );
};

export default FilterContainer;
