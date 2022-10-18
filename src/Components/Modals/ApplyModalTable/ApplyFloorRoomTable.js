import React, { useState } from 'react';
import moment from 'moment';

const ApplyFloorRoomTable = ({ Room_Datas, SelectedShowTableTimes, setApplyModalData, ApplyModalData, setSelectDate }) => {
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

    return (
        <div className="Main_Room_title">
            <div className="TableInTableLine">
                {TimeContents.map(list => {
                    return (
                        <div
                            key={list.Times}
                            className="Main_TimeLine_Content"
                            style={list.businessCheck ? {} : { backgroundColor: 'lightgray' }}
                            // onClick={() => HandleTableTimeClick(list.Times)}
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
                            <div className="Reservation_Room_date">
                                <div className="ContentTextCotainer">
                                    <div className="ContentTitle">{list.class === 'PUBLIC' ? list.subject : '비공개'}</div>
                                    <div className="Content_useId">
                                        {list.subject.split('____').length > 1
                                            ? list.subject.split('____')[1]
                                            : list.attendees[0].displayName.split('/')[0]}
                                    </div>
                                    <div className="Content_times">
                                        {/* {moment(list.startTime.dateTime).format('HH:mm')} ~ {moment(list.endTime.dateTime).format('HH:mm')} */}
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
                                </div>
                            </div>
                        </div>
                    );
                })}
                {SelectedShowTableTimes.EndTime ? (
                    <div
                        style={{
                            left: `${SelectedShowTableTimes.PositionLeftPxCal * 40}px`,
                            width: `${SelectedShowTableTimes.WidthLeftPxCal * 40}px`,
                            height: '100%',
                            background: 'lime',
                            opacity: '0.5',
                        }}
                        className="Reservation_Room_Container"
                        key={SelectedShowTableTimes.StartTime}
                    >
                        {/* <div className="Reservation_Room_date" onClick={() => alert('Selected')}>
                            <div className="ContentTextCotainer">
                                <div className="Content_times">
                                    {SelectedShowTableTimes.StartTime} ~ {SelectedShowTableTimes.EndTime}
                                </div>
                            </div>
                        </div> */}
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};

export default ApplyFloorRoomTable;
