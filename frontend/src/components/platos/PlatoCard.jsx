import PlatoImagen from "./PlatoImagen.jsx";
import { formatearPrecio } from "../../utils/formato.js";
import "./PlatoCard.css";

// Tarjeta de plato reutilizada en la portada (vertical) y en "Armá tu pedido" (horizontal).
// "accion" permite inyectar un botón (por ejemplo, el "+" para sumar al carrito).
export default function PlatoCard({ plato, variante = "vertical", accion }) {
    return (
        <article className={`plato-card plato-card--${variante}`}>
            <div className="plato-card__foto">
                <PlatoImagen plato={plato} />
            </div>
            <div className="plato-card__cuerpo">
                <h3 className="plato-card__nombre">{plato.nombre}</h3>
                {plato.descripcion && <p className="plato-card__descripcion">{plato.descripcion}</p>}
                <p className="plato-card__precio">{formatearPrecio(plato.precio)}</p>
            </div>
            {accion && <div className="plato-card__accion">{accion}</div>}
        </article>
    );
}
