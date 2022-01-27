import homeStyles from "../styles/Home.module.css";
import Head from 'next/head'

export default function Home() {
  return (
    <>
    <Head>
        <title>Hire at Kalyanagar</title>
        <meta name="description" content="Hire Anything at Kalyan nagar" />
    </Head>
    <div className={homeStyles.homediv}>
        <p style={{ margin: "30px", paddingLeft: '15%', fontSize: "30px" }}>
          {" "}
          Make Your House a Home,
          <br /> with a little help from us.
        </p>
 
    </div>
    </>
  );
}
