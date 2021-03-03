import React, {useState} from "react";
import api from "../services/api";

import Select from "../components/Select";

import "../styles/modal-register.css";

export default function ModalRegister({state, children}) {
  const [description, setDescription] = useState("");
  const [apartment_number, setApartmentNumber] = useState("");
  const [beach_umbrella, setBeachUmbrella] = useState("");

  const userId = localStorage.getItem("userId");

  async function handleNewRecord(e) {
    e.preventDefault();
    const data = {
      description,
      apartment_number,
      beach_umbrella,
    };
    try {
      await api.post("access-records", data, {
        headers: { Authorization: userId }
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

  return (
    <div id="modal-register" className={state}>
      <div className="modal">
        <div id="form">
          <h2>
            Novo Registro
          </h2>
          <form action="" onSubmit={handleNewRecord}>
            <Select
              name="description"
              label="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              options={[
                { 
                  value: "Proprietário", 
                  label: "Proprietário" 
                },
                { 
                  value: "Locatário", 
                  label: "Locatário" 
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
                onChange={(e) => setApartmentNumber(e.target.value)}
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
                  onChange={(e) => setBeachUmbrella(e.target.value)}
                />
              </div>
            {children}
          </form>
        </div>
      </div>
    </div>
  );
};
