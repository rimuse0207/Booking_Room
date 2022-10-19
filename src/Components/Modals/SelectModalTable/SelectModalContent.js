import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

const SelectModalContentMainDivBox = styled.div`
    padding: 10px;
    .BookingCheck_Cotainer {
        display: flex;
        align-items: center;
        @media only screen and (max-width: 800px) {
            display: block;
            width: 90%;
        }

        .BookingCheck_Cotainer_Title {
            width: 130px;
            font-size: 1.1em;
            @media only screen and (max-width: 800px) {
                display: block;
                width: 90%;
            }
        }
        .BookingCheck_Cotainer_SubTitle {
            min-width: 500px;
            border: 1px solid lightgray;
            height: 40px;
            line-height: 42px;
            padding-left: 15px;
            border-radius: 5px;
            @media only screen and (max-width: 800px) {
                display: block;
                width: 100% !important;
                min-width: 0px;
            }
        }
    }
`;

const SelectModalContent = ({ SelectModalData }) => {
    return (
        <SelectModalContentMainDivBox>
            <div>
                <h3>회의실 예약 확인</h3>
            </div>
            <div className="BookingCheck_Cotainer">
                <h4 className="BookingCheck_Cotainer_Title">예약 장소 : </h4>
                <div className="BookingCheck_Cotainer_SubTitle">{SelectModalData.place}</div>
            </div>
            <div className="BookingCheck_Cotainer">
                <h4 className="BookingCheck_Cotainer_Title">예약 제목 : </h4>
                <div className="BookingCheck_Cotainer_SubTitle">
                    {SelectModalData.class === 'PUBLIC' ? SelectModalData.subject.split('____')[0] : '비공개'}
                </div>
            </div>
            <div className="BookingCheck_Cotainer">
                <h4 className="BookingCheck_Cotainer_Title">예약자 : </h4>
                <div className="BookingCheck_Cotainer_SubTitle">
                    {SelectModalData.subject.split('____').length > 1
                        ? SelectModalData.subject.split('____')[1]
                        : SelectModalData.attendees[0].displayName.split('/')[0]}
                </div>
            </div>
            <div className="BookingCheck_Cotainer">
                <h4 className="BookingCheck_Cotainer_Title">예약 시간 : </h4>
                <div className="BookingCheck_Cotainer_SubTitle">
                    {SelectModalData.allDayYn === 'Y' ? (
                        <div className="Content_times">
                            {moment(SelectModalData.startTime.date).format('MM월 DD일')} ~{' '}
                            {moment(SelectModalData.endTime.date).format('MM월 DD일')}
                        </div>
                    ) : moment(SelectModalData.startTime.dateTime).format('YYYY-MM-DD') ===
                      moment(SelectModalData.endTime.dateTime).format('YYYY-MM-DD') ? (
                        <div className="Content_times">
                            {moment(SelectModalData.startTime.dateTime).format('HH:mm')} ~{' '}
                            {moment(SelectModalData.endTime.dateTime).format('HH:mm')}
                        </div>
                    ) : (
                        <div className="Content_times">
                            {moment(SelectModalData.startTime.dateTime).format('MM월 DD일')} ~{' '}
                            {moment(SelectModalData.endTime.dateTime).format('MM월 DD일')}
                        </div>
                    )}
                </div>
            </div>
        </SelectModalContentMainDivBox>
    );
};

export default SelectModalContent;
