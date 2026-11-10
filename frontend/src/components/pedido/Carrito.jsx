import { IconoMas, IconoMenos } from "../ui/Iconos.jsx";
import { formatearPrecio } from "../../utils/formato.js";
import "./Carrito.css";

// Lista del carrito con control de cantidades y total.
export default function Carrito({ items, total, cantidadTotal, onCambiarCantidad }) {
    return (
        <div className="carrito">
            <h2 className="carrito__titulo">Tu carrito</h2>

            {items.length === 0 ? (
                <p className="carrito__vacio">
                    Todavía no sumaste platos. Tocá el botón + de cada plato para agregarlo.
                </p>
            ) : (
                <ul className="carrito__lista">
                    {items.map(({ plato, cantidad }) => (
                        <li key={plato.id} className="carrito__item">
                            <div className="carrito__detalle">
                                <span className="carrito__nombre">{plato.nombre}</span>
                                <span className="carrito__subtotal">{formatearPrecio(plato.precio * cantidad)}</span>
                            </div>
                            <div className="carrito__cantidad" role="group" aria-label={`Cantidad de ${plato.nombre}`}>
                                <button
                                    type="button"
                                    className="carrito__boton"
                                    onClick={() => onCambiarCantidad(plato.id, -1)}
                                    aria-label={cantidad === 1 ? `Quitar ${plato.nombre} del carrito` : `Restar una unidad de ${plato.nombre}`}
                                >
                                    <IconoMenos />
                                </button>
                                <span className="carrito__numero">{cantidad}</span>
                                <button
                                    type="button"
                                    className="carrito__boton"
                                    onClick={() => onCambiarCantidad(plato.id, 1)}
                                    aria-label={`Sumar una unidad de ${plato.nombre}`}
                                >
                                    <IconoMas />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Se anuncia cada cambio del total a los lectores de pantalla. */}
            <p className="carrito__total" aria-live="polite">
                <span>Total{cantidadTotal > 0 ? ` (${cantidadTotal} ${cantidadTotal === 1 ? "plato" : "platos"})` : ""}:</span>
                <strong>{formatearPrecio(total)}</strong>
            </p>
        </div>
    );
}
