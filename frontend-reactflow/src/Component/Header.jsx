import React from "react";
import "../App.css";

const Header = () => {
  return (
    <div className=" flex space-btn">
      <div>
        <h2>Logo</h2>
      </div>
      <div>
        <h2>Workflow Builder Screen</h2>
      </div>
      <div>
        <h2>Workflow Id:</h2>
      </div>
    </div>
  );
};

export default Header;
