import Head from "next/head";

export default function Seo({title}) {
 return (
    //  html의 head 부분
    <Head>
        {/* 각 페이지마다 타이틀 지정 */}
        <title>{title} | Movies </title>
    </Head>
 )   
}