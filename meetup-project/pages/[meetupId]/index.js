import MeetupDetail from "../../components/meetups/MeetupDetail";

function Detail() {
  return (
      <MeetupDetail 
        image = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        title = 'First Meetup'
        address = 'somewhere'
        description = 'A first Meetup'
      />
  )
}

// getStaticPaths - 동적 페이지에서 필요한 함수, 어떤 페이지가 pre-generate 되어야 하는지 설정

export async function getStaticPaths(){
  return {
    // false - paths에 지정된 데이터가 아니면 404 에러, 지정한 일부 페이지만 보여줌 
    // true - 요청에 따라 동적으로 페이지 생성
    fallback: false,
    paths: [
      // 동적 페이지 당 객체 하나
      {
        params: {
          meetupId: 'm1'
        }
      },
      {
        params: {
          meetupId: 'm2'
        }
      },
    ]
  } 
}

export async function getStaticProps(context) {

  // context.params - 각 디테일 페이지의 id객체
  // meetupId - 프로퍼티
  // value는 URL에 인코드 됨
  const meetupId = context.params.meetupId;
  // 서버 터미널에서만 확인 가능(브라우저 x)
  console.log(meetupId)

  return{
    props: {
      meetupData: {
        image : 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        id: meetupId,
        title : 'First Meetup',
        address : 'somewhere',
        description : 'A first Meetup'
      }
    }
  }
}

export default Detail;
