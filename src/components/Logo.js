import logoImg from "../assets/logo.svg";
import "../styles/logo.css";

export default function Logo({description}) {
  return (
    <div className="logo">
      <img 
        src={logoImg} 
        alt="Logo" 
        className="logo-image"
      />
      <div>
        <h1>
          Controle de Praia
          <strong>.com</strong>
        </h1>
        <p>{description}</p>
      </div>
    </div>
  );
};
