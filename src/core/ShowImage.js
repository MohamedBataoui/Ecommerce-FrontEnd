import React from "react";
import { API_URL } from "./../config";

const ShowImage = ({ item, url, className }) => {
  return (
    <div className="d-flex justify-content-center">
      <img
        className={className}
        style={{ width: "200px", height: "300px" }}
        src={`${API_URL}/${url}/${item._id}`}
        alt={`${item.name}`}
      />
    </div>
  );
};

export default ShowImage;
