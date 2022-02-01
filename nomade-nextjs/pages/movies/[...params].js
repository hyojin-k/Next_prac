import { useRouter } from "next/router"
import Seo from "../../components/Seo";

export default function Detail({params}){ // ssr의 params 데이터 받아옴
    // router는 클라이언트 사이드에서만 실행됨
    const router = useRouter();
    // 서버에서 pre-rendering 되고, 서버에는 router.query.params가 아직 존재하지 않기 때문에 || [] 를 넣어서 에러를 막음
    // const [title, id] = router.query.params || [];

    const [title, id] = params || [];

    console.log(router)
    return(
        <div>
            <Seo title={title} />
            {/* router.query.title은 홈페이지에서 상세페이지로 넘어갈때만 뜸 */}
            {/* <h4>{router.query.title || 'Loading...'}</h4> */}

            {/* [id].js 에서 [...params].js로 바꾼 후 */}
            <h4>{title}</h4>
        </div>
    )
}

// SSR 
// url 정보(id, title)를 받아와 페이지에 넘겨줌
export function getServerSideProps({params:{params}}){ // ctx의 params
    // console.log(ctx)

    return{
        props:{
            params
        }
    }
}