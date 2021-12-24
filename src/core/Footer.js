import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer class="page-footer font-small white bg-success text-black">
      <div class="footer-copyright text-center py-3">
        © 2021 Copyright:
        <Link to={"/home"} className="text-white">
          {" "}
          Books Store
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
