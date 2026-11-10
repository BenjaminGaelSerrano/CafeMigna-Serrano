import Button from "../ui/Button.jsx";
import Etiqueta from "../ui/Etiqueta.jsx";
import { formatearFecha, formatearTelefono } from "../../utils/formato.js";
import { ESTADOS_RESERVA } from "../../utils/reservas.js";
import "../ui/Tabla.css";

// Reservas recibidas desde el formulario público, con acciones para confirmar, cancelar o eliminar.
export default function ReservasTabla({ reservas, procesandoId, onCambiarEstado, onEliminar }) {
    return (
        <table className="tabla">
            <caption className="sr-only">Reservas de mesas</caption>
            <thead>
                <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Día y hora</th>
                    <th scope="col">Personas</th>
                    <th scope="col">Estado</th>
                    <th scope="col"><span className="sr-only">Acciones</span></th>
                </tr>
            </thead>
            <tbody>
                {reservas.map(reserva => {
                    const nombre = reserva.cliente?.nombre ?? "Cliente sin datos";
                    const estado = ESTADOS_RESERVA[reserva.estado] ?? ESTADOS_RESERVA.pendiente;
                    const procesando = procesandoId === reserva.id;

                    return (
                        <tr key={reserva.id}>
                            <th scope="row" className="tabla__celda-principal">
                                <span className="tabla__principal">{nombre}</span>
                                {reserva.cliente?.telefono && (
                                    <span className="tabla__secundario">
                                        <a href={`tel:${reserva.cliente.telefono}`}>{formatearTelefono(reserva.cliente.telefono)}</a>
                                    </span>
                                )}
                            </th>
                            <td data-etiqueta="Día">
                                <span className="tabla__principal">{formatearFecha(reserva.fecha)}</span>
                                <span className="tabla__secundario">{reserva.hora} hs</span>
                            </td>
                            <td data-etiqueta="Personas">{reserva.cantidadPersonas}</td>
                            <td data-etiqueta="Estado">
                                <Etiqueta tono={estado.tono}>{estado.texto}</Etiqueta>
                            </td>
                            <td className="tabla__acciones">
                                {reserva.estado === "pendiente" && (
                                    <Button
                                        variante="secundario"
                                        tamano="chico"
                                        disabled={procesando}
                                        onClick={() => onCambiarEstado(reserva, "confirmada")}
                                    >
                                        Confirmar<span className="sr-only"> la reserva de {nombre}</span>
                                    </Button>
                                )}
                                {reserva.estado !== "cancelada" && (
                                    <Button
                                        variante="texto"
                                        disabled={procesando}
                                        onClick={() => onCambiarEstado(reserva, "cancelada")}
                                    >
                                        Cancelar<span className="sr-only"> la reserva de {nombre}</span>
                                    </Button>
                                )}
                                <Button
                                    variante="texto"
                                    className="tabla__eliminar"
                                    disabled={procesando}
                                    onClick={() => onEliminar(reserva)}
                                >
                                    Eliminar<span className="sr-only"> la reserva de {nombre}</span>
                                </Button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
