import React, { useCallback, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FoodSelectContainerMainDivBox = styled.div`
    border: 1px solid orange;
    width: 80%;
    margin: 0 auto;
    min-height: 100vh;
    padding-top: 50px;
    .UploadInput_Container {
        width: 500px;
        border: 1px solid blue;
        height: 100%;
        min-height: 300px;
        position: relative;
        .File_UploadInput {
            width: 100%;
            border: 1px solid red;
            max-width: 500px;
            height: 100%;
        }
        input[type='file'] {
            -webkit-appearance: none;
            appearance: none;
        }
        input[type='file']::-webkit-file-upload-button {
            width: 100px;
            height: 100%;
            opacity: 0;
            -webkit-appearance: none;
            appearance: none;
        }

        .ImageNothing {
            position: absolute;
            left: 0;
            top: 0;
            background-image: url('icon.png');
            background-repeat: no-repeat;
            background-size: cover;
            width: 100%;
            height: 200px;
        }
    }
`;

const FoodSelectContainer = () => {
    const [FileStateData, setFileStateData] = useState({});

    const inputRef = useRef(null);

    const onUploadImage = useCallback(async e => {
        if (!e.target.files) {
            return;
        }

        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        const dataSendImageFromServer = await axios.post(`${process.env.REACT_APP_DB_HOST}/FoodApp/FoodImageUpload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (dataSendImageFromServer.data.dataSuccess) {
            console.log(dataSendImageFromServer);
        }
    }, []);

    const onUploadImageButtonClick = useCallback(() => {
        if (!inputRef.current) {
            return;
        }
        inputRef.current.click();
    }, []);
    return (
        <FoodSelectContainerMainDivBox>
            <h2>사진 업로드</h2>
            <div className="UploadInput_Container">
                {/* <div>{FileStateData ? <div className="ImageNothing">사진 없음</div> : <div>사진 있음</div>}</div> */}
                <input className="File_UploadInput" type="file" accept="image/*" name="thumbnail" ref={inputRef} onChange={onUploadImage} />
                {/* <button label="이미지 업로드" onClick={onUploadImageButtonClick}>
                    업로드
                </button> */}
            </div>
        </FoodSelectContainerMainDivBox>
    );
};

export default FoodSelectContainer;
