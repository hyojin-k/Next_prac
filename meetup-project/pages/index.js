// import { useState, useEffect } from "react";
import Head from 'next/head'
import { MongoClient } from 'mongodb';
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'A First Meetup',
//     image:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
//     address:'somewhere',
//     description: 'm1 description'
//   },
//   {
//     id: 'm2',
//     title: 'A Second Meetup',
//     image:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
//     address:'somewhere2',
//     description: 'm2 description'
//   }
// ]

function Home(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([])
  // useEffect(() =>{
  //   setLoadedMeetups(DUMMY_MEETUPS)
  // }, [])

  return (
    <div>
      <Head>
        <title>React Meetups</title>
        <meta name='description' content='meetups page' />
      </Head>
      <MeetupList meetups={props.meetups} />
    </div>
  );
}

// 서버에서만 실행되는 코드

// // SSR
// // 요청이 들어올 때마다 실행되므로 revalidate 설정할 필요 x

// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;

//   return {
//     props:{
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }


// static-generation (pre-rendering)

export async function getStaticProps(){
  const client = await MongoClient.connect('mongodb+srv://<id>:<password>@cluster0.o97xd.mongodb.net/meetups?retryWrites=true&w=majority')
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      // mongodb에서 가져온 data
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(), // _id를 객체에서 string으로 변환
      })) 
    },
    // 페이지에 새로운 요청이 생기면 10초에 한번씩 페이지 생성(규칙적으로 업데이트 되게 함)
    revalidate:10
  }
}

export default Home;
