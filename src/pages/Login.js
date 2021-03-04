import React, { useState } from "react";
import {Link, useHistory } from "react-router-dom";
import api from "../services/api";

import Logo from "../components/Logo";
import Button from "../components/Button";
import Waves from "../components/Waves";

import "../styles/login.css";

export default function Login() {
  const [id, setId] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post("sessions", { id });
      localStorage.setItem("userId", id);
      localStorage.setItem("userName", response.data.name);
      history.push("/home");
    } catch {
      alert("Falha no login tente novamente!");
    }
  }
  return (
    <div id="login-page">
      <header className="header-login">
        <Logo description="O Jeito mais fácil de ter o controle 
          de acesso ao Serviço de Praia"/>
      </header>
      <Waves />
      <section className="form-login">
        <form onSubmit={handleLogin} className="container">
          <h2>Faça seu Login</h2>
          <input
            placeholder="Sua ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Button 
            norm="submit" 
            name="btn-save" 
            description="Entrar"
          />
          <div className="fotter-form">
            <Link to="/register" className="link-register">
              <span>
                Não tem Cadastro?
                <br />
                Cadastre-se agora
              </span>
            </Link>
            <strong>
              É de Graça!
            </strong>
          </div>
        </form>
      </section>
      <div className="ads-two container">
          <h2>Anuncio Google Ads</h2>
        </div>
    </div>
  );
};
