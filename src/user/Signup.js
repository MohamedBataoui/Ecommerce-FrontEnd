import React, { useState } from "react";
import Layout from "./../core/Layout";
import toastr from "toastr";
import "toastr/build/toastr.css";

import { API_URL } from "./../config";
import Footer from "../core/Footer";

const Signup = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const submitSignup = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.error) {
          toastr.warning(res.error, "Please Check form !", {
            positionClass: "toast-bottom-left",
          });
        } else {
          toastr.success("User is created SuccessFully", "New Accout", {
            positionClass: "toast-bottom-left",
          });

          props.history.push("/signin");
        }
      })
      .catch((err) =>
        toastr.error(err, "Server error !", {
          positionClass: "toast-bottom-left",
        })
      );
  };

  const form = () => (
    <form onSubmit={submitSignup}>
      <div className="form-group">
        <label htmlFor="name" className="text-muted">
          name
        </label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          id="name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="text-muted">
          email
        </label>
        <input
          onChange={handleChange}
          type="email"
          className="form-control"
          id="email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="text-muted">
          password
        </label>
        <input
          onChange={handleChange}
          type="password"
          className="form-control"
          id="password"
        />
      </div>

      <button className="btn btn-lg btn-block btn-outline-success">
        Sign Up
      </button>
    </form>
  );

  return (
    <div>
      <Layout
        title="Sign up"
        description="Sign up Node React Ecommerce App"
        className="container"
      >
        <div className="row" style={{ minHeight: "68.5vh" }}>
          <div className="col-md-6 mx-auto">{form()}</div>
        </div>
      </Layout>
      <Footer />
    </div>
  );
};

export default Signup;
