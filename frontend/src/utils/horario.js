import { NEGOCIO } from "./negocio.js";

// El local abre a las 8:00 y cierra a la 1:00 del día siguiente.
export function estaAbierto(fecha = new Date()) {
    const hora = fecha.getHours();
    return hora >= NEGOCIO.horaApertura || hora < NEGOCIO.horaCierre;
}

export function textoEstadoLocal(fecha = new Date()) {
    return estaAbierto(fecha)
        ? `Abierto ahora, hasta la ${NEGOCIO.horaCierre}:00`
        : `Cerrado ahora, abrimos a las ${NEGOCIO.horaApertura}:00`;
}
