import React from 'react';
import { BasicCarousel } from './components/slider/basicCarousel';

declare global {
    interface Window {
        stories: any[];
        img_domain: string;
        img_legacy: string;
    }
}

const App: React.FC = () => {
    const stories = [
        {
            admin_id: 90,
            alt: '스와로브스키크리스탈 경이로운 할인!',
            back_img: null,
            back_img_pos: null,
            color: '#000000',
            created_at: '2021-02-18 07:43:49',
            id: 1057,
            img: 'f86f0ef7b5420aafad1a95d3d23e6455.jpg',
            img_base64encoded: null,
            main_copy: '스와로브스키크리스탈 경이로운 할인!',
            mini_img: null,
            relation_id: 161405706,
            seq: 3,
            sub_copy: '지갑 문열어라 50% 할인 잡으러 가자!',
            type: 'sara_story',
            updated_at: '2021-02-26 17:34:57',
            url: 'https://thesaracen.com/event/detail/1943',
            duration: 1,
        },
        {
            admin_id: 189,
            alt: '당일배송 서비스 런칭!',
            back_img: null,
            back_img_pos: null,
            color: '#ffb000',
            created_at: '2021-02-15 12:00:01',
            id: 1054,
            img: '33ee34d3928cbf5ee346e27e028bb270.jpg',
            img_base64encoded: null,
            main_copy: '오늘 사고! 오늘 받고!',
            mini_img: null,
            relation_id: 161338392,
            seq: 3,
            sub_copy: '오후 2시 전에만 주문하면 오늘 도착 보장!',
            type: 'sara_story',
            updated_at: '2021-02-26 17:57:21',
            url: 'https://thesaracen.com/event/detail/1910',
            duration: 2,
        },
        {
            admin_id: 0,
            alt: '3월의 출석체크',
            back_img: null,
            back_img_pos: null,
            color: '#44c2bf',
            created_at: '2021-02-01 03:43:02',
            id: 1037,
            img: 'ef41ff7089448cf3f2ac4c6818cb3c15.mp4',
            img_base64encoded: null,
            main_copy: '이번달도 출첵하소!',
            mini_img: null,
            relation_id: 161229927,
            seq: 0,
            sub_copy: '출첵만 하면 사은품을 드려요!',
            type: 'sara_story',
            updated_at: '2021-03-01 00:00:02',
            url: 'https://thesaracen.com/event/detail/1996',
            duration: 3,
        },
        {
            admin_id: 0,
            alt: '3월의 출석체크',
            back_img: null,
            back_img_pos: null,
            color: '#44c2bf',
            created_at: '2021-02-01 03:43:02',
            id: 1036,
            img: 'ef41ff7089448cf3f2ac4c6818cb3c15.mp4',
            img_base64encoded: null,
            main_copy: '이번달도 출첵하소!',
            mini_img: null,
            relation_id: 161229927,
            seq: 1,
            sub_copy: '출첵만 하면 사은품을 드려요!',
            type: 'sara_story',
            updated_at: '2021-03-01 00:00:02',
            url: 'https://thesaracen.com/event/detail/1996',
            duration: 10,
        },
    ];

    return (
        <div className="App">
            <BasicCarousel
                stories={stories}
                imgDomain={window?.img_domain ?? 'https://thesaracen-1304267401.cos.ap-seoul.myqcloud.com'}
                imgLegacy={window?.img_legacy ?? 'https://active.thesaracen.com'}
            />
        </div>
    );
};

export default App;
