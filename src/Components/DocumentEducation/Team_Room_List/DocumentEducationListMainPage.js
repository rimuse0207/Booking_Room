import React from 'react';
import styled from 'styled-components';
import ListContainer from './Team_List_Container/TeamListContainer';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Axios_Get_Moduls, request } from '../../../API';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from '../../ToasMessage/ToastManager';
import VideoPlayer from './VideoPlayer';
import { FaPlay } from 'react-icons/fa';

const TeamRoomListMainPageMainDivBox = styled.div`
    padding: 10px;
    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes fade-in-background {
        from {
            opacity: 0;
        }
        to {
            opacity: 0.5;
        }
    }

    @keyframes fade-out {
        from {
            opacity: 1;
        }
        to {
            opacity: 0.2;
        }
    }
    .Movie_Main_Container {
        ul {
            display: flex;
            flex-flow: wrap;
            justify-content: space-around;
            li {
                margin-right: 10px;
                margin-top: 20px;
                margin-bottom: 40px;
                text-align: center;
                border: 1px solid lightgray;
                border-radius: 10px;
                .Video_Container {
                    position: relative;

                    :hover {
                        cursor: pointer;
                        video {
                            z-index: 2;
                            animation: fade-out 0.5s;
                            animation-fill-mode: forwards;
                        }
                        .PlayIcons {
                            z-index: 3;
                            animation: fade-in 0.4s;
                            animation-fill-mode: forwards;
                            display: inline-block;
                        }
                        .Background_Black {
                            z-index: 3;
                            animation: fade-in-background 0.4s;
                            animation-fill-mode: forwards;
                            display: inline-block;
                        }
                    }
                    video {
                        width: 400px;
                        height: 250px;
                        z-index: 3;
                    }
                    .PlayIcons {
                        position: absolute;
                        top: 42%;
                        left: 42%;
                        font-size: 3em;
                        opacity: 0;
                        z-index: 2;
                    }
                    .Background_Black {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        opacity: 0;
                        background-color: darkgray;
                    }
                }
                .Document_Movie_Title {
                    margin-top: 20px;
                    margin-bottom: 10px;
                    font-size: 1.5em;
                }
            }
        }
    }
`;

const headerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'blue',
};

const titleStyle = {
    color: 'blue', // h1의 색깔을 파란색으로 설정
    textDecoration: 'none',
};

const TeamRoomListMainPage = () => {
    const [EducationMovieData, setEducationMovieData] = useState([
        { indexs: 1, Movie_url: 'http://192.168.2.241:3001/overseas/a_sk.mp4', Movie_Name: '통신비 정산 ( SKT )' },
        { indexs: 2, Movie_url: 'http://192.168.2.241:3001/overseas/a_kt.mp4', Movie_Name: '통신비 정산 ( KT )' },
        { indexs: 3, Movie_url: 'http://192.168.2.241:3001/overseas/meal.mp4', Movie_Name: '식대정산' },
        { indexs: 4, Movie_url: 'http://192.168.2.241:3001/overseas/card.mp4', Movie_Name: '출장 정산 - 해외 ( 법인카드 사용 시 )' },
        { indexs: 5, Movie_url: 'http://192.168.2.241:3001/overseas/nocard.mp4', Movie_Name: '출장 정산 - 해외 ( 법인카드 미 사용 시 )' },
        { indexs: 6, Movie_url: 'http://192.168.2.241:3001/overseas/japan.mp4', Movie_Name: '일본어 교육비 정산' },
        { indexs: 7, Movie_url: 'http://192.168.2.241:3001/overseas/copy.mp4', Movie_Name: '전표 복사하여 붙여 넣는 법' },
        {
            indexs: 8,
            Movie_url: 'http://192.168.2.241:3001/overseas/err.mp4',
            Movie_Name: '자금 계획서에 입출금 구분을 할 수 없습니다. 오류',
        },
    ]);

    const HandleClick_Video = list => {
        window.open(list.Movie_url, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=100,width=1200px,height=800px');
    };

    return (
        <TeamRoomListMainPageMainDivBox>
            {/* {EducationMovieData.map((list, j) => {
                return (
                    <header style={headerStyle} key={list.indexs}>
                        <a href={list.Movie_url} style={titleStyle}>
                            <h1>{list.Movie_Name}</h1>
                        </a>
                    </header>
                );
            })} */}
            <div className="Movie_Main_Container">
                <ul>
                    {EducationMovieData.map((list, j) => {
                        return (
                            <li key={list.indexs}>
                                <div className="Video_Container" onClick={() => HandleClick_Video(list)}>
                                    <video src={list.Movie_url} controls={false} contentEditable={false}></video>
                                    <div className="PlayIcons">
                                        <FaPlay></FaPlay>
                                    </div>
                                    <div className="Background_Black"></div>
                                </div>
                                <div className="Document_Movie_Title"> {list.Movie_Name}</div>
                                <div></div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </TeamRoomListMainPageMainDivBox>
    );
};

export default TeamRoomListMainPage;
