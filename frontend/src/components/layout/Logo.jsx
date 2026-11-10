import { Link } from "react-router-dom";
import "./Logo.css";

// Logotipo en texto, inspirado en el cartel de la fachada ("migna café restó").
export default function Logo({ claro = false }) {
    return (
        <Link to="/" className={`logo ${claro ? "logo--claro" : ""}`}>
            <span className="logo__nombre">migna</span>
            <span className="logo__bajada">café restó</span>
        </Link>
    );
}
