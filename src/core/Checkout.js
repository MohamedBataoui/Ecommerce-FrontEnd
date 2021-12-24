import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "./../auth/helpers";
import { getBraintreeToken } from "./ApiCore";
import DropIn from "braintree-web-drop-in-react";

function Checkout({ products }) {
  const [data, setData] = useState({
    braintreeToken: null,
    error: null,
    instance: {},
  });

  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;

  useEffect(() => {
    setData({ ...data, braintreeToken: token });
    getBraintreeToken(userId, token)
      .then((res) => setData({ ...data, braintreeToken: res.token }))
      .catch((err) => setData({ ...data, error: err }));
  }, []);
  console.log(data.braintreeToken);
  const totalToCheckout = (products) => {
    return products.reduce(
      (total, product) => total + product.count * product.price,
      0
    );
  };

  const dropIn = () => {
    return (
      <div>
        {data.braintreeToken !== null && products.lenght > 0 && (
          <DropIn
            options={{ authorization: data.braintreeToken }}
            onInstance={(instance) => (data.instance = instance)}
          />
        )}
      </div>
    );
  };

  const showBtnToCheckout = () => {
    if (isAuthenticated()) {
      return (
        <>
          {dropIn()}
          <button className="btn btn-raised btn-success btn-block">
            Commander
          </button>
        </>
      );
    }
    return (
      <Link to="/signin">
        <button className="btn btn-raised btn-warning btn-block">
          Connecter pour Commander
        </button>
      </Link>
    );
  };
  return (
    <div>
      <h2 className="text-center">
        Total:{" "}
        <span className="badge badge-success">{totalToCheckout(products)}</span>
      </h2>
      {showBtnToCheckout()}
    </div>
  );
}

export default Checkout;
