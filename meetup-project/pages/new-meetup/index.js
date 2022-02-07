import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetup() {
  function addMeetuphandler(enteredMeetupData){
    console.log(enteredMeetupData)
  }
  return (
    <NewMeetupForm onAddMeetup = {addMeetuphandler} />
 );
}

export default NewMeetup;
