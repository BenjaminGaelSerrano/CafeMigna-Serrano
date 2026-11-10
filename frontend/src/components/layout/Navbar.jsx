import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "../ui/Button.jsx";
import Logo from "./Logo.jsx";
import { IconoMenu, IconoCerrar } from "../ui/Iconos.jsx";
import "./Navbar.css";

const ENLACES_PRINCIPALES = [
    { to: "/", texto: "Inicio", end: true },
    { to: "/#sobre-nosotros", texto: "Sobre nosotros", ancla: true },
    { to: "/menu", texto: "Menú" },
    { to: "/pedido", texto: "Pedí online" },
    { to: "/contacto", texto: "Contacto" }
];

// variante "inicio": navegación completa (boceto de la landing).
// variante "interna": "Volver al inicio" + un botón de acción según la pantalla (bocetos internos).
export default function Navbar({ variante = "interna", cta }) {
    const [menuAbierto, setMenuAbierto] = useState(false);

    return (
        <header className="navbar">
            <div className="contenedor navbar__interior">
                <Logo />

                {variante === "inicio" ? (
                    <nav className="navbar__nav" aria-label="Principal">
                        <button
                            type="button"
                            className="navbar__toggle"
                            aria-expanded={menuAbierto}
                            aria-controls="menu-principal"
                            onClick={() => setMenuAbierto(abierto => !abierto)}
                        >
                            {menuAbierto ? <IconoCerrar /> : <IconoMenu />}
                            <span>Menú de navegación</span>
                        </button>

                        <ul id="menu-principal" className={`navbar__lista ${menuAbierto ? "navbar__lista--abierta" : ""}`}>
                            {ENLACES_PRINCIPALES.map(enlace => {
                                // Los enlaces a una sección (#ancla) no se marcan como página actual.
                                const Enlace = enlace.ancla ? Link : NavLink;
                                return (
                                    <li key={enlace.to}>
                                        <Enlace to={enlace.to} end={enlace.end} className="navbar__enlace" onClick={() => setMenuAbierto(false)}>
                                            {enlace.texto}
                                        </Enlace>
                                    </li>
                                );
                            })}
                            <li>
                                <Button to="/reservar" tamano="chico">Reservar mesa</Button>
                            </li>
                        </ul>
                    </nav>
                ) : (
                    <nav className="navbar__nav navbar__nav--interna" aria-label="Principal">
                        <Link to="/" className="navbar__enlace">Volver al inicio</Link>
                        {cta && <Button to={cta.to} tamano="chico">{cta.texto}</Button>}
                    </nav>
                )}
            </div>
        </header>
    );
}
