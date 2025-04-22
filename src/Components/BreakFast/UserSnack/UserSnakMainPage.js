import React from 'react';
import { SurvayContainerMainDivBox } from '../../FoodSelect/SurvayContainer/SurvayContainer';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import Select from 'react-select';
import styled from 'styled-components';
import { useState } from 'react';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import { toast } from '../../ToasMessage/ToastManager';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Axios_Get_Moduls, Axios_Post_Moduls, request } from '../../../API';
import { useRef } from 'react';
import { UserBreakFastMainPageMainDivBox } from '../UserBreakFast/UserBreakFastMainPage';
import { GiCoffeeCup } from 'react-icons/gi';
import { TbCookie } from 'react-icons/tb';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const UserSnakMainPageMainDivBox = styled.div`
    display: flex;
    justify-content: space-between;
    .Select_Box_Containers {
        width: 45%;
        border: 1px solid lightgray;
        height: 20vh;
        border-radius: 10px;
        font-size: 1.5em;
        text-align: center;
    }
`;

const UserSnakMainPage = () => {
    const [UserSelectOptions, setUserSelectOptions] = useState([]);
    const [Selected_User, setSelected_User] = useState(null);

    const Getting_User_Id_Axios_Func = async () => {
        try {
            const Getting_User_Id_Axios_Func_To_Server = await axios.get(
                `${process.env.REACT_APP_DB_HOST}/FoodApp/Get_People_Infomation_For_Person_Verification`
            );

            if (Getting_User_Id_Axios_Func_To_Server.data.status) {
                setUserSelectOptions(Getting_User_Id_Axios_Func_To_Server.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const HandleClickUseSnack = Select_Menus => {
        if (Selected_User && Selected_User.value) {
            const Open_Confirm = submit(Select_Menus);
        } else {
            return toast.show({
                title: `사용자 선택 후 다시 눌러주세요.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    const handleChangeData = e => {
        console.log(e);
    };

    useEffect(() => {
        Getting_User_Id_Axios_Func();
    }, []);

    const submit = Select_Menus => {
        confirmAlert({
            title: `${Select_Menus === 'Coffee' ? '커피' : '스낵'} 1회 이용 신청`,
            message: `${Select_Menus === 'Coffee' ? '커피' : '스낵'} 1회 이용당 Will이 청구 됩니다.`,
            buttons: [
                {
                    label: '확인',
                    onClick: async () => Submit_For_Save_Data_UseSnacks(Select_Menus),
                },
                {
                    label: '아니요',
                    onClick: () => {
                        return false;
                    },
                },
            ],
        });
    };

    const Submit_For_Save_Data_UseSnacks = async Select_Menus => {
        const Submit_For_Save_Data_UseSnacks_Axios = await axios.post(
            `${process.env.REACT_APP_DB_HOST}/FoodApp/Submit_For_Save_Data_UseSnacks`,
            {
                Select_Menus,
                Selected_User,
            }
        );
        if (Submit_For_Save_Data_UseSnacks_Axios.status) {
            setSelected_User(null);
            return toast.show({
                title: `등록이 완료되었습니다. 즐거운 시간 되세요.`,
                successCheck: true,
                duration: 6000,
            });
        } else {
            return toast.show({
                title: `오류 발생. IT팀에 문의바랍니다. `,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    return (
        <UserBreakFastMainPageMainDivBox>
            <SurvayContainerMainDivBox>
                <NavigationMainPage TitleName="탕비실이용"></NavigationMainPage>
                <div className="Survay_Main_Content">
                    <div>
                        <div>*주의사항</div>
                        <ul>
                            <li>
                                <div className="Word_DIV">조식시간은 08:50 까지 입니다. 시간을 준수 해주세요.</div>
                            </li>
                            <li>
                                <div className="Word_DIV">식사 후 자리정리 및 지정된 장소에 잔반을 처리 해주세요.</div>
                            </li>
                            <li>
                                <div className="Word_DIV">비치된 식품을 식당 외부로 반출을 절대 금지합니다.</div>
                            </li>
                            <li>
                                <div className="Word_DIV">원활한 조식 운영을 위해 1식당 1,000Will이 청구됩니다.</div>
                                <div style={{ textAlign: 'end', color: 'red', marginTop: '20px' }}>
                                    *무단 취식 및 반출시 패널티 부과 예정.
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <h3>사용자 선택</h3>
                        <Select
                            value={Selected_User}
                            onChange={e => setSelected_User(e)}
                            name="colors"
                            options={UserSelectOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            isClearable
                        />
                    </div>
                    <UserSnakMainPageMainDivBox>
                        <div className="Select_Box_Containers" onClick={() => HandleClickUseSnack('Coffee')}>
                            <div style={{ color: 'brown', fontSize: '1.5em', marginTop: '5vh' }}>
                                <GiCoffeeCup />
                            </div>
                            <div>커피</div>
                        </div>
                        <div className="Select_Box_Containers" onClick={() => HandleClickUseSnack('Snacks')}>
                            <div style={{ color: 'rgb(139,69,19)', fontSize: '1.5em', marginTop: '5vh' }}>
                                <TbCookie />
                            </div>
                            <div>스낵</div>
                        </div>
                    </UserSnakMainPageMainDivBox>
                </div>
            </SurvayContainerMainDivBox>
        </UserBreakFastMainPageMainDivBox>
    );
};

export default UserSnakMainPage;
