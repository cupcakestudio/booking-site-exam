import "@/styles/globals.css";
import { FormDataProvider } from "@/contexts/bookingContext";
import Navigation from "@/components/Navigation";
import BookingDisplay from "./booking_display";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  // Checker om current page er BookingDisplay, bruges til at fjerne navigation
  const isBookingDisplayPage = Component === BookingDisplay;

  //lytter og render kun efter ´pageProps´ ændringer, også tildeler den rigtige farve

  useEffect(() => {
    // destructurere pageProps, så det kun er pagePropsne defineret inde i const
    const { isLanding, isSchedule, isProgram } = pageProps;

    if (isLanding) {
      document.body.className = "landing-background";
    } else if (isSchedule) {
      document.body.className = "schedule-background";
    } else if (isProgram) {
      document.body.className = "program-background";
    } else {
      document.body.className = "default-background";
    }
  }, [pageProps]);
  // sætter pageprops til at være i et array for at tjekke om det sker ændringer med pageprops.
  // useEffect kræver at have et array, hvorpå den kigger efter ændringer.
  return (
    <>
      {/* Render Navigation på alle andre sider end BookingDisplay */}
      {!isBookingDisplayPage && <Navigation />}

      <FormDataProvider>
        <Component {...pageProps} />;
      </FormDataProvider>
      <Footer />
    </>
  );
}
