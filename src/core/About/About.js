import React, { Fragment } from "react";
import Footer from "../Footer";
import Layout from "../Layout";
import Qsn from "./qsn.png";

function About() {
  return (
    <Fragment>
      <Layout
        title="About Page"
        description="Choice your favorite Product in our Store"
        className="container"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          height: "68.5vh",
        }}
      >
        <img
          src={Qsn}
          alt="Qui sommes nous"
          style={{
            width: "80%",
            padding: "0",
          }}
        />
      </div>
      <Footer />
    </Fragment>
  );
}

export default About;
