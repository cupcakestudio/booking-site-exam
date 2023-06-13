import Landing from "@/components/Landing";
import LandingTickets from "@/components/LandingTickets";
import LandingArtists from "@/components/LandingArtists";
import LandingProgram from "@/components/LandingProgram";
import LandingStages from "@/components/LandingStages";

//Prop drilling:
//Når parent component parser data til sine children,
//som også anvender samme data i children's children
export default function Home({ bandData }) {
  return (
    <section>
      <Landing />
      <LandingTickets />
      <LandingProgram bandData={bandData} />
      <LandingArtists bandData={bandData} />
      <LandingStages />
    </section>
  );
}
//code test
export async function getServerSideProps() {
  const apiEndpoint = "https://nova-enchanted-confidence.glitch.me/bands";
  const bandRes = await fetch(apiEndpoint);
  const bandData = await bandRes.json();

  return {
    props: {
      bandData,
      isLanding: true, // bool som sætter til en bestemt dynamisk klasse ifth. baggrund
    },
  };
}
