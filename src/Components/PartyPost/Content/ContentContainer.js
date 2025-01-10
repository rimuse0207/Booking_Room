import React from 'react';
import styled from 'styled-components';
import NaviBar from './NaviBar/NaviBar';
import InfoBoxMainPage from './InfoBox/InfoBoxMainPage';
import PatrolBox from './PatrolBox/PatrolBox';
import ArgumentsBox from './ArgumentsBox/ArgumentsBox';
import SiginificantBox from './SignificantBox/SiginificantBox';
import InspectionBox from './InspectionBox/InspectionBox';
import { request } from '../../../API';
import { useSelector } from 'react-redux';
import { BsFillFileEarmarkExcelFill, BsFillFilePdfFill } from 'react-icons/bs';
import { toast } from '../../ToasMessage/ToastManager';
import { useHistory } from 'react-router-dom';

const ContentContainerMainDivBox = styled.div`
    .Main_Body_Container {
        margin: 40px;
    }
    .Button_Cotainer {
        width: 500px;
        width: 100%;
        text-align: center;
        margin-top: 50px;
        margin-bottom: 50px;
        button {
            width: 500px;
            height: 60px;
            border: none;
            font-weight: bolder;
            font-size: 1.1em;
            border-radius: 5px;
            :hover {
                cursor: pointer;
            }
            @media only screen and (max-width: 800px) {
                width: 90px !important;
                font-size: 0.9em;
            }
        }
        .Cancle {
            background-color: orange;
            margin-right: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: orange;
            }
            @media only screen and (max-width: 800px) {
                margin-right: 10px;
            }
        }
        .Delete {
            background-color: red;
            margin-left: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: red;
            }
            @media only screen and (max-width: 800px) {
                margin-left: 10px;
            }
        }
        .Submit {
            background-color: green;
            margin-right: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: green;
            }
            @media only screen and (max-width: 800px) {
                margin-right: 10px;
            }
        }
    }
    position: relative;
    .File_Download_Container {
        position: absolute;
        top: 20px;
        right: 50px;
        display: flex;
        text-align: center;
        font-size: 1.3em;
        :hover {
            cursor: pointer;
        }
    }
`;

const ContentContainer = () => {
    const history = useHistory();
    const Party_Post_State = useSelector(state => state.PartyPostReduce.Party_Post_State);

    const Handle_Click_File_Download = async Select_Menu => {
        if (Select_Menu === 'contact') {
            const Handle_Click_File_Download_Axios = await request.get('/PartyPost/emergency_phone_number');
        } else {
            const Handle_Click_File_Download_Axios = await request.get('/PartyPost/checklist_down');
        }
    };

    const Handle_Save_Party_Post_Sending_Message = async () => {
        if (!Party_Post_State.Info_State.Select_User) {
            alert('당직자 명을 입력 해 주세요.');
            return;
        }
        try {
            const Handle_Save_Party_Post_Sending_Message_Axios = await request.post('/PartyPost/Handle_Save_Party_Post_Sending_Message', {
                Party_Post_State,
            });
            if (Handle_Save_Party_Post_Sending_Message_Axios) {
                toast.show({
                    title: `당직근무 고생하셨습니다. 정상적으로 메일 & 메시지를 전송하였습니다.`,
                    successCheck: true,
                    duration: 6000,
                });

                history.push('/');
            } else {
                toast.show({
                    title: `메일 & 메시지 전송에 실패하였습니다. 다시 시도 해 주세요.`,
                    successCheck: false,
                    duration: 6000,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ContentContainerMainDivBox>
            <NaviBar></NaviBar>
            <div className="Main_Body_Container">
                <InfoBoxMainPage></InfoBoxMainPage>
                <PatrolBox></PatrolBox>
                <ArgumentsBox></ArgumentsBox>
                {/* <SiginificantBox></SiginificantBox> */}
                <InspectionBox></InspectionBox>
            </div>
            <div className="Button_Cotainer">
                <button
                    className="Submit"
                    onClick={() => {
                        Handle_Save_Party_Post_Sending_Message();
                    }}
                >
                    메일 & 문자 발송
                </button>
            </div>

            <div className="File_Download_Container">
                <a href={`${process.env.REACT_APP_DB_HOST}/PartyPost/phone.xls`} style={{ color: 'black' }}>
                    <div style={{ marginRight: '50px' }}>
                        <div style={{ color: 'green', fontSize: '1.3em' }}>
                            <BsFillFileEarmarkExcelFill></BsFillFileEarmarkExcelFill>
                        </div>
                        <div>비상 연락망</div>
                    </div>
                </a>
                <a href={`${process.env.REACT_APP_DB_HOST}/PartyPost/check.pdf`} style={{ color: 'black' }}>
                    <div>
                        <div style={{ color: 'red', fontSize: '1.3em' }}>
                            <BsFillFilePdfFill></BsFillFilePdfFill>
                        </div>
                        <div>건물 체크 순서도</div>
                    </div>
                </a>
            </div>
        </ContentContainerMainDivBox>
    );
};

export default ContentContainer;
