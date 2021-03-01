import React from "react";

export default function ButtonsActions({...props}) {
  return (
    <div className="input-group actions">
      <button 
        type="button" 
        className="btn-cancel" 
        {...props}
      >
        Cancelar
      </button>
      <button 
        type="submit" 
        className="btn-save"
      >
        Salvar
      </button>
    </div>
  );
}
