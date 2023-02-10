import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
const RoomNavMainDivBox = styled.div`
    .List_Move_Container {
        display: flex;
        align-items: center;
        .List_Move {
            :hover {
                cursor: pointer;
                color: darkgray;
            }
        }
        .List_Move_Advance {
            margin-left: 40px;
            ul {
                li {
                    list-style: disc;
                }
            }
        }
    }
`;

const RoomNav = ({ Attention }) => {
    const history = useHistory();
    return (
        <RoomNavMainDivBox>
            <div className="List_Move_Container">
                <h2 className="List_Move" onClick={() => history.push('/PIM')}>
                    <FaArrowLeft></FaArrowLeft>
                </h2>
                <div className="List_Move_Advance">
                    <div>*주의사항</div>
                    <ul style={{ fontSize: '0.7em', paddingLeft: '10px', marginTop: '5px' }}>
                        {Attention.map(list => {
                            return <li key={list.title}>{list.title}</li>;
                        })}
                    </ul>
                </div>
            </div>
        </RoomNavMainDivBox>
    );
};

export default RoomNav;
