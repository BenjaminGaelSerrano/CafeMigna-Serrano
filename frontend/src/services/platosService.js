import { request } from "./api.js";

const RECURSO = "/platos";

export function getPlatos() {
    return request(RECURSO);
}

export function getPlato(id) {
    return request(`${RECURSO}/${id}`);
}

export function createPlato(plato) {
    return request(RECURSO, { metodo: "POST", body: plato });
}

export function updatePlato(id, plato) {
    return request(`${RECURSO}/${id}`, { metodo: "PUT", body: plato });
}

export function deletePlato(id) {
    return request(`${RECURSO}/${id}`, { metodo: "DELETE" });
}
