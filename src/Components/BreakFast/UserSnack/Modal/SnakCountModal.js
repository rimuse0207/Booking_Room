import React from 'react';
import Modal from 'react-modal';
import { CgCloseO } from 'react-icons/cg';
import styled from 'styled-components';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { width } from '@mui/system';

const SnakCountModalMainDivBox = styled.div`
    .SnackTitle {
        color: #666;
    }
    .Snack_Counts_Container {
        display: flex;
        align-items: center;
        font-size: 1.5em;
        .buttons {
            /* padding: 20px; */
            padding: 20px;
        }
    }
    button {
        background: #333;
        border: none;
        border-radius: 5px;
        color: #eee;
        cursor: pointer;
        display: inline-block;
        font-size: 12px;
        margin-right: 10px;
        outline: none;
        padding: 6px 18px;
    }
`;
const LoginModalMainDivBox = styled.div`
    .Close_button_container {
        position: fixed;
        top: 10px;
        right: 10px;
        color: red;
        font-weight: bolder;
        font-size: 1.3em;
        :hover {
            cursor: pointer;
        }
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
    },
};
Modal.setAppElement('#LoginModal');

const SnakCountModal = ({
    SnakCountModalIsOpens,
    setSnakCountModalIsOpens,
    SnacksCounts,
    setSnacksCounts,
    Submit_For_Save_Data_UseSnacks,
}) => {
    const ModalPopUpClose = () => {
        setSnacksCounts(1);
        setSnakCountModalIsOpens();
    };
    return (
        <Modal isOpen={SnakCountModalIsOpens} style={customStyles} contentLabel="Login Modal">
            <SnakCountModalMainDivBox>
                <LoginModalMainDivBox>
                    <div className="Close_button_container" onClick={ModalPopUpClose}>
                        <CgCloseO></CgCloseO>
                    </div>
                </LoginModalMainDivBox>
                <div>
                    <h1 className="SnackTitle">스낵 이용 신청</h1>
                    <div style={{ fontSize: '18px' }}>스낵 1ea당 300Will이 청구 됩니다.</div>
                    <div className="Snack_Counts_Container">
                        <div className="buttons" onClick={() => (SnacksCounts - 1 === 0 ? '' : setSnacksCounts(SnacksCounts - 1))}>
                            <FaMinus />
                        </div>
                        <h4>{SnacksCounts} ea</h4>
                        <div className="buttons" onClick={() => setSnacksCounts(SnacksCounts + 1)}>
                            <FaPlus />
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <button onClick={() => Submit_For_Save_Data_UseSnacks()}>확인</button>
                    <button onClick={() => ModalPopUpClose()}>아니요</button>
                </div>
            </SnakCountModalMainDivBox>
        </Modal>
    );
};
export default React.memo(SnakCountModal);
