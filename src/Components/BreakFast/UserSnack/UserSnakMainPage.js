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
import SnakCountModal from './Modal/SnakCountModal';

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
    const [SnakCountModalIsOpens, setSnakCountModalIsOpens] = useState(false);
    const [SnacksCounts, setSnacksCounts] = useState(1);
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
            if (Select_Menus === 'Snacks') {
                setSnacksCounts(1);
                setSnakCountModalIsOpens(true);
            } else {
                const Open_Confirm = submit(Select_Menus);
            }
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
            message: `${Select_Menus === 'Coffee' ? '커피' : '스낵'} 1회 이용당 ${
                Select_Menus === 'Coffee' ? 700 : 300
            }Will이 청구 됩니다.`,
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
                SnacksCounts,
            }
        );
        if (Submit_For_Save_Data_UseSnacks_Axios.status) {
            setSelected_User(null);
            setSnacksCounts(1);
            setSnakCountModalIsOpens(false);
            return toast.show({
                title: `등록 완료. 소소한 평온 받으세요. `,
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
                <NavigationMainPage TitleName="소소한 평온을 담은 쉼터"></NavigationMainPage>
                <div className="Survay_Main_Content">
                    <div>
                        <div>*주의사항</div>
                        <ul style={{ fontSize: '16px' }}>
                            <li>
                                <div className="Word_DIV">원활하고 쾌적한 운영을 위해 이용시 Will이 청구됩니다.</div>
                                <div style={{ textAlign: 'start', color: 'red', marginTop: '10px' }}>{'<커피 700Will / 스낵 300Will>'}</div>
                            </li>
                            <li>
                                <div className="Word_DIV">커피머신 사용 후 주변 청결을 유지해주세요.</div>
                            </li>
                            <li>
                                <div className="Word_DIV">모두가 함께 사용하는 회사자원이므로 낭비는 자제해주세요.</div>
                            </li>
                            <h4 style={{}}>"A little kindness goes a long way"</h4>
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
            <SnakCountModal
                SnakCountModalIsOpens={SnakCountModalIsOpens}
                setSnakCountModalIsOpens={() => setSnakCountModalIsOpens(false)}
                setSnacksCounts={data => setSnacksCounts(data)}
                SnacksCounts={SnacksCounts}
                Submit_For_Save_Data_UseSnacks={() => Submit_For_Save_Data_UseSnacks('Snacks')}
            ></SnakCountModal>
        </UserBreakFastMainPageMainDivBox>
    );
};

export default UserSnakMainPage;
