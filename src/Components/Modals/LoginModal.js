import React from 'react';
import Modal from 'react-modal';
import { CgCloseO } from 'react-icons/cg';
import LoginModalMainPage from './LoginModal/LoginModalMainPage';
import styled from 'styled-components';

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
        width: '90%',
        height: '90%',
    },
};
Modal.setAppElement('#LoginModal');

const LoginModal = ({ LoginModalIsOpen, setLoginModalIsOpen }) => {
    const ModalPopUpClose = () => {
        setLoginModalIsOpen();
    };
    return (
        <Modal isOpen={LoginModalIsOpen} style={customStyles} contentLabel="Login Modal">
            <LoginModalMainDivBox>
                <div className="Close_button_container" onClick={ModalPopUpClose}>
                    <CgCloseO></CgCloseO>
                </div>
            </LoginModalMainDivBox>
            <LoginModalMainPage></LoginModalMainPage>
        </Modal>
    );
};

export default LoginModal;
