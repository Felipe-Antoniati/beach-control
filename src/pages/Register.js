import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {FiArrowLeft} from "react-icons/fi";

import Logo from "../components/Logo";
import Waves from "../components/Waves";
import api from "../services/api";

import "../styles/register.css";

export default function Register() {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [whatsapp, setWhatsapp] = useState("");
const [password, setPassword] = useState("");
const history = useHistory();



async function handleRegister(e) {
  e.preventDefault();

  const data = {
    name,
    email,
    whatsapp,
    password,
  };
  const response = await api.post("users", data);
  alert(`Seu ID de acesso: ${response.data.id}`);
  setName("");
  setEmail("");
  setWhatsapp("");
  setPassword("");
  history.push("/");
}
  return(
    <div className="register-page">
      <div className="back-link">
        <Link to="/">
          <FiArrowLeft size={22}/>
          <span>Voltar</span>          
        </Link>
      </div>
      <div className="content">
        <section>
          <Logo />
          <p className="desc-register">
            Faça seu cadastro, entre na plataforma, e tenha o controle de quem
            está utilizando o Serviço de Praia.
          </p>
        </section>
        <div className="content-right">
          <h1> Cadastro </h1>
          <form onSubmit={handleRegister}>
            <input
              placeholder="Nome da Empresa"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="WhatsApp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn-register" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    <Waves />
    </div>
  );
};