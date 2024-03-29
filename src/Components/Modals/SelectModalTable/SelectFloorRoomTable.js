import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
const SelectFloorRoomTableMainDivBox = styled.div``;

const SelectFloorRoomTable = ({ RoomDatas, SelectModalData, Room_Datas, setSelectModalData }) => {
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
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    return (
        <SelectFloorRoomTableMainDivBox>
            <div className="Main_Room_title">
                <div className="TableInTableLine">
                    {TimeContents.map(list => {
                        return (
                            <div
                                key={list.Times}
                                className="Main_TimeLine_Content"
                                style={list.businessCheck ? {} : { backgroundColor: 'lightgray' }}
                            ></div>
                        );
                    })}

                    {Room_Datas.map((list, i) => {
                        return (
                            <div
                                style={{
                                    left: `${list.PostionLeftPxCal * 40 + 4}px`,
                                    width: `${list.WidthLeftPxCal * 40 - 8}px`,
                                    height: '90%',
                                }}
                                className="Reservation_Room_Container"
                                key={list.scheduleId}
                            >
                                <div
                                    className="Reservation_Room_date"
                                    style={SelectModalData.scheduleId === list.scheduleId ? { background: 'orange', color: '#fff' } : {}}
                                    onClick={() => setSelectModalData(list)}
                                >
                                    <div className="ContentTextCotainer">
                                        <div className="ContentTitle">
                                            {list.class === 'PRIVATE'
                                                ? LoginInfo.Login_name === list.subject.split('____')[1] ||
                                                  LoginInfo.Login_name === list.attendees[0].displayName.split('/')[0]
                                                    ? list.subject.split('____')[0]
                                                    : '비공개'
                                                : list.subject.split('____')[0]}
                                        </div>
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
                                        ) : moment(list.startTime.dateTime).format('YYYY-MM-DD') ===
                                          moment(list.endTime.dateTime).format('YYYY-MM-DD') ? (
                                            <div className="Content_times">
                                                {moment(list.startTime.dateTime).format('HH:mm')} ~{' '}
                                                {moment(list.endTime.dateTime).format('HH:mm')}
                                            </div>
                                        ) : (
                                            <div className="Content_times">
                                                {moment(list.startTime.dateTime).format('MM월 DD일')} ~{' '}
                                                {moment(list.endTime.dateTime).format('MM월 DD일')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </SelectFloorRoomTableMainDivBox>
    );
};

export default SelectFloorRoomTable;
