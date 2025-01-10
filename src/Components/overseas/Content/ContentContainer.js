import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { request } from '../../../API';
import { toast } from '../../ToasMessage/ToastManager';

function ContentContainer() {
    const [formData, setFormData] = useState({
        name: '',
        departureDate: '',
        returnDate: '',
        destination: '',
        requests: '',
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post('http://192.168.2.241:3008/send-email', formData)
            .then(response => {
                alert('Email sent successfully!');
            })
            .catch(error => {
                console.error('There was an error sending the email!', error);
            });
    };
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>출장자 정보 입력</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px', fontSize: '18px', fontWeight: 'bold' }}>출장자 이름:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ fontSize: '18px' }} required />
                    <div style={{ flex: '1', maxWidth: '500px' }}></div>
                    <label style={{ marginRight: '10px', fontSize: '18px', fontWeight: 'bold' }}>출국일:</label>
                    <input
                        type="date"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleChange}
                        style={{ fontSize: '18px' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px', fontSize: '18px', fontWeight: 'bold' }}>출장지(국가/도시):</label>
                    <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        style={{ fontSize: '18px' }}
                        required
                    />
                    <div style={{ flex: '1', maxWidth: '455px' }}></div>
                    <label style={{ marginRight: '10px', fontSize: '18px', fontWeight: 'bold' }}>귀국일:</label>
                    <input
                        type="date"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleChange}
                        style={{ fontSize: '18px' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '18px', fontWeight: 'bold' }}>출장 특이사항/문의사항:</label>
                    <textarea
                        name="requests"
                        value={formData.requests}
                        onChange={handleChange}
                        style={{ width: '100%', height: '200px', fontSize: '18px' }}
                        required
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
                        type="File_Download_Container"
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
                        <a href={`${process.env.REACT_APP_DB_HOST}/overseas/manual.pdf`} style={{ color: 'white' }}>
                            해외출장 매뉴얼
                        </a>
                    </button>
                    <button
                        type="File_Download_Containert"
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
                        <a href={`${process.env.REACT_APP_DB_HOST}/overseas/poom.xlsx`} style={{ color: 'white' }}>
                            해외출장 출장품의서 양식
                        </a>
                    </button>
                    <button
                        type="File_Download_Container"
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
                        <a href={`${process.env.REACT_APP_DB_HOST}/overseas/seo.docx`} style={{ color: 'white' }}>
                            교육출장 서약서
                        </a>
                    </button>
                    <button
                        type="File_Download_Container"
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
                        <a href={`${process.env.REACT_APP_DB_HOST}/overseas/pyo.pdf`} style={{ color: 'white' }}>
                            출장여비 지급기준표
                        </a>
                    </button>
                    <button
                        type="File_Download_Container"
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
                        <a href={`${process.env.REACT_APP_DB_HOST}/overseas/chulseo.doc`} style={{ color: 'white' }}>
                            업무출장 서약서
                        </a>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ContentContainer;
