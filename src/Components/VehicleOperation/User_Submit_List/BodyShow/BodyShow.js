import React from "react";
import styled from "styled-components";
import { BsCircle,BsArrowDown } from "react-icons/bs";

const BodyShowMainDivBox = styled.div`
    margin-top:20px;
    .Body_Container{
        margin-top:20px;
        margin-bottom:20px;
        border-bottom:1px solid lightgray;
    }
    .Body_Main_Container{
        margin-top:20px;
        margin-bottom:20px;
        .Body_Box_Container{
            width:90%;
            float:right;
            padding:20px;
            border-top-left-radius:20px;
            border-bottom-left-radius:20px;
            /* background: linear-gradient(-45deg, #f3f5f0 50%, #dfe8eb 50%) */
            background-color: #dfe8eb;
            background-image: linear-gradient(-45deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 44%, rgba(255, 255, 255, 0.3) 45%, rgba(255, 255, 255, 0.3) 55%, rgba(255, 255, 255, 0) 56%, rgba(255, 255, 255, 0) 100%);
            background-size: 10px 10px;
            background-repeat: repeat;

            .Content_Time_Explain_Container{
                display:flex;
               align-items:center;
               margin-bottom:5px;
               .Time{
                width:50px;
               }
               .Address{
                margin-left:20px;
               }
            }
        }
        ::after{
            clear: both;
            content:"";
            display:block;
        }

        .Content_Box_Container{
            display:flex;
            justify-content:space-between;
            margin-top:30px;
            align-items:center;
            .Content_Explain{
                color:gray;
                font-size:0.8em;
                line-height:20px;
            }
            .Content_Distance{
                margin-right:30px;
            }
        }
    }


    .Body_Header_Container{
        margin-left:10px;
        strong{
            font-size:1.3em;
        }
        
    }
`

const BodyShow = () => {
    return (
        <BodyShowMainDivBox>
            
            <div className="Body_Container">
                <div>
                    <div className="Body_Header_Container">
                        <strong>25일</strong>
                        <span style={{fontSize:"0.8em"}}>(화)</span>
                        <span style={{marginLeft:"10px"}}>77KM</span>
                    </div>
                </div>

                <div className="Body_Main_Container">
                    <div className="Body_Box_Container">
                        <div>
                            <div className="Content_Time_Explain_Container">
                                <div className="Time">07:29</div>
                                <div style={{color:"blue",fontSize:"0.5em"}}> <BsCircle></BsCircle> </div>
                                <div className="Address"> 경기도 성남시 분당구 </div>
                            </div>
                        </div>
                        <div>
                            <div className="Content_Time_Explain_Container">
                                <div className="Time"></div>
                                <div style={{fontSize:"0.5em"}}> <BsArrowDown></BsArrowDown> </div>
                                <div className="Address">  </div>
                            </div>
                        </div>
                        <div>
                            <div className="Content_Time_Explain_Container">
                                <div className="Time">07:29</div>
                                <div style={{color:"red" ,fontSize:"0.5em"}}> <BsCircle></BsCircle> </div>
                                <div className="Address"> 경기도 성남시 분당구 </div>
                            </div>
                        </div>

                        <div className="Content_Box_Container">
                                            <div className="Content_Explain">
                                                    <div>
                                                        <span>- 주행시간</span>
                                                        <span style={{paddingLeft:"10px"}}>1시 17분</span>
                                                    </div>
                                                    <div>
                                                        <span>- 운행목적  </span>
                                                        <span style={{paddingLeft:"10px"}}>일반 업무</span>
                                                    </div>
                                            </div>
                                        <div className="Content_Distance">
                                            <strong style={{fontSize:"2em",marginRight:"10px"}}>77</strong>
                                            <strong>KM</strong>
                                        </div>
                            </div>
                        </div>
                </div>
            </div>
        </BodyShowMainDivBox>
    )
}

export default BodyShow;