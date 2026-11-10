// Texto y tono visual de cada estado que devuelve la API.
export const ESTADOS_RESERVA = Object.freeze({
    pendiente: { texto: "Pendiente", tono: "alerta" },
    confirmada: { texto: "Confirmada", tono: "exito" },
    cancelada: { texto: "Cancelada", tono: "neutro" }
});

export function contarPorEstado(reservas, estado) {
    return reservas.filter(reserva => reserva.estado === estado).length;
}
