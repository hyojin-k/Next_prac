import { useRouter } from 'next/router';
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetup() {
  const router = useRouter();

  async function addMeetuphandler(enteredMeetupData){
    // console.log(enteredMeetupData)

    // api/new-meetup 으로 request 전송
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers:{
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);

    router.push('/');
  }
  return (
    <NewMeetupForm onAddMeetup = {addMeetuphandler} />
 );
}

export default NewMeetup;
