import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import { NEGOCIO } from "../../utils/negocio.js";
import "./Footer.css";

const ENLACES = [
    { to: "/menu", texto: "Menú" },
    { to: "/pedido", texto: "Pedí online" },
    { to: "/reservar", texto: "Reservar mesa" },
    { to: "/contacto", texto: "Contacto" },
    { to: "/admin/platos", texto: "Administración" }
];

export default function Footer() {
    return (
        <footer className="footer">
            <div className="contenedor">
                <div className="footer__columnas">
                    <section aria-labelledby="footer-ubicacion">
                        <h2 id="footer-ubicacion" className="footer__titulo">Ubicación</h2>
                        <address className="footer__texto">
                            {NEGOCIO.direccion}<br />
                            {NEGOCIO.ciudad}
                        </address>
                        <a className="footer__enlace" href={NEGOCIO.mapsUrl} target="_blank" rel="noreferrer">
                            Cómo llegar<span className="sr-only"> (se abre en Google Maps)</span>
                        </a>
                    </section>

                    <section aria-labelledby="footer-horarios">
                        <h2 id="footer-horarios" className="footer__titulo">Horarios</h2>
                        <p className="footer__texto">
                            {NEGOCIO.dias}<br />
                            {NEGOCIO.horario}
                        </p>
                    </section>

                    <section aria-labelledby="footer-contacto">
                        <h2 id="footer-contacto" className="footer__titulo">Contacto</h2>
                        <p className="footer__texto">
                            Teléfono: <a className="footer__enlace" href={NEGOCIO.telefonoLink}>{NEGOCIO.telefono}</a>
                        </p>
                        <a className="footer__enlace" href={`https://wa.me/${NEGOCIO.whatsapp}`} target="_blank" rel="noreferrer">
                            Escribinos por WhatsApp<span className="sr-only"> (se abre en otra pestaña)</span>
                        </a>
                    </section>
                </div>

                <div className="footer__base">
                    <Logo claro />
                    <nav aria-label="Pie de página">
                        <ul className="footer__nav">
                            {ENLACES.map(enlace => (
                                <li key={enlace.to}>
                                    <Link to={enlace.to} className="footer__enlace">{enlace.texto}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
