import React from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import axios from 'axios';
import moment from 'moment';
import { useEffect } from 'react';
import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Axios_Get_Moduls, request } from '../../../API';
import { toast } from '../../ToasMessage/ToastManager';
const AdminImageShowMainPageMainDivBox = styled.div`
    min-height: 100vh;
    width: 100%;
    padding-bottom: 50px;
    .Image_Checking_Container {
        margin-top: 30px;

        width: 100%;

        .Main_Content_Container {
            margin-top: 30px;
        }

        .Image_Container {
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
            height: 300px;
            background-size: cover;
            background-repeat: no-repeat;
            background-position-y: center;
        }
        .Info_Cotainer {
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
            display: flex;
            height: 50px;
            justify-content: space-around;
            align-items: center;
            border: 1px solid lightgray;
        }
    }

    .DateClickContainer {
        display: flex;
        width: 100%;
        justify-content: space-around;
        font-size: 1.2em;
    }
`;

const AdminImageShowMainPage = () => {
    const history = useHistory();
    const [ImageUrlInfo, setImageUrlInfo] = useState([]);
    const [NowDates, setNowDates] = useState(moment().format('YYYY-MM-DD'));

    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);

    const getAllImageData = async () => {
        try {
            const getAllImageDataFromServer = await Axios_Get_Moduls(`/FoodApp/getAllImageDataFromServer`, {
                times: NowDates,
            });

            if (getAllImageDataFromServer) {
                setImageUrlInfo(getAllImageDataFromServer);
            } else
                toast.show({
                    title: `IT팀에게 문의바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (LoginInfo.Login_id === 'sjyoo@dhk.co.kr' || LoginInfo.Login_id === 'jychoi@dhk.co.kr') {
            getAllImageData();
        } else {
            history.push('/Today_Food');
        }
    }, [NowDates]);

    return (
        <AdminImageShowMainPageMainDivBox>
            <NavigationMainPage TitleName="잔반 이미지 확인"></NavigationMainPage>
            <div className="Image_Checking_Container">
                <div className="DateClickContainer">
                    <div onClick={() => setNowDates(moment(NowDates).subtract(1, 'days').format('YYYY-MM-DD'))}>
                        <IoIosArrowBack></IoIosArrowBack>
                    </div>
                    <div>{moment(NowDates).format('YYYY-MM-DD')}</div>
                    <div onClick={() => setNowDates(moment(NowDates).add(1, 'days').format('YYYY-MM-DD'))}>
                        <IoIosArrowForward></IoIosArrowForward>
                    </div>
                </div>
                {ImageUrlInfo.map((list, i) => {
                    return (
                        <div className="Main_Content_Container" key={list.food_image_info_image_url}>
                            <div
                                className="Image_Container"
                                style={{
                                    backgroundImage: `url(${process.env.REACT_APP_DB_HOST}/FoodImages/${list.food_image_info_image_url})`,
                                }}
                            ></div>
                            <div className="Info_Cotainer">
                                <div>
                                    <BsFillPersonCheckFill></BsFillPersonCheckFill>
                                    <span style={{ marginLeft: '30px' }}>
                                        {list.brity_works_user_info_company}
                                        {'_'}
                                        {list.brity_works_user_info_name}
                                    </span>
                                </div>
                                <div>{moment(list.food_image_info_applydate).format('YYYY-MM-DD HH:mm')}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </AdminImageShowMainPageMainDivBox>
    );
};

export default AdminImageShowMainPage;
