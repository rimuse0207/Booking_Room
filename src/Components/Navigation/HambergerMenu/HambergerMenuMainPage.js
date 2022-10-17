import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const HambergerMenuMainPageMainDivBox = styled.div`
    .menubar {
        display: block;
        background-color: #8c8a8a;
        color: #efefef;
        box-shadow: 2px 5px 5px 0 rgba(0, 0, 0, 0.12);
        text-align: center;
        margin-top: 6px;
    }
    .MainTitles > h1 {
        margin-top: 12px;
    }
    .MainTitles {
        position: absolute;
        top: -15px;
        left: 0;
        right: 0;
    }

    .menubar span {
        display: inline-block;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        line-height: 60px;
        top: 20px;
    }

    #hambmenu {
        position: relative;
        width: 40px;
        height: 45px;
        float: left;
        transition: 0.5s ease-in-out;
        cursor: pointer;
    }
    #hambmenu span {
        position: absolute;
        height: 5px;
        width: 100%;
        vertical-align: middle;
        background: white;
        border-radius: 8px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: 0.25s ease-in-out;
        padding: 0px;
    }

    .hambclicker {
        content: '';
        position: absolute;
        cursor: pointer;
        z-index: 9;
        width: 100%;
        height: 100%;
    }

    #hambmenu span:nth-child(1) {
        top: 0px;
    }

    #hambmenu span:nth-child(2),
    #hambmenu span:nth-child(3) {
        top: 10px;
    }

    #hambmenu span:nth-child(4) {
        top: 20px;
    }

    #hambmenu.isopen span:nth-child(1) {
        top: 18px;
        width: 0%;
        left: 50%;
        opacity: 0;
    }

    #hambmenu.isopen span:nth-child(2) {
        transform: rotate(45deg);
    }

    #hambmenu.isopen span:nth-child(3) {
        transform: rotate(-45deg);
    }

    #hambmenu.isopen span:nth-child(4) {
        top: 18px;
        width: 0%;
        left: 50%;
        opacity: 0;
    }

    #menu {
        position: absolute;
        height: calc(100vh - 70px);
        width: 210px;

        background: #8c8a8a;
        box-shadow: 2px 1px 1px 1px lightgrey;

        transform: translateX(-100%);
        transition: transform 300ms;
        z-index: 100;
        overflow: auto;
        color: #efefef;
    }

    #menu ul {
        margin-top: 0px;
        padding: 0px;
        color: black;
        list-style-type: none;
        text-align: left;
        overflow: hidden;
    }
    #menu > div > h5 {
        padding: 10px 0 10px 10px;
    }
    #menu > div > h5:hover {
        cursor: pointer;
    }
    #menu li {
        padding: 10px 0 10px 30px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.14);
        border-top: 1px solid rgba(0, 0, 0, 0.14);
        color: white;
    }

    .IsOpen_Menu_Cotainer {
        background-color: #368;
        width: 300px;
        height: 90vh;
        position: fixed;
        top: 60px;
        left: 0px;
    }
`;

const HambergerMenuMainPage = () => {
    const myMenuRef = useRef('null');
    const [hambergerOpen, setHambergerOpen] = useState(false);
    const [menuStatus, setMenuStatus] = useState('');
    const _menuToggle = e => {
        e.stopPropagation();
        hambergerOpen ? setMenuStatus('') : setMenuStatus('isopen');
        setHambergerOpen(!hambergerOpen);
    };
    useEffect(() => {
        function handleClickOutside(e) {
            if (myMenuRef.current && !myMenuRef.current.contains(e.target)) {
                e.stopPropagation();
                setMenuStatus('');
                setHambergerOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [myMenuRef]);

    return (
        <HambergerMenuMainPageMainDivBox ref={myMenuRef}>
            <div className="menubar">
                {/* <div className="MainTitles">
                    <h1>{titles}</h1>
                </div> */}
                <div className="hambclicker" onClick={e => _menuToggle(e)}></div>
                <div id="hambmenu" className={menuStatus}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div>{/* <Navigation menuStatus={menuStatus} setHambergerOpen={(e) => _menuToggle(e)} /> */}</div>
            </div>
            {/* {hambergerOpen ? <div className="IsOpen_Menu_Cotainer">ddd</div> : <div className="IsClose_Menu_Cotainer">xxxxx</div>} */}
        </HambergerMenuMainPageMainDivBox>
    );
};

export default HambergerMenuMainPage;
