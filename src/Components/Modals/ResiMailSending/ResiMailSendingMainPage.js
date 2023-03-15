import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { request } from '../../../API';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import { useRef } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { toast } from '../../ToasMessage/ToastManager';

const ResiMailSendingMainPageMainDivBox = styled.div`
    margin-bottom: 40px;
    .View_Box {
        max-height: 200px;
        padding: 5px;
        border: 1px solid lightgray;
        overflow: auto;
    }
    .Select_User_Show_Container {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        position: relative;
        :hover {
            background-color: skyblue;
        }
        padding: 5px;
        .Mail_Button {
            border: 1px solid lightgray;
            padding: 3px;
            margin-right: 10px;
            color: white;
            background-color: gray;
            :hover {
                cursor: pointer;
            }
        }
        .Delete_Select_User {
            position: absolute;
            right: 30px;
            :hover {
                cursor: pointer;
            }
        }
    }
`;

const ResiMailSendingMainPage = ({ Mail_State, setMail_State, setDetailInfo, setSelected_User_State, Selected_User_State }) => {
    const SelectUserRef = useRef(null);
    const ScrollView = useRef(null);
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [Select_Value, setSelect_Value] = useState({ label: '검색....', value: '' });
    const [UserSelect_Option, setUserSelect_Option] = useState([]);
    const modules = {
        toolbar: [
            // [{ font: ['arial', 'comic-sans', 'courier-new', 'georgia', 'helvetica', 'lucida'] }],
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link'],
            [{ align: [] }, { color: [] }], // dropdown with defaults from theme
            ['clean'],
        ],
    };
    const formats = [
        // 'font',
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        // 'image',
        'align',
        'color',
        // 'background',
    ];

    const onChange = data => {
        setMail_State(data);
    };

    const handleChangeMail = (ChangeString, data) => {
        if (ChangeString === 'from') {
            const ChangeData = Selected_User_State.map(list =>
                list.value === data.value ? { ...list, from: true, cc: false, bcc: false } : list
            );
            setSelected_User_State(ChangeData);
        } else if (ChangeString === 'cc') {
            const ChangeData = Selected_User_State.map(list =>
                list.value === data.value ? { ...list, from: false, cc: true, bcc: false } : list
            );
            setSelected_User_State(ChangeData);
        } else if (ChangeString === 'bcc') {
            const ChangeData = Selected_User_State.map(list =>
                list.value === data.value ? { ...list, from: false, cc: false, bcc: true } : list
            );
            setSelected_User_State(ChangeData);
        }
    };

    const Delet_Select_User = data => {
        if (data.value === LoginInfo.Login_id) {
            toast.show({
                title: `주관자는 삭제 할 수 없습니다. `,
                successCheck: false,
                duration: 3000,
            });
        } else {
            setSelected_User_State(Selected_User_State.filter(list => list.value !== data.value));
            setUserSelect_Option(UserSelect_Option.concat(data));
        }
    };

    const handleChangeData = e => {
        if (e.value === LoginInfo.Login_id) {
            toast.show({
                title: `주관자는 추가 할 수 없습니다. `,
                successCheck: false,
                duration: 3000,
            });
        } else {
            setSelected_User_State(Selected_User_State.concat(e));
            setUserSelect_Option(UserSelect_Option.filter(list => list.value !== e.value));
        }
    };

    const handleSending_getting_Detail_Info = async () => {
        try {
            const handleSending_getting_Detail_Info_Axios = await request.get('/users/handleSending_getting_Detail_Info', {
                params: {
                    ID: LoginInfo.Login_id,
                },
            });
            if (handleSending_getting_Detail_Info_Axios.data.dataSuccess) {
                setDetailInfo(handleSending_getting_Detail_Info_Axios.data.datas);
                setUserSelect_Option(
                    handleSending_getting_Detail_Info_Axios.data.AlluserData_Select_Option.filter(item => item.id !== LoginInfo.Login_id)
                );
                setSelected_User_State([
                    {
                        label: `${handleSending_getting_Detail_Info_Axios.data.datas.brity_works_user_info_name}   ||   ${handleSending_getting_Detail_Info_Axios.data.datas.brity_works_detail_user_info_team}   ||   ${handleSending_getting_Detail_Info_Axios.data.datas.brity_works_detail_user_info_id}`,
                        value: handleSending_getting_Detail_Info_Axios.data.datas.brity_works_detail_user_info_id,
                        name: handleSending_getting_Detail_Info_Axios.data.datas.brity_works_user_info_name,
                        team: handleSending_getting_Detail_Info_Axios.data.datas.brity_works_detail_user_info_team,
                        id: handleSending_getting_Detail_Info_Axios.data.datas.brity_works_detail_user_info_id,
                        company: handleSending_getting_Detail_Info_Axios.data.datas.brity_works_user_info_company,
                        from: true,
                        cc: false,
                        bcc: false,
                    },
                ]);
                if (ScrollView.current) {
                    ScrollView.current.scrollIntoView({ behavior: 'smooth' });
                    if (SelectUserRef.current) {
                        SelectUserRef.current.focus();
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleSending_getting_Detail_Info();
    }, []);

    return (
        <ResiMailSendingMainPageMainDivBox>
            <div>
                <h4>받는 사람</h4>
                <div>
                    <Select
                        value={Select_Value}
                        ref={SelectUserRef}
                        onChange={e => handleChangeData(e)}
                        name="colors"
                        options={UserSelect_Option}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        isClearable={true}
                    />
                </div>

                <div className="View_Box">
                    {Selected_User_State.map(list => {
                        return (
                            <div className="Select_User_Show_Container" key={list.value}>
                                <div
                                    className="Mail_Button"
                                    style={list.from ? { background: 'blue' } : {}}
                                    onClick={() => handleChangeMail('from', list)}
                                >
                                    수신
                                </div>
                                <div
                                    className="Mail_Button"
                                    style={list.cc ? { background: '#368' } : {}}
                                    onClick={() => handleChangeMail('cc', list)}
                                >
                                    참조
                                </div>
                                <div
                                    className="Mail_Button"
                                    style={list.bcc ? { background: '#3888' } : {}}
                                    onClick={() => handleChangeMail('bcc', list)}
                                >
                                    비밀
                                </div>
                                <div>
                                    {list.name}
                                    {'   '}/{'   '}
                                    {list.team}
                                    {'   '}/{'   '}
                                    {list.company}
                                    {'   '} {`<${list.id}>`}
                                </div>
                                <div className="Delete_Select_User" onClick={() => Delet_Select_User(list)}>
                                    <GrFormClose></GrFormClose>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div style={{ height: '350px' }} ref={ScrollView}>
                <ReactQuill
                    style={{ height: '350px', marginBottom: '40px' }}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={Mail_State}
                    onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
                />
            </div>
        </ResiMailSendingMainPageMainDivBox>
    );
};

export default React.memo(ResiMailSendingMainPage);
