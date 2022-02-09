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

export default Detail;
