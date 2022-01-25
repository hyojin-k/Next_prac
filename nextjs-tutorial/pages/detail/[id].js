import axios from "axios";
import Head from "next/head";
import Item from "../../src/component/Item";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";

const Post = ({ item, name }) => { 
  const router = useRouter();

  // console.log(router.isFallback);
  // 빈화면일때 true, 데이터 들어오면 false

  // 데이터 들어올 때까지 로딩중 생성
  if(router.isFallback) {
    return(
      <div style={{padding: '100px 0'}}>
        <Loader active inline='centered'>
          Loading
        </Loader>
      </div>
    )
  }

  return (
    <>
      {item && (
        <>
          {/* 검색엔진최적화를 위한 데이터 삽입 */}
          <Head>
            <title>{item.name}</title>
            <meta name="description" content={item.description}></meta>
          </Head>
          {name} 환경입니다
          <Item item={item} />
        </>
      )}
    </>
  );
};

export default Post;

// static generation 정적 생성

// next Link의 prefetch 속성때문에 뷰포트에 보여지는 링크들이 preload 되면서 정적 생성이 됨(페이지를 스크롤 하면 화면에 보이는 데이터의 html, json 파일 자동생성)

export async function getStaticPaths() {
  const apiUrl = process.env.apiUrl;
  const res = await axios.get(apiUrl);
  const data = res.data;

  return {
    // 하단에 해당하는 아이템만 build 타임에 static 파일로 생성
    // paths: [
    //   {params: {id:'740'}},
    //   {params: {id:'730'}},
    //   {params: {id:'729'}},
    // ],

    // 데이터를 직접 지정하지않고 실제 api에서 데이터 불러오기(9개)
    paths : data.slice(0,9).map(item =>({
      params : {
        id: item.id.toString()
      }
    })),

    // false인 경우, 없는 페이지 대응을 하지 않고 404에러 띄움
    // true인 경우, 최초 접속 시에 빈 화면이 띄워졌다가 정적파일로 html, json을 생성 후, next.js 는 프리랜더링 목록에 추가하여 두번째 접속 부터는 생성된 페이지 불러옴
    // 전체 페이지를 pre-rendering하면 빌드타임이 늘어나기 때문에, 페이지가 많을 경우 유용
    fallback:true
  }
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
  const res = await axios.get(apiUrl);
  const data = res.data;

  return {
    props: {
      item: data,
      name: process.env.name
    },
  };
}
