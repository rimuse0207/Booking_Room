import React from 'react';
import TreeNode from './TreeNode';

const guidelines = [
    {
        title: '삼성',
        content: '삼성 방문시 주의 내용 입니다.',
        children: [
            {
                title: '출입 전',
                content: '출입 전 사전 신청에 대한 내용입니다.',
                children: [
                    {
                        title: '내방 신청',
                        content:
                            '내방 신청이 필요합니다. <br />사이트는 https://partner.samsungsemi.com:7777/partner/identity/anonymous/loginPage.do?_frameF=true#',
                    },
                    {
                        title: '보안 교육 이수 여부',
                        content:
                            '일반 미팅은 사이트에서 자동으로 뜨는 팝업의 보안 교육 이수만으로 가능합니다.<br />현장 출입시에는 오프라인으로 안전 교육 이수가 필요하니 유의하세요.',
                    },
                    {
                        title: '준비물',
                        content: '업무에 필요한 준비물 외 꼭 주민등록증, 운전면허증등 신분증을 챙겨주세요',
                    },
                    {
                        title: '방문시 들고 가서는 안되는 물품',
                        content:
                            '1. A4 용지 사이즈의 문서 - 출입전 보안 검색대에서 도장 또는 확인 스티커 발부 후 출입은 가능하나, 무엇인가 문서에 기입을 하면 나올때 보안 검색대에서 심문을 당할 수 있음<br /> 2. USB, CD, WIFI등 신고되지 않은 모든 보안 저장 매체 ',
                    },
                ],
            },
            {
                title: '출입 시',
                content: '출입 시 관련 내용입니다.',
                children: [
                    {
                        title: '출입 순서 ( 모든 순서를 지켜주세요. )',
                        content:
                            '사업장의 출입 순서 입니다.<br /> 1. 꼭 정문으로 출입 해 주세요. (로비가 있는 출입구)<br /> 2. 인포메이션에 접수 수행. 신분증 제출. 건강보험어플로 자격득실 (DHKS소속여부) 인증.<br /> 3-1. 핸드폰 삼성 보안프로그램 설치/활성화 ( 자동으로 카메라 기능이 삭제 됩니다. )<br /> 3-2. 핸드폰에 보안 프로그램을 설치 하지 않을 시, 외부 캐비넷에 핸드폰 보관 또는 보안 포켓 및 스티커 부착 후 입실<br /> 4.인포메이션 직원이 핸드폰 보안 확인 후 출입 카드 발부<br /> 5. 신고한 PC(노트북)을 지참하였을 경우 삼성 보안프로그램 설치하여 윈도우 최신 상태 및 바이러스 검사 시행 <br />5.검색대 통과, 통과시 핸드폰 보안 상태 확인. 검색대 통과시 불필요한 물품 휴대 금지<br /> ',
                    },
                ],
            },
            {
                title: '나올 시',
                content: '고객 방문을 마치고 나올 시 관련 내용입니다.',
                children: [
                    {
                        title: '나올 시 순서 ( 모든 순서를 지켜주세요. )',
                        content:
                            '1. 검색대 통과 - 가방이 있는 경우 가방은 엑스레이 통과<br /> 2. 출입증 반납 <br /> 3. 핸드폰 보안 상태 검사 수행 ',
                    },
                ],
            },
            {
                title: '이외 특이 사항',
                content:
                    '1. PC(노트북)은 사전 신고 이후 가져가야 하며, 화성, 천안, 기흥, 온양 사업장 마다 상황이 다르므로 고객사 담당자에게 필요사항을 꼭 확인 받을 것<br />2. PC의 기본 세팅 상태는 최신 윈도우 업데이트가 되어 있어야 하며, Trendmicro가 깔려 있을 경우 백신 검사 이후, IT담당자에게 연락하여 Trendmicro를 삭제하고 방문을 해야 함<br />3. 삼성 내부에서 사용하는 용지는 가지고 나오면 안됩니다. 특수 용지로 검색대를 통과하면 "삐~~~~"라는 경고음이 울리며, 보안요원에게 연행을 당하게 됩니다.',
            },
        ],
    },
];

function GuidelineList() {
    return (
        <div className="guideline-list">
            {guidelines.map((guideline, index) => (
                <TreeNode key={index} node={guideline} />
            ))}
        </div>
    );
}

export default GuidelineList;
