import axios from 'axios';
import React, { useState } from 'react';

const meetingRooms = ['2F A회의실', '2F B회의실', '2F C회의실', '2F D회의실', '8F A회의실', '8F C회의실', '8F D회의실'];

const markers = ['검은 보드마카', '파란 보드마카', '빨간 보드마카', '보드마카 지우개'];

function MeetingForm() {
    const [selectedRoom, setSelectedRoom] = useState('');
    const [selectedMarker, setSelectedMarker] = useState('');
    const [query, setQuery] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();
        const data = { selectedRoom, selectedMarker, query };

        const response = await fetch('http://192.168.2.241:3008/send-email-2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // const Mail_Send_Axios = await axios.post(`http://192.168.2.241:3008/send-email-2`, {

        // });

        if (response.ok) {
            alert('메일이 성공적으로 전송되었습니다.');
        } else {
            alert('메일 전송에 실패했습니다.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>회의실 선택:</label>
                <select value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)}>
                    <option value="">회의실을 선택하세요</option>
                    {meetingRooms.map(room => (
                        <option key={room} value={room}>
                            {room}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>비품 선택:</label>
                <select value={selectedMarker} onChange={e => setSelectedMarker(e.target.value)}>
                    <option value="">비품을 선택하세요</option>
                    {markers.map(marker => (
                        <option key={marker} value={marker}>
                            {marker}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>추가 문의사항:</label>
                <textarea value={query} onChange={e => setQuery(e.target.value)} />
            </div>

            <button type="submit">제출</button>
        </form>
    );
}

export default MeetingForm;
