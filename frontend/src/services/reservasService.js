import { request } from "./api.js";

const RECURSO = "/reservas";

export function getReservas() {
    return request(RECURSO);
}

export function createReserva(reserva) {
    return request(RECURSO, { metodo: "POST", body: reserva });
}

export function cambiarEstadoReserva(id, estado) {
    return request(`${RECURSO}/${id}`, { metodo: "PATCH", body: { estado } });
}

export function deleteReserva(id) {
    return request(`${RECURSO}/${id}`, { metodo: "DELETE" });
}
