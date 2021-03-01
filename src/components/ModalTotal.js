import React from "react";
import "../styles/modal-total.css";

export default function ModalTotal({ state, children, ...props}) {

  return (
    <div id="modal-total" className={state}>
      <div className="modal">
        <div id="form">
          <h2>Adicione o Total de Guarda-sóis</h2>
          <form action="">
            <div className="input-group">
              <label htmlFor="umbrella" className="sr-only">
                Guarda-sóis
              </label>
              <input
                type="number"
                id="umbrella"
                name="umbrella"
                placeholder="Total de Guarda-sóis"
                {...props}
              />
            </div>
            {children}
          </form>
        </div>
      </div>
    </div>
  );
}
