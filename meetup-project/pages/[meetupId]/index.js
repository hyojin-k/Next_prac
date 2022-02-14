import Head from 'next/head'
import { MongoClient, ObjectId  } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function Detail(props) {
  return (
    <div>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head> 
      <MeetupDetail 
        image = {props.meetupData.image}
        title = {props.meetupData.title}
        address = {props.meetupData.address}
        description = {props.meetupData.description}
      />
    </div>
  )
}

// getStaticPaths - 동적 페이지에서 필요한 함수, 어떤 페이지가 pre-generate 되어야 하는지 설정

export async function getStaticPaths(){
  const client = await MongoClient.connect('mongodb+srv://<id>:<password>@cluster0.o97xd.mongodb.net/meetups?retryWrites=true&w=majority')
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  // 모든 데이터가 아니라 특정 필드 값을 필터링할 수도 있음
  // 모든 객체를 가져오지만 id 값만 가지고 있음
  const meetups = await meetupsCollection.find({},{_id:1}).toArray();

  client.close();
  return {
    // false - paths에 지정된 데이터가 아니면 404 에러, 지정한 일부 페이지만 보여줌 
    // true - 요청에 따라 동적으로 페이지 생성(빈 화면을 먼저 보여주고 데이터를 불러옴, loading 필요)
    // blocking - 유효한 페이지가 더 있을 수 있음(데이터가 불러와지면 페이지를 보여줌)
    fallback: 'blocking',
    // 경로 배열을 동적으로 생성
    paths: meetups.map(meetup =>({params: {meetupId: meetup._id.toString()}})) 
    
    // [
    //   // 동적 페이지 당 객체 하나
    //   {
    //     params: {
    //       meetupId: 'm1'
    //     }
    //   },
    //   {
    //     params: {
    //       meetupId: 'm2'
    //     }
    //   },
    // ]
  } 
}

export async function getStaticProps(context) {

  // context.params - 각 디테일 페이지의 id객체
  // meetupId - 프로퍼티
  // value는 URL에 인코드 됨
  const meetupId = context.params.meetupId;
  // 서버 터미널에서만 확인 가능(브라우저 x)
  // console.log(meetupId)

  const client = await MongoClient.connect('mongodb+srv://<id>:<password>@cluster0.o97xd.mongodb.net/meetups?retryWrites=true&w=majority')
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  // 한 개의 data (ObjectId - 객체 형식으로 문자열 변환)
  const selectedMeetup = await meetupsCollection.findOne({_id:ObjectId(meetupId)});

  client.close();

  return{
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      } 
      // {
      //   image : 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      //   id: meetupId,
      //   title : 'First Meetup',
      //   address : 'somewhere',
      //   description : 'A first Meetup'
      // }
    }
  }
}

export default Detail;
