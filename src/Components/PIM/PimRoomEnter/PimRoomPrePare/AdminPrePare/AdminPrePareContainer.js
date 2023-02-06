import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { AiTwotoneDelete } from 'react-icons/ai';
import moment from 'moment';
import uuid from 'react-uuid';
import Modal from 'react-modal';
import UserSelectModal from './UserSelectModal/UserSelectModal';
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

const AdminPrePareContainerMainDivBox = styled.div`
    max-width: 500px;
    width: 100%;
    .Fight_Box {
        position: relative;
        margin-top: 80px;
    }
    .Fighter_Container {
        display: flex;
        align-items: center;
        justify-content: space-around;
        text-align: center;
        .Fighter_Container_Blue {
            border: 2px dashed blue;
            padding: 10px;
            width: 45%;
            border-radius: 10px;
            min-height: 80px;
            .Fighter_Title {
                h5 {
                    margin: 0px;
                    padding: 0px;
                    margin-bottom: 5px;
                }
            }
            .Fighter_User {
            }
        }
        .Fighter_Container_Middle {
            width: 5%;
            font-weight: bolder;
        }
        .Fighter_Container_Red {
            border: 2px dashed red;
            padding: 10px;
            width: 45%;
            border-radius: 10px;
            min-height: 80px;
        }
    }

    .Nothing_User_Plus_Icon {
        position: relative;
        height: 100%;
        width: 100%;
        .Nothing_User_Plus_Icon_Plus {
            content: '+';
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: 100%;
            width: 100%;
            font-size: 3em;
            opacity: 0.5;
            :hover {
                opacity: 1;
                transition: all 0.5s;
                cursor: pointer;
            }
        }
        :hover {
            cursor: pointer;
            background-color: darkgray;
        }
    }

    .Fighter_Team_Division {
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: -70px;
        width: 100%;
        border-bottom: 2px double black;

        h3 {
            width: 45%;
            text-align: center;
        }
    }
    .BookingCheck_Cotainer {
        display: flex;
        align-items: center;
        .BookingCheck_Cotainer_Title {
            min-width: 140px;
        }
        .BookingCheck_Cotainer_SubTitle {
            width: 100%;
        }
    }
    .Matched_container {
        position: relative;
        border-bottom: 1px solid gray;
        padding-bottom: 40px;
        .Delete_Icons {
            position: absolute;
            top: 20px;
            right: 10px;
            color: red;
            :hover {
                cursor: pointer;
                color: black;
            }
        }
    }

    .User_Insert_Container {
        position: relative;
        .User_Deleted {
            position: absolute;
            top: -20px;
            right: 15px;
            font-weight: bolder;
            color: red;
            :hover {
                cursor: pointer;
            }
        }
    }
`;

const AdminPrePareContainer = ({ Room_Keys }) => {
    const [MatchState, setMatchState] = useState([]);
    const [UserSelectModalOpen, setUserSelectModalOpen] = useState(false);
    const [SelectedData, setSelectedData] = useState(null);
    const [SelectedTeam, setSelectedTeam] = useState(null);

    const handleClickMatches = () => {
        try {
            const Randoms = uuid().split('-');
            const ClciksData = {
                Room_Keys: `${moment().format('YYYYMMDDHHmmss')}${Randoms[0] + Randoms[1] + Randoms[2]} `,
                Blue_Fighter: null,
                Blue_Fighter_ID: null,
                Red_Fighter: null,
                Red_Fighter_ID: null,
            };
            setMatchState(MatchState.concat(ClciksData));
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteRoom = data => {
        console.log(data);
        console.log(MatchState);

        setMatchState(MatchState.filter(list => list.Room_Keys !== data.Room_Keys));
    };

    const HandleClicksUserClick = (data, teams) => {
        setUserSelectModalOpen(true);
        setSelectedData(data);
        setSelectedTeam(teams);
    };
    const handleDeleteUser = (data, teams) => {
        if (teams === 'Blue') {
            const ChangeData = MatchState.map(list =>
                list.Room_Keys === data.Room_Keys ? { ...list, Blue_Fighter: null, Blue_Fighter_ID: null } : list
            );

            setMatchState(ChangeData);
        } else {
            const ChangeData = MatchState.map(list =>
                list.Room_Keys === data.Room_Keys ? { ...list, Red_Fighter: null, Red_Fighter_ID: null } : list
            );

            setMatchState(ChangeData);
        }
    };

    return (
        <AdminPrePareContainerMainDivBox>
            {/* <div className="BookingCheck_Cotainer">
                <h4 className="BookingCheck_Cotainer_Title">대전 참가인원: </h4>
                <Select
                    // ref={handleChangeRef}
                    className="basic-single"
                    classNamePrefix="이쪽에서 선택 해주세요."
                    // defaultValue={SelectLeftHeaderInfo}
                    isClearable={true}
                    isSearchable={true}
                    name="Person"
                    // options={LeftHeaderInfo}
                    placeholder={'인원을 선택 해주세요.'}
                    // onChange={value => InsertSelectData(value)}
                />
            </div> */}

            {MatchState.length > 0 ? (
                <>
                    <div className="BookingCheck_Cotainer">
                        <h4 className="BookingCheck_Cotainer_Title">랜덤대결 : </h4>
                        <div className="BookingCheck_Cotainer_SubTitle">
                            <button>Random 대결</button>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
            <div className="Fight_Box">
                <div className="Fighter_Team_Division">
                    <h3 style={{ color: 'blue' }}>Blue 팀</h3>
                    <h3 style={{ color: 'red' }}>Red 팀</h3>
                </div>
                {MatchState.map((list, i) => {
                    return (
                        <div className="Matched_container" key={list.Room_Keys}>
                            <h2>{i + 1}</h2>
                            <div className="Fighter_Container">
                                <div className="Fighter_Container_Blue">
                                    {list.Blue_Fighter || list.Blue_Fighter_ID ? (
                                        <div className="User_Insert_Container">
                                            <div className="User_Deleted" onClick={() => handleDeleteUser(list, 'Blue')}>
                                                X
                                            </div>
                                            <h5 className="Fighter_Title">{list.Blue_Fighter}</h5>
                                            <div className="Fighter_User">{list.Blue_Fighter_ID}</div>
                                        </div>
                                    ) : (
                                        <div className="Nothing_User_Plus_Icon" onClick={() => HandleClicksUserClick(list, 'Blue')}>
                                            <div className="Nothing_User_Plus_Icon_Plus">+</div>
                                        </div>
                                    )}
                                </div>
                                <div className="Fighter_Container_Middle"> VS </div>
                                <div className="Fighter_Container_Red">
                                    {list.Red_Fighter || list.Red_Fighter_ID ? (
                                        <div className="User_Insert_Container">
                                            <div className="User_Deleted" onClick={() => handleDeleteUser(list, 'Red')}>
                                                X
                                            </div>
                                            <h5 className="Fighter_Title">{list.Red_Fighter}</h5>
                                            <div className="Fighter_User">{list.Red_Fighter_ID}</div>
                                        </div>
                                    ) : (
                                        <div className="Nothing_User_Plus_Icon" onClick={() => HandleClicksUserClick(list, 'Red')}>
                                            <div className="Nothing_User_Plus_Icon_Plus">+</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="Delete_Icons" onClick={() => handleDeleteRoom(list)}>
                                <AiTwotoneDelete></AiTwotoneDelete>
                            </div>
                        </div>
                    );
                })}

                <div className="BookingCheck_Cotainer">
                    <h4 className="BookingCheck_Cotainer_Title">대전 추가하기: </h4>
                    <div className="BookingCheck_Cotainer_SubTitle">
                        <button onClick={() => handleClickMatches()}>추가</button>
                    </div>
                </div>

                {MatchState.length > 0 ? (
                    <>
                        <div className="BookingCheck_Cotainer">
                            <h4 className="BookingCheck_Cotainer_Title">화상회의 만들기: </h4>
                            <div className="BookingCheck_Cotainer_SubTitle"></div>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
            <Modal isOpen={UserSelectModalOpen} style={customStyles} contentLabel="Select Modal">
                <UserSelectModal
                    setUserSelectModalOpen={() => setUserSelectModalOpen(false)}
                    Room_Keys={Room_Keys}
                    SelectedTeam={SelectedTeam}
                    SelectedData={SelectedData}
                    setMatchState={data => setMatchState(data)}
                    MatchState={MatchState}
                    setSelectedData={() => setSelectedData(null)}
                    setSelectedTeam={() => setSelectedTeam(null)}
                ></UserSelectModal>
            </Modal>
        </AdminPrePareContainerMainDivBox>
    );
};

export default AdminPrePareContainer;
