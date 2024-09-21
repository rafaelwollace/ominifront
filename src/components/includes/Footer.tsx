import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: "#2a2b60", // Mesma cor do header
        color: "white", // Cor da fonte branca
        textAlign: "center",
        padding: "1rem 0",
      }}
    >
      <div className="container">
        <span>© 2024 Rafael Cunha.</span>
      </div>
    </footer>
  );
};

export default Footer;
