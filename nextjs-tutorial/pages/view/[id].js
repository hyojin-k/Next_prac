import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import Item from "../../src/component/Item";

const Post = ({ item }) => {  // ssr props에서 받아온 item
  // item을 받아오기 때문에 필요 x
  // const router = useRouter();
  // const { id } = router.query;

  // const [item, setItem] = useState({});
  // const [isLoading, setIsLoading] = useState(true);

  // const API_URL = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;

  // function getDtata() {
  //   axios.get(API_URL).then((res) => {
  //     //   console.log(res.data)
  //     setItem(res.data);
  //     setIsLoading(false);
  //   });
  // }

  // useEffect(() => {
  //   if (id && id > 0) {
  //     getDtata();
  //   }
  // }, [id]);

  // return (
  //   <>
  //     {isLoading ? (
  //       <div style={{ padding: "300px 0" }}>
  //         <Loader inline="centered" active>
  //           Loading
  //         </Loader>
  //       </div>
  //     ) : (
  //       <Item item={item} />
  //     )}
  //   </>
  // );

  // item이 있는지 없는지만 확인하면 됨
  return (
    <>
      {item && (
        <>
          {/* 검색엔진최적화를 위한 데이터 삽입 */}
          <Head>
            <title>{item.name}</title>
            <meta name="description" content={item.description}></meta>
          </Head>
          <Item item={item} />
        </>
      )}
    </>
  );
};

export default Post;

// 서버사이드 랜더링(SSR)

// context - 여러 정보들이 담겨있는 곳
export async function getServerSideProps(context) {
  const id = context.params.id;
  const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
  const res = await axios.get(apiUrl);
  const data = res.data;

  return {
    // 받아온 응답값을 item에 넣고
    // 컴포넌트 실행할때 응답값을 해당 페이지의 props로 줄 수 있음
    props: {
      item: data,
    },
  };
}
