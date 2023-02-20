import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { RiSlideshowFill, RiDeleteBin2Fill } from 'react-icons/ri';
import Modal from 'react-modal';
import StockListUpdateModal from './StockSelectModal/StockListUpdateModal';
import { BsCartPlusFill } from 'react-icons/bs';
import StockListAddModal from './StockSelectModal/StockListAddModal';
import { FloatingMenu, MainButton, ChildButton } from 'react-floating-button-menu';
import { HiViewGridAdd } from 'react-icons/hi';
import { TiThMenu } from 'react-icons/ti';
import { IoCloseSharp } from 'react-icons/io5';
import StockAddDataModal from './StockSelectModal/StockAddDataModal';
import { request } from '../../../../API';
import { confirmAlert } from 'react-confirm-alert';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '500px',
        minHeight: '300px',
        width: '90%',
        maxHeight: '90%',
    },
};
Modal.setAppElement('#SelectModal');
export const StockSelectMainPageMainDivBox = styled.div`
    .Registered_List_Container {
        display: flex;
        margin-top: 30px;
        margin-bottom: 30px;
        padding: 10px;
        border-bottom: 1px solid lightgray;
        position: relative;
        .Registered_List_Title {
            flex-flow: column;
            display: flex;
            justify-content: space-around;
            margin-left: 10px;
        }
        .Update_Icons {
            position: absolute;
            top: 10px;
            right: 40px;
            color: green;
            :hover {
                cursor: pointer;
            }
        }
    }
    .FloatingMenu_Container {
        position: fixed;
        bottom: 40px;
        right: 40px;
        z-index: 10;
    }
`;

const StockSelectMainPage = () => {
    const [StockSelect, setStockSelect] = useState([]);
    const [SelectList, setSelectList] = useState(null);
    const [UpdateModalIsOpen, setUpdateModalIsOpen] = useState(false);
    const [AddModalIsOpen, setAddModalIsOpen] = useState(false);
    const [AddDataModalIsOpen, setAddDataModalIsOpen] = useState(false);
    const [FloatingMenuOnCheck, setFloatingMenuOnCheck] = useState(true);
    const UpdateModalOpen = data => {
        setSelectList(data);
        setUpdateModalIsOpen(true);
    };
    const AddModalOpen = data => {
        setSelectList(data);
        setAddModalIsOpen(true);
    };
    const OnClose = () => {
        setAddModalIsOpen(false);
        setUpdateModalIsOpen(false);
        setAddDataModalIsOpen(false);
        setSelectList(null);
    };

    const Get_NowDates_Apply_User_Select = async () => {
        try {
            const Get_Now_Dates_Apply_User_Select_Axios = await request.get(`/FoodApp/Stock_List_Select`);
            if (Get_Now_Dates_Apply_User_Select_Axios.data.dataSuccess) {
                setStockSelect(Get_Now_Dates_Apply_User_Select_Axios.data.Stock_List_Select_Rows);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const HandleDeleteStockData = async data => {
        try {
            const Delete_Stock_List_Axios = await request.post(`/FoodApp/Delete_Stock_List`, {
                data,
            });
            if (Delete_Stock_List_Axios.data.dataSuccess) {
                Get_NowDates_Apply_User_Select();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const DeleteConfirm = data => {
        confirmAlert({
            title: '정말 취소하시겠습니까?',
            message: '확인 시 기존 데이터는 사라집니다.',
            buttons: [
                {
                    label: '확인',
                    onClick: () => HandleDeleteStockData(data),
                },
                {
                    label: '취소',
                },
            ],
        });
    };

    useEffect(() => {
        Get_NowDates_Apply_User_Select();
    }, []);

    return (
        <StockSelectMainPageMainDivBox>
            <div>
                <h4>등록 조식 목록</h4>
                {StockSelect.map((list, j) => {
                    return (
                        <div className="Registered_List_Container" key={list.breakfast_info_name}>
                            <div>{j + 1} </div>
                            <div>
                                <img
                                    src={`${process.env.REACT_APP_DB_HOST}/FoodImages/${list.breakfast_info_image_src}`}
                                    width="150px"
                                    alt={list.breakfast_info_name}
                                ></img>
                            </div>
                            <div className="Registered_List_Title">
                                <h4>{list.breakfast_info_name}</h4>
                                <h4>재고 : {list.breakfast_count_info_count - list.user_count} 개</h4>
                                <div>{moment(list.breakfast_count_info_update_date).format('YYYY-MM-DD')}</div>
                            </div>
                            <div className="Update_Icons" onClick={() => UpdateModalOpen(list)}>
                                <RiSlideshowFill></RiSlideshowFill>
                            </div>
                            <div className="Update_Icons" style={{ top: '60px', color: '#368' }} onClick={() => AddModalOpen(list)}>
                                <BsCartPlusFill></BsCartPlusFill>
                            </div>
                            <div className="Update_Icons" style={{ top: '120px', color: 'red' }} onClick={() => DeleteConfirm(list)}>
                                <RiDeleteBin2Fill></RiDeleteBin2Fill>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Modal isOpen={UpdateModalIsOpen} style={customStyles} contentLabel="Select Modal">
                <StockListUpdateModal SelectList={SelectList} OnClose={() => OnClose()}></StockListUpdateModal>
            </Modal>
            <Modal isOpen={AddModalIsOpen} style={customStyles} contentLabel="Select Modal">
                <StockListAddModal
                    SelectList={SelectList}
                    OnClose={() => OnClose()}
                    Get_NowDates_Apply_User_Select={() => Get_NowDates_Apply_User_Select()}
                ></StockListAddModal>
            </Modal>
            <Modal isOpen={AddDataModalIsOpen} style={customStyles} contentLabel="Select Modal">
                <StockAddDataModal
                    OnClose={() => OnClose()}
                    Get_NowDates_Apply_User_Select={() => Get_NowDates_Apply_User_Select()}
                ></StockAddDataModal>
            </Modal>

            <div className="FloatingMenu_Container">
                <FloatingMenu slideSpeed={500} direction="up" spacing={8} isOpen={FloatingMenuOnCheck}>
                    <MainButton
                        iconResting={<TiThMenu style={{ fontSize: 20, backgroundColor: 'white' }} nativeColor="white" />}
                        iconActive={<IoCloseSharp style={{ fontSize: 20, backgroundColor: 'white' }} nativeColor="white" color="black" />}
                        backgroundColor="black"
                        onClick={() => setFloatingMenuOnCheck(!FloatingMenuOnCheck)}
                        size={56}
                    ></MainButton>
                    <ChildButton
                        icon={<HiViewGridAdd style={{ fontSize: 20, backgroundColor: 'white' }} nativeColor="black" />}
                        backgroundColor="white"
                        size={40}
                        onClick={() => setAddDataModalIsOpen(true)}
                    />
                </FloatingMenu>
            </div>
        </StockSelectMainPageMainDivBox>
    );
};

export default StockSelectMainPage;
