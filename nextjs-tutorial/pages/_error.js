// 정적으로 최적화 되어 있지 않는 서버 에러 페이지
// 하단처럼 작성하면 클라이언트 에러와 서버에러를 둘 다 관리할 수 있음 
// (404.js 파일 없어도 되지만 404 에러 발생페이지는 static으로 제공되는 것이 좋음)

function Error({ statusCode}) {
    return (
        <p>
            {statusCode ?
            `An error ${statusCode} occurred on server` :
            'An error occurred on client'}
        </p>
    )
}

Error.getInitialProps = ({res, err}) =>{
    const statusCode = res ? res.statusCode : err? err.statusCode : 404;
    return { statusCode }
}

export default Error;