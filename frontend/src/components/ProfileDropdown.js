import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AppContext } from "../App";

function ProfileDropdown({ show, setShow, setShowMenu }) {
  const { user, setUser } = useContext(AppContext);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setShow(false);
    window.location.href = "/";
  };

  return (
    <>
      <FaUserCircle
        size={28}
        style={{ cursor: "pointer" }}
        onClick={() => {
          setShow(!show);
          setShowMenu(false);
        }}
      />
      {show && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "25px",
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            borderRadius: "8px",
            padding: "10px 15px",
            zIndex: 1000,
          }}
        >
          {!user ? (
            <>
              <Link to="/login" style={{ display: "block", margin: "8px 0" }} onClick={() => setShow(false)}>
                Login
              </Link>
              <Link to="/register" style={{ display: "block", margin: "8px 0" }} onClick={() => setShow(false)}>
                Register
              </Link>
            </>
          ) : (
            <>
              <span style={{ display: "block", marginBottom: "10px" }}>Hello, {user.name || user.email}</span>
              <button
                onClick={handleLogout}
                style={{
                  border: "none",
                  background: "#f44",
                  color: "#fff",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileDropdown;
