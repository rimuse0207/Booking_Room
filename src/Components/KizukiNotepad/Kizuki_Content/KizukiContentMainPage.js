import React from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import ContentContainer from './Content_Container/ContentContainer';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Axios_Get_Moduls, Axios_Post_Moduls, request } from '../../../API';
import { useEffect } from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import KizukiContentModal from './Kizuki_Cotent_Modal/KizukiContentModal';
import { toast } from '../../ToasMessage/ToastManager';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { BsPlusLg } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

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
Modal.setAppElement('#SelectModal');

const KizukiListMainPageMainDivBox = styled.div`
    .List_Container {
        padding: 20px;
    }
    .Content_Container {
        position: relative;

        .New_Content_Add_Container {
            position: absolute;
            right: 0px;
            top: 20px;
        }

        .Arrow_Icons_Cotainer {
            position: absolute;
            left: 10px;
            bottom: -30px;
            font-size: 1.5em;
            color: gray;
        }
    }

    .List_Move_Container {
        display: flex;

        .List_Move {
            margin-left: 20px;
            min-width: 50px;
            :hover {
                cursor: pointer;
                color: lightgray;
            }
        }
    }

    .Kizuki_Division_Main_Box {
        ul {
            display: flex;
            padding: 0px;
            margin-left: 10px;
            li {
                margin-right: 10px;
                :hover {
                    cursor: pointer;
                }
            }
            .checked {
                background-color: lightgray;
            }
            .Kizuki_Division_Container {
                display: flex;
                align-items: center;
                border: 1px solid lightgray;
                padding: 10px;
                border-radius: 10px;
                .Kizuki_Division_Text_Container {
                    font-size: 1.5em;
                    margin-left: 10px;
                }
            }
        }
    }

    .Plus_Button_Container {
        height: 50px;
        text-align: center;
        line-height: 50px;
        margin-left: 30px;
        margin-right: 30px;
        margin-bottom: 10px;
        margin-top: 10px;
        max-width: 400px;
        .Plus_Button_Icons {
            border: 1px solid lightgray;
            background: #efefef;
            border-radius: 10px;
            :hover {
                color: gray;
                background-color: #fff;
                cursor: pointer;
            }
        }
    }

    .Kizuki_Graph_State_Container {
        ul {
            li {
                border-bottom: 1px dashed lightgray;
                padding-bottom: 10px;
                line-height: 25px;
            }
        }
    }

    .InputRange_Container {
        margin-left: 30px;
        margin-right: 30px;
        margin-bottom: 10px;
        margin-top: 10px;
        max-width: 400px;
        .Range_Text {
            display: flex;
            justify-content: space-between;
            font-size: 0.5em;
        }
        input {
            width: 100%;
        }
        .ticks {
            display: flex;
            font-size: 0.5em;
        }

        .o_txt {
            flex: 1;
        }
    }
    .Button_Cotainer {
        max-width: 500px;
        width: 100%;
        text-align: center;
        margin-top: 50px;
        margin-bottom: 50px;
        button {
            width: 120px;
            height: 40px;
            border: none;
            font-weight: bolder;
            font-size: 1.1em;
            border-radius: 5px;
            :hover {
                cursor: pointer;
            }
            @media only screen and (max-width: 800px) {
                width: 90px !important;
                font-size: 0.9em;
            }
        }
        .Cancle {
            background-color: orange;
            margin-right: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: orange;
            }
            @media only screen and (max-width: 800px) {
                margin-right: 10px;
            }
        }
        .Delete {
            background-color: red;
            margin-left: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: red;
            }
            @media only screen and (max-width: 800px) {
                margin-left: 10px;
            }
        }
        .Submit {
            background-color: green;
            margin-right: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: green;
            }
            @media only screen and (max-width: 800px) {
                margin-right: 10px;
            }
        }
    }
`;

const Color_Array = [
    {
        index: 1,
        color_Array: ['rgb(255,110,140)', 'rgb(50,160,255)', 'rgb(50,255,150)'],
    },
    {
        index: 2,
        color_Array: ['rgb(255,125,150)', 'rgb(70,170,255)', 'rgb(70,255,158)'],
    },
    {
        index: 3,
        color_Array: ['rgb(255,140,160)', 'rgb(90,180,255)', 'rgb(90,255,166)'],
    },
    {
        index: 4,
        color_Array: ['rgb(255,155,170)', 'rgb(110,190,255)', 'rgb(110,255,174)'],
    },
    {
        index: 5,
        color_Array: ['rgb(255,170,180)', 'rgb(130,200,255)', 'rgb(130,255,182)'],
    },
    {
        index: 6,
        color_Array: ['rgb(255,185,190)', 'rgb(150,210,255)', 'rgb(150,255,190)'],
    },
    {
        index: 7,
        color_Array: ['rgb(255,200,200)', 'rgb(170,220,255)', 'rgb(170,255,198)'],
    },
    {
        index: 8,
        color_Array: ['rgb(255,215,210)', 'rgb(190,230,255)', 'rgb(190,255,206)'],
    },
    {
        index: 9,
        color_Array: ['rgb(255,230,220)', 'rgb(210,240,255)', 'rgb(210,255,214)'],
    },
    {
        index: 10,
        color_Array: ['rgb(255,245,230)', 'rgb(230,250,255)', 'rgb(230,255,222)'],
    },
];

export const options = {
    responsive: true,
    scales: {
        r: {
            pointLabels: {
                display: true,
                centerPointLabels: true,
                font: {
                    size: 18,
                },
            },
            angleLines: {
                display: true,
            },
            ticks: {
                max: 100,
            },
            max: 100,
        },
    },

    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'KIZUKI 강화',
        },
    },
};

const KizukiContentMainPage = () => {
    const { team_code, kizuki_code } = useParams();
    const history = useHistory();
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [Kizuki_Content, setKizuki_Content] = useState([]);
    const [Kizuki_Conent_Add_Modal_Is_Open, setKizuki_Conent_Add_Modal_Is_Open] = useState(false);
    const [Select_Kizuki, setSelect_Kizuki] = useState(null);
    const [Kizuki_Division, setKizuki_Division] = useState(null);
    const [datasets, setdatasets] = useState([]);
    const [Graph_Insert_State, setGraph_Insert_State] = useState([]);
    const [Insert_Graph_Data, setInsert_Graph_Data] = useState({
        Insert_On_Cechking: false,
        kizuki_score: 0,
        mc_score: 0,
        effect_score: 0,
    });

    const OnClose = () => {
        setKizuki_Conent_Add_Modal_Is_Open(false);
        Get_Kizuki_list_Data();
    };

    useEffect(() => {
        if (Kizuki_Conent_Add_Modal_Is_Open) {
            document.body.style.overflow = 'hidden'; // 스크롤 방지
        } else {
            document.body.style.overflow = ''; // 스크롤 방지 스타일 제거
        }
    }, [Kizuki_Conent_Add_Modal_Is_Open]);

    const HandleSaveGraphDatas = async () => {
        const HandleSaveGraphDatas_Axios = await Axios_Post_Moduls('/LocalPim/HandleSaveGraphDatas', {
            Insert_Graph_Data,
            kizuki_code,
            LoginInfo,
        });
        if (HandleSaveGraphDatas_Axios) {
            // const NewUpdateData = [HandleSaveGraphDatas_Axios, ...Graph_Insert_State];
            // setGraph_Insert_State(NewUpdateData);'
            setInsert_Graph_Data({
                Insert_On_Cechking: false,
                kizuki_score: 0,
                mc_score: 0,
                effect_score: 0,
            });
            Get_Kizuki_Graph_Data();
            toast.show({
                title: `요청하신 그래프 데이터를 추가하였습니다.`,
                successCheck: true,
                duration: 6000,
            });
        }
    };

    const handleChangeDivison = async (Select_Code, Select_Name) => {
        const handleChangeDivison_Axios = await Axios_Post_Moduls('/LocalPim/handleChangeDivison', {
            Select_Code,
            kizuki_code,
        });

        if (handleChangeDivison_Axios) {
            setKizuki_Division({
                ...Kizuki_Division,
                kizuki_notepad_kizuki_list_division_code: Select_Code,
            });
            toast.show({
                title: `${Kizuki_Division.kizuki_notepad_kizuki_list_title}의 Kizuki를 ${Select_Name} 처리 하였습니다.`,
                successCheck: true,
                duration: 6000,
            });
        } else {
            toast.show({
                title: `${Select_Name} 처리 실패 IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    const Get_Kizuki_Division = async () => {
        const Get_Kizuki_Division_Axios = await Axios_Get_Moduls('/LocalPim/Get_Kizuki_Division', {
            kizuki_code,
        });
        if (Get_Kizuki_Division_Axios) {
            setKizuki_Division(Get_Kizuki_Division_Axios);
        } else {
            toast.show({
                title: `IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    const Get_Kizuki_list_Data = async () => {
        const Get_Kizuki_list_Data_Axios = await Axios_Get_Moduls('/LocalPim/Get_Kizuki_list_Data', {
            kizuki_code,
        });

        if (Get_Kizuki_list_Data_Axios) {
            setKizuki_Content(Get_Kizuki_list_Data_Axios);
        } else {
            toast.show({
                title: `IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    const Get_Kizuki_Graph_Data = async () => {
        const Get_Kizuki_Graph_Data_Axios = await Axios_Get_Moduls('/LocalPim/Get_Kizuki_Graph_Data', {
            kizuki_code,
        });
        console.log(Get_Kizuki_Graph_Data_Axios);
        if (Get_Kizuki_Graph_Data_Axios) {
            const a = [];

            Get_Kizuki_Graph_Data_Axios.map((list, j) => {
                a.push({
                    label: `점수 ${j + 1}`,
                    data: [
                        list.kizuki_notepad_kizuki_graph_mc_score,
                        list.kizuki_notepad_kizuki_graph_effect_score,
                        list.kizuki_notepad_kizuki_graph_kizuki_score,
                    ],
                    backgroundColor: Color_Array[9 - j].color_Array,
                    borderWidth: 1,
                });
                setGraph_Insert_State(Get_Kizuki_Graph_Data_Axios);
                if (j === 0) {
                    setInsert_Graph_Data({
                        ...Insert_Graph_Data,
                        kizuki_score: list.kizuki_notepad_kizuki_graph_kizuki_score,
                        mc_score: list.kizuki_notepad_kizuki_graph_mc_score,
                        effect_score: list.kizuki_notepad_kizuki_graph_effect_score,
                    });
                }
            });
            console.log(a);
            setdatasets(a);
        } else {
        }
    };

    useEffect(() => {
        Get_Kizuki_list_Data();
        Get_Kizuki_Division();
        Get_Kizuki_Graph_Data();
    }, []);

    const SetDataChange = async () => {};

    const data = {
        labels: ['MC', '효과', 'KIZUKI'],
        datasets: datasets,
    };

    return (
        <KizukiListMainPageMainDivBox>
            <NavigationMainPage TitleName="KIZUKI 노트"></NavigationMainPage>
            <div className="List_Move_Container">
                <h2 className="List_Move" onClick={() => history.push(`/KIZUKI_Notepad/${team_code}`)}>
                    <FaArrowLeft></FaArrowLeft>
                </h2>
                <h2>KIZUKI LIST</h2>
            </div>
            {Kizuki_Division ? (
                <div className="Kizuki_Division_Main_Box">
                    <ul>
                        <li>
                            <div
                                className={`Kizuki_Division_Container ${
                                    Kizuki_Division?.kizuki_notepad_kizuki_list_division_code === '34e6b5e6dd3b' ? 'checked' : ''
                                }`}
                                onClick={() => handleChangeDivison('34e6b5e6dd3b', '미발표')}
                            >
                                <div className="Kizuki_Division_Image_Container">
                                    <img
                                        width={50}
                                        src={`/free-icon-idea-hand-drawn-symbol-of-a-side-head-with-a-lightbulb-inside-35497.png`}
                                    ></img>
                                </div>
                                <div className="Kizuki_Division_Text_Container">미발표</div>
                            </div>
                        </li>
                        <li>
                            <div
                                className={`Kizuki_Division_Container ${
                                    Kizuki_Division?.kizuki_notepad_kizuki_list_division_code === '34e6b5e6dd3c' ? 'checked' : ''
                                }`}
                                onClick={() => handleChangeDivison('34e6b5e6dd3c', '발표')}
                            >
                                <div className="Kizuki_Division_Image_Container">
                                    <img width={50} src={`/free-icon-presentation-1513622.png`}></img>
                                </div>
                                <div className="Kizuki_Division_Text_Container">발표</div>
                            </div>
                        </li>
                        <li>
                            <div
                                className={`Kizuki_Division_Container ${
                                    Kizuki_Division?.kizuki_notepad_kizuki_list_division_code === '34e6b5e6dd3d' ? 'checked' : ''
                                }`}
                                onClick={() => handleChangeDivison('34e6b5e6dd3d', '폐기')}
                            >
                                <div className="Kizuki_Division_Image_Container">
                                    <img width={50} src={`/free-icon-bags-5765600.png`}></img>
                                </div>
                                <div className="Kizuki_Division_Text_Container">폐기</div>
                            </div>
                        </li>
                    </ul>
                </div>
            ) : (
                <></>
            )}
            <div style={{ maxHeight: '400px', width: '100%' }}>
                <PolarArea data={data} options={options} />
            </div>
            <div className="Plus_Button_Container">
                <div
                    className="Plus_Button_Icons"
                    onClick={() =>
                        setInsert_Graph_Data({ ...Insert_Graph_Data, Insert_On_Cechking: !Insert_Graph_Data.Insert_On_Cechking })
                    }
                >
                    {!Insert_Graph_Data.Insert_On_Cechking ? <BsPlusLg></BsPlusLg> : <MdClose></MdClose>}
                </div>
            </div>
            {Insert_Graph_Data.Insert_On_Cechking ? (
                <div>
                    <div style={{ marginLeft: '20px' }}>
                        <div>
                            <h4>KIZUKI 점수</h4>
                        </div>
                        <div className="InputRange_Container">
                            <input
                                type="range"
                                min={0}
                                max={100}
                                step={10}
                                value={Insert_Graph_Data.kizuki_score}
                                list={'steplist_kizuki'}
                                onChange={e => setInsert_Graph_Data({ ...Insert_Graph_Data, kizuki_score: e.target.value })}
                            ></input>
                            <datalist id="steplist_kizuki">
                                <option>0</option>
                                <option>10</option>
                                <option>20</option>
                                <option>30</option>
                                <option>40</option>
                                <option>50</option>
                                <option>60</option>
                                <option>70</option>
                                <option>80</option>
                                <option>90</option>
                                <option>100</option>
                            </datalist>
                            <div className="ticks">
                                <span className="o_txt" style={{ paddingLeft: '5px' }}>
                                    0
                                </span>
                                <span className="o_txt" style={{ textAlign: 'center' }}>
                                    50
                                </span>
                                <span className="o_txt" style={{ textAlign: 'end' }}>
                                    100
                                </span>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <div>
                            <h4>MC 점수</h4>
                        </div>
                        <div className="InputRange_Container">
                            <input
                                type="range"
                                min={0}
                                max={100}
                                step={10}
                                value={Insert_Graph_Data.mc_score}
                                list={'steplist_mc'}
                                onChange={e => setInsert_Graph_Data({ ...Insert_Graph_Data, mc_score: e.target.value })}
                            ></input>
                            <datalist id="steplist_mc">
                                <option>0</option>
                                <option>10</option>
                                <option>20</option>
                                <option>30</option>
                                <option>40</option>
                                <option>50</option>
                                <option>60</option>
                                <option>70</option>
                                <option>80</option>
                                <option>90</option>
                                <option>100</option>
                            </datalist>
                            <div className="ticks">
                                <span className="o_txt" style={{ paddingLeft: '5px' }}>
                                    0
                                </span>
                                <span className="o_txt" style={{ textAlign: 'center' }}>
                                    50
                                </span>
                                <span className="o_txt" style={{ textAlign: 'end' }}>
                                    100
                                </span>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <div>
                            <h4>효과 점수</h4>
                        </div>
                        <div className="InputRange_Container">
                            <input
                                type="range"
                                min={0}
                                max={100}
                                step={10}
                                value={Insert_Graph_Data.effect_score}
                                list={'steplist_effect'}
                                onChange={e => setInsert_Graph_Data({ ...Insert_Graph_Data, effect_score: e.target.value })}
                            ></input>
                            <datalist id="steplist_effect">
                                <option>0</option>
                                <option>10</option>
                                <option>20</option>
                                <option>30</option>
                                <option>40</option>
                                <option>50</option>
                                <option>60</option>
                                <option>70</option>
                                <option>80</option>
                                <option>90</option>
                                <option>100</option>
                            </datalist>
                            <div className="ticks">
                                <span className="o_txt" style={{ paddingLeft: '5px' }}>
                                    0
                                </span>
                                <span className="o_txt" style={{ textAlign: 'center' }}>
                                    50
                                </span>
                                <span className="o_txt" style={{ textAlign: 'end' }}>
                                    100
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="Button_Cotainer">
                        <button
                            className="Submit"
                            onClick={() => {
                                HandleSaveGraphDatas();
                            }}
                        >
                            저장
                        </button>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
            <div className="Kizuki_Graph_State_Container">
                <ul>
                    {Graph_Insert_State.map((list, j) => {
                        return (
                            <li key={list.indexs}>
                                <h4>
                                    {Graph_Insert_State.length - j}차. <span>등록자 : </span>{' '}
                                    <strong>{list.kizuki_notepad_kizuki_graph_write_id}</strong>
                                </h4>

                                <div>
                                    <span>KIZUKI 점수 : </span> <strong>{list.kizuki_notepad_kizuki_graph_kizuki_score} 점</strong>
                                </div>
                                <div>
                                    <span>MC 점수 : </span> <strong>{list.kizuki_notepad_kizuki_graph_mc_score} 점</strong>
                                </div>
                                <div>
                                    <span>효과 점수 : </span> <strong>{list.kizuki_notepad_kizuki_graph_effect_score} 점</strong>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="List_Container">
                {Kizuki_Content.map((list, j) => {
                    return (
                        <div key={list.kizuki_notepad_kizuki_content_main}>
                            {j === 0 ? (
                                <div>
                                    <h1>{list.kizuki_notepad_kizuki_content_title}</h1>
                                </div>
                            ) : (
                                <></>
                            )}
                            <div className="Content_Container">
                                <h5 style={{ marginBottom: '0px' }}>{Kizuki_Content.length - j}. </h5>
                                <ContentContainer
                                    list={list}
                                    Kizuki_Conent_Add_Modal_Is_Open={() => setKizuki_Conent_Add_Modal_Is_Open(true)}
                                    OnClose={() => OnClose()}
                                    setSelect_Kizuki={data => setSelect_Kizuki(data)}
                                ></ContentContainer>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Modal isOpen={Kizuki_Conent_Add_Modal_Is_Open} style={customStyles} contentLabel="Select Modal">
                <KizukiContentModal OnClose={() => OnClose()} Select_Kizuki={Select_Kizuki}></KizukiContentModal>
            </Modal>
        </KizukiListMainPageMainDivBox>
    );
};

export default KizukiContentMainPage;
