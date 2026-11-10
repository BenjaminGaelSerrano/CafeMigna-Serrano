import { NavLink } from "react-router-dom";
import "./AdminNav.css";

const SECCIONES = [
    { to: "/admin/platos", texto: "Platos del menú" },
    { to: "/admin/reservas", texto: "Reservas" }
];

// Pestañas para moverse entre las pantallas de administración.
export default function AdminNav() {
    return (
        <nav className="admin-nav" aria-label="Secciones de administración">
            <ul>
                {SECCIONES.map(seccion => (
                    <li key={seccion.to}>
                        <NavLink to={seccion.to} className="admin-nav__enlace">{seccion.texto}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
