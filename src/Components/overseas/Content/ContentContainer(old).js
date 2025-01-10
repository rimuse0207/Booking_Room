import React, { useState } from 'react';
import axios from 'axios';

function TravelForm() {
    const [traveler, setTraveler] = useState('');
    const [date, setDate] = useState('');
    const [country, setCountry] = useState('');
    const [todate, setToDate] = useState('');
    const [inquiry, setInquiry] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        // 서버로 데이터 전송
        axios
            .post('/send-mail', {
                traveler,
                date,
                country,
                todate,
                inquiry,
            })
            .then(response => {
                console.log(response.data);
                // 성공적으로 메일이 보내졌을 때 추가적인 작업 수행
            })
            .catch(error => {
                console.error('Error sending email:', error);
                setErrorMessage('메일 전송에 실패했습니다.');
            });
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>출장자 정보 입력</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px', fontSize: '18px', fontWeight: 'bold' }}>출장자 이름:</label>
                    <input type="text" value={traveler} onChange={e => setTraveler(e.target.value)} style={{ fontSize: '18px' }} />
                    <div style={{ flex: '1', maxWidth: '500px' }}></div>
                    <label style={{ marginRight: '10px', fontSize: '18px', fontWeight: 'bold' }}>출국일:</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ fontSize: '18px' }} />
                </div>
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px', fontSize: '18px', fontWeight: 'bold' }}>출장지(국가/도시):</label>
                    <input type="text" value={country} onChange={e => setCountry(e.target.value)} style={{ fontSize: '18px' }} />
                    <div style={{ flex: '1', maxWidth: '455px' }}></div>
                    <label style={{ marginRight: '10px', fontSize: '18px', fontWeight: 'bold' }}>귀국일:</label>
                    <input type="date" value={todate} onChange={e => setToDate(e.target.value)} style={{ fontSize: '18px' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '18px', fontWeight: 'bold' }}>출장 특이사항/문의사항:</label>
                    <textarea
                        value={inquiry}
                        onChange={e => setInquiry(e.target.value)}
                        style={{ width: '100%', height: '200px', fontSize: '18px' }}
                    />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '18px',
                        }}
                    >
                        메일 보내기
                    </button>
                </div>
                <h2 style={{ textAlign: 'left' }}>출장관련 서식, 매뉴얼</h2>
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <button
                        type="submit"
                        style={{
                            padding: '20px 10px',
                            backgroundColor: '#007a80',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '18px',
                            flex: '1',
                        }}
                    >
                        해외출장 매뉴얼
                    </button>
                    <button
                        type="submit"
                        style={{
                            padding: '20px 10px',
                            backgroundColor: '#004a80',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '18px',
                            flex: '1',
                        }}
                    >
                        해외출장 출장품의서 양식
                    </button>
                    <button
                        type="submit"
                        style={{
                            padding: '20px 10px',
                            backgroundColor: '#002a70',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '18px',
                            flex: '1',
                        }}
                    >
                        교육출장 서약서
                    </button>
                    <button
                        type="submit"
                        style={{
                            padding: '20px 10px',
                            backgroundColor: '#111a70',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '18px',
                            flex: '1',
                        }}
                    >
                        출장여비 지급기준표
                    </button>
                    <button
                        type="submit"
                        style={{
                            padding: '20px 10px',
                            backgroundColor: '#555a70',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '18px',
                            flex: '1',
                        }}
                    >
                        업무출장 서약서
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TravelForm;
