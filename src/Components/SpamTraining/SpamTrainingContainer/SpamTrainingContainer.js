import React,{useEffect} from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { request } from "../../../API";
import { GoAlert } from "react-icons/go";

const SpamTrainingContainerMainDivBox = styled.div`

 .TopBar {
        height: 100px;
        background-color: #e04239;
    }
    .ContentContainer {
        width: 50%;
        margin: 0 auto;
        margin-top: 15vh;
        .ContentTitle {
            display: flex;
            align-items: center;
            .ContentIcons {
                font-size: 3em;
                color: #e04239;
            }
            .ContentText {
                font-size: 1.5em;
                margin-left: 30px;
            }
        }
        .ContentContents {
            padding-left: 80px;
            line-height: 40px;
            font-size:1.2em;
        }
    }
    li{
        list-style: decimal;
    }
`

const SpamTrainingContainer = () => {
     const { id, date,company } = useParams();

    useEffect(() => {
        SendDataIp();
    }, []);

    const SendDataIp = async () => {
        try {
            const SendDataIpFromServer = await request.get(`/FoodApp/Spam_Ip_Getting`, {
                params: {
                    id,
                    date,
                    company
                },
            });

            if (SendDataIpFromServer.data.dataSuccess) {
                console.log(SendDataIpFromServer);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <SpamTrainingContainerMainDivBox>
             <div className="TopBar"></div>
            <div className="ContentContainer">
                <div className="ContentTitle">
                    <div className="ContentIcons">
                        <GoAlert></GoAlert>
                    </div>
                    <div className="ContentText">
                        <h2>클릭 하신 메일은 스팸메일 테스트 메일입니다.</h2>
                    </div>
                </div>
                <div className="ContentContents">
                    {/* <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>스팸메일을 클릭 하셨습니다.</div> */}
                    <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>하단의 지시에따라, 대응바랍니다.</div>
                    <ul>
                        <li>인터넷을(랜선 및 와이파이) 연결을 차단 해주세요.</li>
                        <li>설치되어있는 Trendmicro를 사용하여 '바이러스 검사'를 실행 해주세요.</li>
                        <li>즉시, IT담당자에게 연락 해주세요.</li>
                    </ul>
                </div>
            </div>
        </SpamTrainingContainerMainDivBox>
    )
}
export default SpamTrainingContainer