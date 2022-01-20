// _app.js - 모든 페이지에서 적용되어야하는 내용 입력
import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css';
import Top from '../src/component/Top';
import Footer from '../src/component/Footer'

// props로 넘어온 Component는 현재 페이지
// 페이지 전환 시에 Component props가 변경 됨
// pageProps는 초기 객체
function MyApp({ Component, pageProps }) {
  return (
    <div style = {{ width: 1000, margin:'0 auto'}}>
      <Top />
      <Component {...pageProps} />
      <Footer />
    </div>  
    )
}

export default MyApp
