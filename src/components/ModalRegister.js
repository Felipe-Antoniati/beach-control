import React from "react";
import Select from "../components/Select";
import "../styles/modal-register.css";

export default function ModalRegister({state, children}) {
  return (
    <div id="modal-register" className={state}>
      <div className="modal">
        <div id="form">
          <h2>
            Novo Registro
          </h2>
          <form action="">
            <Select
              label="Descrição"
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
              />
            </div>
            {children}
          </form>
        </div>
      </div>
    </div>
  );
};
