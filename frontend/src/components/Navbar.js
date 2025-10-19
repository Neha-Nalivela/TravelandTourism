import React, { useState } from "react";
import Menu from "./MenuDropdown";
import Profile from "./ProfileDropdown";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 25px",
        background: "#eee",
        position: "relative",
      }}
    >
      <h2>Travel & Tourism</h2>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Menu show={showMenu} setShow={setShowMenu} setShowProfile={setShowProfile} />
        <Profile show={showProfile} setShow={setShowProfile} setShowMenu={setShowMenu} />
      </div>
    </nav>
  );
}

export default Navbar;
