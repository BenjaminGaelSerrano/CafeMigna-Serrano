import SectionTitle from "../ui/SectionTitle.jsx";
import { formatearPrecio } from "../../utils/formato.js";
import "./MenuCategoria.css";

// Una categoría de la carta: título subrayado y platos en dos columnas, con el precio
// unido al nombre por una línea punteada, como en la carta impresa de un bodegón.
export default function MenuCategoria({ categoria, platos }) {
    const idTitulo = `categoria-${categoria.id}`;

    return (
        <section className="menu-categoria" aria-labelledby={idTitulo}>
            <SectionTitle id={idTitulo}>{categoria.nombre}</SectionTitle>
            <ul className="menu-categoria__lista">
                {platos.map(plato => (
                    <li key={plato.id} className="menu-item">
                        <div className="menu-item__linea">
                            <h3 className="menu-item__nombre">{plato.nombre}</h3>
                            <span className="menu-item__puntos" aria-hidden="true" />
                            <p className="menu-item__precio">{formatearPrecio(plato.precio)}</p>
                        </div>
                        {plato.descripcion && <p className="menu-item__descripcion">{plato.descripcion}</p>}
                    </li>
                ))}
            </ul>
        </section>
    );
}
