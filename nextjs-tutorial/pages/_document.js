// _document.js 파일 - 서버에서만 랜더링 되고, 이벤트 핸들러는 작동하지 않음
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

// Next.js 는 마크업 정의를 건너뛰기 때문에 html, head, body 부분을 수정하기 위해 하단 부분이 필요
  render() {
    return (
      <Html lang='ko'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument