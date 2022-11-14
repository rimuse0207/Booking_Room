import React, { useCallback, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment/moment';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from '../../ToasMessage/ToastManager';
import 'moment/locale/ko';
import { ko } from 'date-fns/esm/locale';
import { Loader_Check_For_False, Loader_Check_For_True } from '../../../Models/LoaderCheckReducer/LoaderCheckReducer';
import LoaderMainPage from '../../Loader/LoaderMainPage';

moment.locale('ko');
const FoodSelectContainerMainDivBox = styled.div`
    width: 80%;
    margin: 0 auto;
    min-height: 100vh;
    padding-top: 30px;
    .UploadInput_Container {
        height: 100%;
        min-height: 250px;
        position: relative;
        background-repeat: no-repeat;
        background-size: cover;
        background-position-y: center;
        .UploadImage {
            background-repeat: no-repeat;
            background-size: cover;
            background-position-y: center;
            min-height: 250px;
        }
        .DeleteButton {
            color: red;
            position: absolute;
            top: -20px;
            right: 0px;
        }
        .File_UploadInput {
            width: 100%;
            max-width: 500px;
            height: 250px;
        }
        input[type='file'] {
            -webkit-appearance: none;
            appearance: none;
        }
        input[type='file']::-webkit-file-upload-button {
            width: 100px;
            height: 100%;
            opacity: 0;
            -webkit-appearance: none;
            appearance: none;
        }

        .ImageNothing {
            position: absolute;
            left: 0;
            top: 0;
            background-image: url('icon.png');
            background-repeat: no-repeat;
            background-size: cover;
            width: 100%;
            height: 200px;
        }
    }

    .UploadButtonDiv {
        width: 100%;
        height: 40px;
        border-radius: 5px;
        margin-top: 20px;
        button {
            border: none;
            display: block;
            background-color: #3ca9e2;
            color: #fff;
            font-weight: bold;
            text-transform: uppercase;
            cursor: pointer;
            -webkit-transition: all 0.2s ease;
            transition: all 0.2s ease;
            font-size: 18px;
            position: relative;
            display: inline-block;
            cursor: pointer;
            text-align: center;
            width: 100%;
            height: 100%;
            border-radius: 5px;
        }
        button:hover {
            background-color: #329dd5;
            -webkit-transition: all 0.2s ease;
            transition: all 0.2s ease;
        }
    }
`;

const FoodSelectContainer = ({ history }) => {
    const dispatch = useDispatch();
    const [FileStateData, setFileStateData] = useState(null);
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const Loading = useSelector(state => state.LoaderCheckingRedux.loading);
    const inputRef = useRef(null);

    const onUploadImage = useCallback(async e => {
        dispatch(Loader_Check_For_False());
        if (!e.target.files) {
            dispatch(Loader_Check_For_False());
            return;
        }
        dispatch(Loader_Check_For_True());
        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        const dataSendImageFromServer = await axios.post(`${process.env.REACT_APP_DB_HOST}/FoodApp/FoodImageUpload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (dataSendImageFromServer.data.dataSuccess) {
            setTimeout(() => {
                setFileStateData(dataSendImageFromServer.data.Image_data);
                dispatch(Loader_Check_For_False());
            }, [2000]);
        } else {
            dispatch(Loader_Check_For_False());
        }
    }, []);

    const handleDeleteFromServerImage = async () => {
        dispatch(Loader_Check_For_True());
        try {
            const DeleteFromServerImage = await axios.post(`${process.env.REACT_APP_DB_HOST}/FoodApp/FoodImageDelete`, FileStateData);

            if (DeleteFromServerImage.data.dataSuccess) {
                dispatch(Loader_Check_For_False());
                setFileStateData(null);
                if (!inputRef.current) {
                    return;
                }
                inputRef.current.value = '';
                dispatch(Loader_Check_For_False());
            } else {
                dispatch(Loader_Check_For_False());
            }
        } catch (error) {
            console.log(error);
            dispatch(Loader_Check_For_False());
        }
    };

    const handleUploadDataFromServer = async () => {
        try {
            if (!LoginInfo.Login_name) {
                toast.show({
                    title: `로그인 후 업로드가 가능합니다.`,
                    successCheck: false,
                    duration: 6000,
                });
                return;
            }

            if (!FileStateData) {
                toast.show({
                    title: `파일 업로드 후 가능합니다.`,
                    successCheck: false,
                    duration: 6000,
                });
                return;
            }
            dispatch(Loader_Check_For_True());

            const UploadDataFromServer = await axios.post(`${process.env.REACT_APP_DB_HOST}/FoodApp/FoodDataSend`, {
                FileStateData,
                LoginInfo,
            });

            if (UploadDataFromServer.data.dataSuccess) {
                toast.show({
                    title: `업로드가 완료되었습니다. 감사합니다.`,
                    successCheck: true,
                    duration: 6000,
                });
                setTimeout(() => {
                    window.location.href = '/Today_Food';
                }, 3000);

                dispatch(Loader_Check_For_False());
            } else {
                dispatch(Loader_Check_For_False());
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: `업로드 실패 재 시도 바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
            dispatch(Loader_Check_For_False());
        }
    };

    useEffect(() => {
        if (LoginInfo.Login_token) {
            dispatch(Loader_Check_For_False());
        } else {
            history.push('/Today_Food');
        }
    }, []);

    return (
        <FoodSelectContainerMainDivBox>
            <div>
                <h2>사진 업로드</h2>
            </div>
            <div>
                <h3>{moment().lang('ko').format('YYYY년 MM월 DD일 dddd')}</h3>
            </div>
            {FileStateData ? (
                <div className="UploadInput_Container">
                    <div
                        className="UploadImage"
                        style={{
                            backgroundImage: `url(${process.env.REACT_APP_DB_HOST}/FoodImages/${
                                FileStateData.filename.split('.')[0]
                            }_resize.jpg)`,
                        }}
                    ></div>
                    <div className="DeleteButton" onClick={() => handleDeleteFromServerImage()}>
                        <RiDeleteBin6Line></RiDeleteBin6Line>
                    </div>
                </div>
            ) : (
                <div className="UploadInput_Container" style={{ backgroundImage: `url(icon.png)` }}>
                    <input
                        className="File_UploadInput"
                        type="file"
                        accept="image/*"
                        name="thumbnail"
                        ref={inputRef}
                        onChange={onUploadImage}
                    />
                </div>
            )}

            <div style={{ marginTop: '20px' }}>
                <div>
                    <span>회사 : </span>
                    <span>{LoginInfo.Login_company}</span>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <span>이름 : </span>
                    <span>{LoginInfo.Login_name}</span>
                </div>
                <div></div>
            </div>
            <div className="UploadButtonDiv">
                <button onClick={() => handleUploadDataFromServer()}>업로드</button>
            </div>
            {/* 로딩 컴포넌트 시작 */}
            <LoaderMainPage loading={Loading}></LoaderMainPage>
            {/* 로딩 컴포넌트 끝 */}
        </FoodSelectContainerMainDivBox>
    );
};

export default FoodSelectContainer;
