import { request } from "./api.js";

const RECURSO = "/categorias";

export function getCategorias() {
    return request(RECURSO);
}
