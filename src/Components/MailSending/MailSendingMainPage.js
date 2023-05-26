import React,{ useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ReactQuill,{Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import { useRef } from 'react';
import { GrFormClose } from 'react-icons/gr';
import NavigationMainPage from "../Navigation/NavigationMainPage";
import { toast } from '../ToasMessage/ToastManager';
import { useHistory, useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import Editor from './Editor';

const MailSendingMainPageMainDivBox = styled.div`
    min-height:95vh;
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
    .Mail_Container{
        width:70%;
        margin-left:40px;
        
    }
`



const MailSendingMainPage = () => {
    const history = useHistory();
    const { purpose,period,person,time,count} = useParams();
     const SelectUserRef = useRef(null);
    const ScrollView = useRef(null);
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [Select_Value, setSelect_Value] = useState({ label: '검색....', value: '' });
    const [UserSelect_Option, setUserSelect_Option] = useState([]);
    const [Mail_State, setMail_State] = useState(
        `<br>
        <div>
            <strong>
                <p>1. 방문 목적 :  ${purpose}</p>
            </strong>
        </div>

        <div><br></div>

        <div>
            <strong>
                <p>2. 방문 기간 : ${period}</p>
            </strong>
        </div>
        
        <div><br></div>
        

        <div>
            <strong>
                <p>3. 방문 인원 정보 : ${person}</p>
            </strong>
        </div>

        <div><br></div>
        

        <div>
            <strong>    
                <p>4. 소요 시간 : ${time}</p>
            </strong>
        </div>
        
        <div><br></div>
        

        <div>
            <strong> 
                <p>5. 필요한 Wafer 수량 : ${count}</p>
            </strong>

        </div>
        
        <div><br></div>
        

        <br>
        <p>--------------------------------------------------------------------------------------</p><p><strong></strong></p><br>
        <div>
            <p>원활한 진행을 위해 상기와 같이 Wafer를 준비부탁드립니다.</p>
        </div>
        `
    );
    const [Selected_User_State, setSelected_User_State] = useState([
        { value: "sw.sim@apact.co.kr",name:"심상우",company:"APACT",position:"차장",id: "sw.sim@apact.co.kr",from:true,cc:false,bcc:false },
        { value: "shpark@winpac.co.kr", name: "박신호", company: "WINPAC", position: "과장", id: "shpark@winpac.co.kr", from: true, cc: false, bcc: false },
        { value:LoginInfo.Login_id,name:LoginInfo.Login_name,company:"DHKS",position:"프로",id:LoginInfo.Login_id,from:false,cc:true,bcc:false},
    ]);
    // const modules = {
    //     toolbar: {
    //         container:
    //             [
    //                 // [{ font: ['arial', 'comic-sans', 'courier-new', 'georgia', 'helvetica', 'lucida'] }],
    //                 [{ 'size': ['8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30', '32', '36', '40', '48', '56', '64', '72'] }],
    //                 [{ header: [1, 2, false] }],
    //                 ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    //                 [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    //                 ['link'],
    //                 [{ align: [] }, { color: [] }], // dropdown with defaults from theme
    //                 ['clean'],
    //             ]
    //         , handlers: {
    //         'size': function (value) {
    //             if (value) {
    //                 this.quill.format('size', value);
    //             }
    //         }
    //     }
    //     }
    // }
  const modules = {
  toolbar: {
    container: [
      [{ 'size': ['8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30', '32', '36', '40', '48', '56', '64', '72'] }],
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link'],
      [{ align: [] }, { color: [] }],
      ['clean'],
    ],
    handlers: {
      size: function (value) {
        console.log(value)
        if (value) {
          this.quill.format('size', value);
        }
      },
      align: function (value) {
        if (['left', 'center', 'right', 'justify'].includes(value)) {
          this.quill.format('align', value);
        } else {
          this.quill.format('align', false);
        }
      },
    },
  },
};
    const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'color', 'size',
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


     const GetSelect_Food_Data = async () => {
        if (!LoginInfo.Login_id) {
            toast.show({
                title: `로그인을 한 이후에 다시 시도 해주세요.`,
                successCheck: false,
                duration: 6000,
            });
            history.push('/Login_Page');
            return;
        } else if (LoginInfo.Login_company !== 'DHKS') {
            toast.show({
                title: `DHKS 임직원 외에는 사용이 불가합니다.`,
                successCheck: false,
                duration: 6000,
            });
            history.push('/Today_Food');
            return;
        }

    };

    useEffect(() => {
        GetSelect_Food_Data();
    }, []);
   
    return (
        <MailSendingMainPageMainDivBox>
            {/* <NavigationMainPage TitleName="Wafer 메일전송"></NavigationMainPage>
            <div className="Mail_Container">
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
                                    {list.position}
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
            <div style={{ minHeight: '350px' }} ref={ScrollView}>
                <ReactQuill
                    style={{ minHeight: '350px', marginBottom: '40px',overflowY:"auto",maxHeight:"70vh" }}
                    // theme="snow"
                    modules={modules}
                    formats={formats}
                    value={Mail_State}
                    onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
                />
                </div>
                </div> */}
            <Editor></Editor>
        </MailSendingMainPageMainDivBox>
    )
}

export default MailSendingMainPage;