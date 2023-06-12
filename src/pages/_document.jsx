import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    const pageProps = this.props?.__NEXT_DATA__?.props?.pageProps; //to access the pageProps for each page
    const { isLanding, isProgram, isSchedule } = pageProps; //destructure the pageProps to be one of these bool

    let bodyClass = "";
    // sætter bodyClass baggrundfarve alt efter pageprops
    if (isLanding) {
      bodyClass = "landing-background";
    } else if (isProgram) {
      bodyClass = "program-background";
    } else if (isSchedule) {
      bodyClass = "schedule-background";
    } else {
      bodyClass = "default-background";
    }

    return (
      <Html lang="en">
        <Head />
        {/* her er body container til dokumentet */}
        <body className={bodyClass}>
          <link rel="stylesheet" href="https://use.typekit.net/bxq7sds.css" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
