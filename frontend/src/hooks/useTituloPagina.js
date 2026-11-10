import { useEffect } from "react";
import { NEGOCIO } from "../utils/negocio.js";

// Cambia el título de la pestaña en cada pantalla (ayuda a lectores de pantalla y al historial).
export default function useTituloPagina(titulo) {
    useEffect(() => {
        document.title = titulo ? `${titulo} | ${NEGOCIO.nombre}` : NEGOCIO.nombre;
    }, [titulo]);
}
