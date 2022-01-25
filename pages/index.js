import homeStyles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={homeStyles.homediv}>

        <p style={{ margin: "30px", paddingLeft: '15%', fontSize: "30px" }}>
          {" "}
          Make Your House a Home,
          <br /> with a little help from us.
        </p>
 
    </div>
  );
}
