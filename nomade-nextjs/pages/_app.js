// _app.js - next.js가 가장 먼저 렌더링 하는 부분

import NavBar from "../components/NavBar";
import '../styles/globals.css';

// Component - 렌더링하기 원하는 페이지
export default function App({Component, pageProps}) {
    return (
        <>
            {/* 모든 페이지에 NavBar 생성 */}
            <NavBar />
            <Component {...pageProps} />

            {/* global 스타일 설정하여 전역으로 적용 */}
            <style jsx global>{`
                a {
                    color: yellow;
                }
            `}    
            </style>
        </>
    )
}