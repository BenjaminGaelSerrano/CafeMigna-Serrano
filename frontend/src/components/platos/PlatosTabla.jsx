import Button from "../ui/Button.jsx";
import Etiqueta from "../ui/Etiqueta.jsx";
import { formatearPrecio } from "../../utils/formato.js";
import { nombreCategoria } from "../../utils/platos.js";
import "../ui/Tabla.css";

// Listado administrable de platos con acciones de edición y eliminación.
export default function PlatosTabla({ platos, categorias, platoEditandoId, onEditar, onEliminar }) {
    return (
        <table className="tabla">
            <caption className="sr-only">Platos cargados en el menú</caption>
            <thead>
                <tr>
                    <th scope="col">Plato</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Estado</th>
                    <th scope="col"><span className="sr-only">Acciones</span></th>
                </tr>
            </thead>
            <tbody>
                {platos.map(plato => (
                    <tr key={plato.id} className={plato.id === platoEditandoId ? "tabla__fila--activa" : ""}>
                        <th scope="row" className="tabla__celda-principal">
                            <span className="tabla__principal">{plato.nombre}</span>
                            <span className="tabla__secundario">{nombreCategoria(categorias, plato.categoriaId)}</span>
                        </th>
                        <td data-etiqueta="Precio">{formatearPrecio(plato.precio)}</td>
                        <td data-etiqueta="Estado">
                            <Etiqueta tono={plato.disponible ? "exito" : "neutro"}>
                                {plato.disponible ? "Disponible" : "No disponible"}
                            </Etiqueta>
                        </td>
                        <td className="tabla__acciones">
                            <Button variante="secundario" tamano="chico" onClick={() => onEditar(plato)}>
                                Editar<span className="sr-only"> {plato.nombre}</span>
                            </Button>
                            <Button variante="texto" className="tabla__eliminar" onClick={() => onEliminar(plato)}>
                                Eliminar<span className="sr-only"> {plato.nombre}</span>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
