import React, { useState, useEffect } from "react";
import {Link, useHistory } from "react-router-dom";
import api from "../services/api";

import Card from "../components/Card";
import Logo from "../components/Logo";
import ModalTotal from "../components/ModalTotal";
import ModalRegister from "../components/ModalRegister";
import ButtonsActions from "../components/ButtonsActions";

import { 
  FaCog, FaMinusCircle, FaUmbrellaBeach 
} from "react-icons/fa";

import "../styles/home.css";

export default function Home() {
  const [records, setRecords] = useState([]);
  const [openModalTotal, setOpenModalTotal] = useState("");
  const [openModalRegister, setOpenModalRegister] = useState("");

  const history = useHistory();
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");



  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: userId,
        },
      })
      .then(response => {
        setRecords(response.data);
      });
  }, [userId]);

  function activeModalTotal() {
    setOpenModalTotal("active");
  }

  function activeModalRegister() {
    setOpenModalRegister("active")
  }

  function removeActiveModalRegister() {
    setOpenModalRegister("")
  }
  function removeActiveModalTotal() {
    setOpenModalTotal("");
  }

  async function handleDeleteRecord(id) {
    try {
      await api.delete(`access-records/${id}`, {
        headers: {
          Authorization: userId,
        },
      });
      setRecords(records.filter(record => record.id !== id));
    } catch (err) {
      alert("Erro ao remover registro, tente novamente.");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="header-page">
      <ModalTotal state={openModalTotal}>
       <ButtonsActions 
        onClick={removeActiveModalTotal} 
      />
      </ModalTotal>
      <ModalRegister state={openModalRegister}>
        <ButtonsActions 
          onClick={removeActiveModalRegister} 
        />
      </ModalRegister>
      <header className="header-home">
        <Link to="/" onClick={handleLogout}>
          <span>Sair</span>          
        </Link>
        <Logo />
        <p className="welcome">
          Seja bem vindo(a),
          {userName}
        </p>
      </header>
      <main className="container">
        <section id="balance">
          <h2 className="sr-only">Visão Geral</h2>
          <Card
            cardName="card total"
            description="Guarda-sóis"
            id="totalUmbrellas"
            valueOptions={0}
          >
            <FaCog 
              size={26} 
              className="add-content" 
              onClick={activeModalTotal} 
            />
          </Card>
          <Card
            cardName="card in-use"
            description="Em uso"
            id="umbrellasInUse"
            valueOptions={0}
          />
          <Card
            cardName="card free"
            description="Livres"
            id="freeUmbrellas"
            valueOptions={0}
          />
        </section>
        <button 
          type="button " 
          className="btn-record" 
          onClick={activeModalRegister}
        >
          <span>Registrar novo uso</span>
          <FaUmbrellaBeach 
            size={26} 
            className="icon-umbrella" 
          />
        </button>
        <section id="records">
          <h2 className="sr-only">
            Registros de uso
          </h2>
          <table id="data-table">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Apartamento</th>
                <th>Guarda Sol</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td className="property">
                    {record.description}
                  </td>
                  <td className="umbrellaNumber">
                    {record.beach_umbrella}
                  </td>
                  <td className="apartmentNumber">
                    {record.apartment_number}
                  </td>
                  <td className="btn-remove">
                    <FaMinusCircle 
                      size={26} 
                      alt="Remover registro"                     
                      onClick={
                        () => handleDeleteRecord(record.id)
                      }  
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
