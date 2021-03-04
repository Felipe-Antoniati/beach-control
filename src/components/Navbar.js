import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.svg";
import "../styles/navbar.css";

export default function Navbar({ user, children, click }) {
  return (
    <div className="navbar">
      <div className="nav-content container">
        <div className="nav-left">
          <img src={logoImg} alt="Logo" />
          <h1>
            Bem Vindo(a),
            <span>{user}</span>
          </h1>
        </div>
        <Link to="/" className="btn-logout" onClick={click}>
          Sair
        </Link>
      </div>
    </div>
  );
}
