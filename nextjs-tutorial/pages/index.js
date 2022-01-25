import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ItemList from "../src/component/ItemList";
import { Header, Divider, Loader } from "semantic-ui-react";

export default function Home({list}) {
  // 정적생성하여 list를 가져오기 때문에 필요 x
  // const [list, setList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // // const API_URL =
  // //   "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";

  // // 브라우저 환경
  // const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // function getData() {
  //   axios.get(API_URL).then((res) => {
  //     console.log(res.data);
  //     setList(res.data);
  //     setIsLoading(false);
  //   });
  // }

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div>
      <Head>
        <title>HOME | Next.js</title>
      </Head>
      {/* 정적 생성으로 페이지가 바로 뜨기 때문에 로딩페이지 필요 x */}
      {/* {isLoading ? (
        <div style ={{padding: '300px 0'}}>
          <Loader inline='centered' active>
            Loading
          </Loader>
        </div>
      ) : ( */}
        <>
        <Header as="h3" style={{ paddingTop: 40 }}>
          베스트 상품
        </Header>
        <Divider />
        <ItemList list={list.slice(0, 9)} />
        <Header as="h3" style={{ paddingTop: 40 }}>
          신상품
        </Header>
        <Divider />
        <ItemList list={list.slice(9)} />
        </>
      {/* )} */}

    </div>
  );
}

// static generation 정적 생성
// 미리 만들어진 html static 파일을 제공하여 빈화면이 생기지 않음

export async function getStaticProps() {
  const apiUrl = process.env.apiUrl;
  const res = await axios.get(apiUrl);
  const data = res.data;

  return {
    props: {
      list: data,
      name: process.env.name
    },
  };
}