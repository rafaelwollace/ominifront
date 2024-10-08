import React from "react";
import logo from "../../assets/logo.png"; 

const Header: React.FC = () => {
  return (
    <header>
      <nav
        className="navbar"
        style={{
          backgroundColor: "#2a2b60",
          padding: "0.5rem",
        }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src={logo}
              alt="Logo"
              style={{
                height: "40px", 
                width: "auto",
              }}
            />
          </a>
          <span style={{ color: "white", marginLeft: "10px" }}>
            Desafio Bemol Digital
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
