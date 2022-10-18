import React, { useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const FloorRoomTableMainDivBox = styled.div`
    .tooltip {
        position: relative;
        display: inline-block;
        border-bottom: 1px dotted black;
    }

    .tooltip .tooltiptext {
        visibility: hidden;
        width: 120px;
        background-color: #555;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        margin-left: -60px;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .tooltip .tooltiptext::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;
    }

    .tooltip:hover .tooltiptext {
        visibility: visible;
        opacity: 1;
    }
`;

const FloorRoomTable = ({
    Room_Name,
    Room_Datas,
    handleTableTimeSelect,
    setSelectModalIsOpen,
    setSelectModalData,
    setSelectModalRomms_Data,
}) => {
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [TimeContents, setTimeContents] = useState([
        { colors: 'lightgray', Times: '00:00', businessCheck: false },
        { colors: 'lightgray', Times: '00:30', businessCheck: false },
        { colors: 'lightgray', Times: '01:00', businessCheck: false },
        { colors: 'lightgray', Times: '01:30', businessCheck: false },
        { colors: 'lightgray', Times: '02:00', businessCheck: false },
        { colors: 'lightgray', Times: '02:30', businessCheck: false },
        { colors: 'lightgray', Times: '03:00', businessCheck: false },
        { colors: 'lightgray', Times: '03:30', businessCheck: false },
        { colors: 'lightgray', Times: '04:00', businessCheck: false },
        { colors: 'lightgray', Times: '04:30', businessCheck: false },
        { colors: 'lightgray', Times: '05:00', businessCheck: false },
        { colors: 'lightgray', Times: '05:30', businessCheck: false },
        { colors: 'lightgray', Times: '06:00', businessCheck: false },
        { colors: 'lightgray', Times: '06:30', businessCheck: false },
        { colors: 'lightgray', Times: '07:00', businessCheck: false },
        { colors: 'lightgray', Times: '07:30', businessCheck: false },
        { colors: 'lightgray', Times: '08:00', businessCheck: false },
        { colors: 'lightgray', Times: '08:30', businessCheck: false },
        { colors: 'white', Times: '09:00', businessCheck: true },
        { colors: 'white', Times: '09:30', businessCheck: true },
        { colors: 'white', Times: '10:00', businessCheck: true },
        { colors: 'white', Times: '10:30', businessCheck: true },
        { colors: 'white', Times: '11:00', businessCheck: true },
        { colors: 'white', Times: '11:30', businessCheck: true },
        { colors: 'white', Times: '12:00', businessCheck: true },
        { colors: 'white', Times: '12:30', businessCheck: true },
        { colors: 'white', Times: '13:00', businessCheck: true },
        { colors: 'white', Times: '13:30', businessCheck: true },
        { colors: 'white', Times: '14:00', businessCheck: true },
        { colors: 'white', Times: '14:30', businessCheck: true },
        { colors: 'white', Times: '15:00', businessCheck: true },
        { colors: 'white', Times: '15:30', businessCheck: true },
        { colors: 'white', Times: '16:00', businessCheck: true },
        { colors: 'white', Times: '16:30', businessCheck: true },
        { colors: 'white', Times: '17:00', businessCheck: true },
        { colors: 'white', Times: '17:30', businessCheck: true },
        { colors: 'white', Times: '18:00', businessCheck: true },
        { colors: 'lightgray', Times: '18:30', businessCheck: false },
        { colors: 'lightgray', Times: '19:00', businessCheck: false },
        { colors: 'lightgray', Times: '19:30', businessCheck: false },
        { colors: 'lightgray', Times: '20:00', businessCheck: false },
        { colors: 'lightgray', Times: '20:30', businessCheck: false },
        { colors: 'lightgray', Times: '21:00', businessCheck: false },
        { colors: 'lightgray', Times: '21:30', businessCheck: false },
        { colors: 'lightgray', Times: '22:00', businessCheck: false },
        { colors: 'lightgray', Times: '22:30', businessCheck: false },
        { colors: 'lightgray', Times: '23:00', businessCheck: false },
        { colors: 'lightgray', Times: '23:30', businessCheck: false },
    ]);

    const HandleClicks = times => {
        const datas = {
            StartTime: times,
            SelectRoom: Room_Name,
            SelectRoomInfo: Room_Datas,
        };
        handleTableTimeSelect(datas);
    };
    return (
        <FloorRoomTableMainDivBox className="Main_Room_title">
            <div className="TableInTableLine">
                {TimeContents.map(list => {
                    return (
                        <div
                            key={list.Times}
                            className="Main_TimeLine_Content"
                            style={list.businessCheck ? {} : { backgroundColor: 'lightgray' }}
                            onClick={() => HandleClicks(list.Times)}
                        ></div>
                    );
                })}

                {Room_Datas.map((list, i) => {
                    return (
                        <div key={list.scheduleId}>
                            <div
                                style={{
                                    left: `${list.PostionLeftPxCal * 60 + 5}px`,
                                    width: `${list.WidthLeftPxCal * 60 - 10}px`,
                                    height: '100%',
                                }}
                                className="Reservation_Room_Container"
                            >
                                <div
                                    className="Reservation_Room_date"
                                    onClick={() => {
                                        setSelectModalIsOpen();
                                        setSelectModalData(list);
                                        setSelectModalRomms_Data({ SelectRoom: Room_Name, SelectRoomInfo: Room_Datas });
                                    }}
                                    style={
                                        LoginInfo.Login_name === list.subject.split('____')[1] ||
                                        LoginInfo.Login_name === list.attendees[0].displayName.split('/')[0]
                                            ? { backgroundColor: '#368', color: '#fff' }
                                            : {}
                                    }
                                >
                                    <div className="ContentTextCotainer">
                                        <div className="ContentTitle">{list.class === 'PUBLIC' ? list.subject : '비공개'}</div>
                                        <div className="Content_useId">
                                            {list.subject.split('____').length > 1
                                                ? list.subject.split('____')[1]
                                                : list.attendees[0].displayName.split('/')[0]}
                                        </div>
                                        {list.allDayYn === 'Y' ? (
                                            <div className="Content_times">
                                                {moment(list.startTime.date).format('MM월 DD일')} ~{' '}
                                                {moment(list.endTime.date).format('MM월 DD일')}
                                            </div>
                                        ) : (
                                            <div className="Content_times">
                                                {moment(list.startTime.dateTime).format('HH:mm')} ~{' '}
                                                {moment(list.endTime.dateTime).format('HH:mm')}
                                            </div>
                                        )}
                                    </div>
                                    {/* <div className="Reservation_Room_date tooltip">
                                        <div className="tooltiptext">Tooltip text</div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </FloorRoomTableMainDivBox>
    );
};

export default FloorRoomTable;
