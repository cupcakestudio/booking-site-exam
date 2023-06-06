import Landing from "@/components/Landing";
import LandingTickets from "@/components/LandingTickets";
import LandingArtists from "@/components/LandingArtists";
import LandingProgram from "@/components/LandingProgram";
import LandingStages from "@/components/LandingStages";

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

export async function getServerSideProps() {
  const apiEndpoint = "https://nova-enchanted-confidence.glitch.me/bands";
  const bandRes = await fetch(apiEndpoint);
  const bandData = await bandRes.json();
  //code commit
  return {
    props: {
      bandData,
      isLanding: true,
    },
  };
}
