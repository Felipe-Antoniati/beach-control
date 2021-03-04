import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Select from "../components/Select";

import { FaCog, FaMinusCircle, FaUmbrellaBeach } from "react-icons/fa";

import "../styles/home.css";

export default function Home() {
  const [records, setRecords] = useState([]);
  const [getTotal, setGetTotal] = useState([]);

  const [total, setTotal] = useState("");

  const [description, setDescription] = useState("");
  const [apartment_number, setApartmentNumber] = useState("");
  const [beach_umbrella, setBeachUmbrella] = useState("");

  const [modalTotal, setModalTotal] = useState("");
  const [modalRegister, setModalRegister] = useState("");

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
      .then((response) => {
        setRecords(response.data);
      })
      .then();
  }, [userId]);

  useEffect(() => {
    api
      .get("beach-umbrellas", {
        headers: {
          Authorization: userId,
        },
      })
      .then((response) => {
        setGetTotal(response.data.totalBeachUmbrellas.pop().total);
      });
  }, [userId]);

  async function handleNewRecord(e) {
    e.preventDefault();
    const data = {
      description,
      apartment_number,
      beach_umbrella,
    };
    try {
      await api.post("access-records", data, {
        headers: { Authorization: userId },
      });
      setDescription("");
      setApartmentNumber("");
      setBeachUmbrella("");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Erro ao cadastrar novo registro, tente novamente.");
    }
  }

  async function handleDeleteRecord(id) {
    try {
      await api.delete(`access-records/${id}`, {
        headers: {
          Authorization: userId,
        },
      });
      setRecords(records.filter((record) => record.id !== id));
    } catch (err) {
      alert("Erro ao remover registro, tente novamente.");
    }
  }

  async function handleTotal(e) {
    e.preventDefault();
    const addTotal = {
      total,
    };
    api.post("beach-umbrellas", addTotal, {
      headers: {
        Authorization: userId,
      },
    });
    window.location.reload();
  }

  function activeModalTotal() {
    if(modalTotal === "") {
      setModalTotal("active");
    } else {
      setModalTotal("")
    }
  } 
  function activeModalRegister() {
    if(modalRegister === "") {
      setModalRegister("active");
    } else {
      setModalRegister("")
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="header-page">
      <Modal state={modalTotal}>
        <div id="form">
          <h2>Adicione o Total de Guarda-sóis</h2>
          <form action="" onSubmit={handleTotal}>
            <div className="input-group">
              <label htmlFor="total" className="sr-only">
                Guarda-sóis
              </label>
              <input
                type="text"
                id="total"
                name="total"
                placeholder="Total de Guarda-sóis"
                value={total}
                onChange={
                  (e) => setTotal(e.target.value)
                }
              />
            </div>
            <div className="actions">
              <Link
                to="/home"
                onClick={activeModalTotal}
              >
                Cancelar
              </Link>
              <Button 
                norm="submit" 
                name="btn-save" 
                description="Adicionar" 
              />
              </div>
          </form>
        </div>
      </Modal>
      <Modal state={modalRegister}>
        <div id="form">
          <h2>Novo Registro</h2>
          <form action="" onSubmit={handleNewRecord}>
            <Select
              name="description"
              label="Descrição"
              value={description}
              onChange={
                (e) => setDescription(e.target.value)
              }
              options={[
                {
                  value: "Proprietário",
                  label: "Proprietário",
                },
                {
                  value: "Locatário",
                  label: "Locatário",
                },
              ]}
            />
            <div className="input-group">
              <label htmlFor="apartment">
                Apartamento
              </label>
              <input
                maxLength={4}
                type="text"
                id="apartment"
                name="apartment"
                placeholder="Número do Apartamento"
                value={apartment_number}
                onChange={
                  (e) => setApartmentNumber(e.target.value)
                }
              />
            </div>
            <div className="input-group">
              <label htmlFor="umbrella">
                Guarda Sol
              </label>
              <input
                maxLength={3}
                type="text"
                id="umbrella"
                name="umbrella"
                placeholder="Número do Guarda sol"
                value={beach_umbrella}
                onChange={
                  (e) => setBeachUmbrella(e.target.value)
                }
              />
            </div>
              <div className="actions">
                <Link
                  to="/home"
                  onClick={activeModalRegister}
                >
                  Cancelar
                </Link>
                <Button 
                  norm="submit" 
                  name="btn-save" 
                  description="Registrar" 
                />
              </div>
          </form>
        </div>
      </Modal>
      <Navbar user={userName} click={handleLogout} />
      <header className="header-home">
        <div className="ads-one container">
          <h2>Anuncio Google Ads</h2>
        </div>
      </header>
      <main className="container">
        <section id="balance">
          <h2 className="sr-only">Visão Geral</h2>
          <div className="card total">
            <div>
              <h3>
                <span>Guarda-sóis</span>
              </h3>
              <p className="totalUmbrellas">
                {getTotal}
              </p>
            </div>
            <FaCog
              size={26}
              className="add-content"
              onClick={activeModalTotal}
            />
          </div>
          <div className="card in-use">
            <div>
              <h3>
                <span>Em uso</span>
              </h3>
              <p className="umbrellasInUse">
                {records.length}
              </p>
            </div>
          </div>
          <div className="card free">
            <div>
              <h3>
                <span>Livres</span>
              </h3>
              <p className="freeUmbrellas">
                {getTotal - records.length}
              </p>
            </div>
          </div>
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
          <h2 className="sr-only">Registros de uso</h2>
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
                  <td
                    className={
                      record.description === "Proprietário"
                        ? "property"
                        : "locatary"
                    }
                  >
                    {record.description}
                  </td>
                  <td className="apartmentNumber">
                    {record.apartment_number}
                  </td>
                  <td className="umbrellaNumber">
                    {record.beach_umbrella}
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
      <footer className="footer-home">
        <div className="ads-two container">
          <h2>Anuncio Google Ads</h2>
        </div>
      </footer>
    </div>
  );
};
