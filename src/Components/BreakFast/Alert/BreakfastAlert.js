import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Axios_Post_Moduls, request } from '../../../API';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from '../../ToasMessage/ToastManager';

const BreakfastAlertMainDivBox = styled.div`
    padding: 30px;
`;

const BreakfastAlert = () => {
    const history = useHistory();
    const { Food_Data } = useParams();
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [CompanyChecking, setCompanyChecking] = useState(false);
    const [Food_URL, setFood_URL] = useState(null);
    const Sending_BreakFast_Data_Mail = async () => {
        try {
            const Sending_BreakFast_Data_Mail_Axios = await Axios_Post_Moduls(`/FoodApp/Sending_BreakFast_Data_Mail`, {
                Food_Data,
                name: LoginInfo.Login_name,
                id: LoginInfo.Login_id,
            });

            if (Sending_BreakFast_Data_Mail_Axios) {
                setFood_URL(Sending_BreakFast_Data_Mail_Axios[0].breakfast_info_image_src);
            } else {
                toast.show({
                    title: `IT팀에게 문의바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (LoginInfo.Login_company === 'DHKS') {
            Sending_BreakFast_Data_Mail();
        } else if (!LoginInfo.Login_token) {
            history.push('/Login_Page');
        } else {
            alert('죄송합니다. DHKS 임직원만 신청 가능합니다.');
            setCompanyChecking(true);
        }
    }, []);
    return (
        <BreakfastAlertMainDivBox>
            {CompanyChecking ? (
                <div>
                    <h2>죄송합니다.</h2>
                    <h2>DHKS 임직원만 신청 가능합니다.</h2>
                </div>
            ) : (
                <div>
                    <h2>조식 자동 발주 안내.</h2>
                    <div>
                        <img width={'100%'} src={`${process.env.REACT_APP_DB_HOST}/FoodImages/${Food_URL}`}></img>
                    </div>
                    <div style={{ lineHeight: '40px' }}>
                        <div>
                            <strong>{Food_Data}</strong>
                            <span>의 조식 정리를 해 주셔서 감사합니다.</span>
                        </div>
                        <div>빠른 시일 내에</div>
                        <div>소정의 Will을 지급 예정입니다.</div>
                    </div>
                </div>
            )}
        </BreakfastAlertMainDivBox>
    );
};

export default BreakfastAlert;
