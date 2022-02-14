import { useRouter } from 'next/router';
import Head from 'next/head'
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
    <div>
      <Head>
        <title>Add Meetups</title>
        <meta name='description' content='Add meetups page' />
      </Head>
      <NewMeetupForm onAddMeetup = {addMeetuphandler} />
    </div>
 );
}

export default NewMeetup;
