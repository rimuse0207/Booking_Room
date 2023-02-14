import React from 'react';
import { SurvayContainerMainDivBox } from '../../FoodSelect/SurvayContainer/SurvayContainer';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import Select from 'react-select';
import styled from 'styled-components';
import { useState } from 'react';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';

const UserBreakFastMainPageMainDivBox = styled.div`
    border: 1px solid black;
    .Count_Select_Container {
        display: flex;
        align-items: center;
        button {
            height: 30px;
            width: 50px;
        }
        input {
            width: 100px;
            margin: 0px;
            text-align: center;
            font-weight: bolder;
            font-size: 1em;
        }
    }
`;

const UserBreakFastMainPage = () => {
    const [SelectBreakFast, setSelectBreakFast] = useState([]);
    const [BreakFastList, setBreakFastList] = useState([
        {
            label: '짜장라면',
            value: '짜장라면',
        },
        {
            label: '쌀국수',
            value: '쌀국수',
        },
        {
            label: '비빔라면',
            value: '비빔라면',
        },
        {
            label: '햇반',
            value: '햇반',
        },
        {
            label: '우유',
            value: '우유',
        },
    ]);

    const handleChangeData = data => {
        try {
            const InsertData = {
                label: data.label,
                value: data.value,
                count: 1,
            };

            setSelectBreakFast(SelectBreakFast.concat(InsertData));
            setBreakFastList(BreakFastList.filter(list => list.value !== data.value));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <UserBreakFastMainPageMainDivBox>
            <SurvayContainerMainDivBox>
                <NavigationMainPage TitleName="조식신청"></NavigationMainPage>
                <div className="Survay_Main_Content">
                    <div>
                        <ul>
                            <li>
                                <div>조식시간은 08:00 ~ 08:40 까지 입니다. 시간을 준수 해주세요.</div>
                                {/* <div style={{ textAlign: 'end' }}>단, 이름을 작성 하셔야 Will이 지급됩니다.</div> */}
                            </li>
                            <li>
                                <div>DHKS의 조식이므로 타사의 인원은 조식 취식을 금지합니다.</div>
                                <div style={{ textAlign: 'end', color: 'red' }}>*무단 취식시 패널티 부과 예정.</div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <select value="DHKS">
                            <option value="DHKS">DHKS</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <Select
                            // value={SurvayState.FoodSelect}
                            onChange={e => handleChangeData(e)}
                            // isMulti
                            name="colors"
                            options={BreakFastList}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>
                    <div>
                        <h4>선택목록</h4>
                        <div>
                            <ul>
                                {SelectBreakFast.map((list, j) => {
                                    return (
                                        <li>
                                            <div>
                                                <h2>{list.value}</h2>
                                                <div>
                                                    <h4>수량</h4>
                                                    <div className="Count_Select_Container">
                                                        <button>
                                                            <BiMinusCircle></BiMinusCircle>
                                                        </button>
                                                        <input type="number" value={list.count}></input>
                                                        <button>
                                                            <BiPlusCircle></BiPlusCircle>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <div style={{ marginTop: '100px', marginBottom: '70px' }}>
                        <h4>건의사항</h4>
                        <textarea placeholder="건의사항 또는 문의사항은 이쪽에 작성 부탁드립니다."></textarea>
                    </div>
                </div>
                {/* {SubmitOneClick ? (
                <div className="Button_Container">
                    <button onClick={() => SaveDataFromSurvay()}>제출하기</button>
                </div>
            ) : (
                <div>-</div>
            )} */}
            </SurvayContainerMainDivBox>
        </UserBreakFastMainPageMainDivBox>
    );
};

export default UserBreakFastMainPage;
