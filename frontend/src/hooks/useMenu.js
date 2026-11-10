import { useCallback } from "react";
import useApi from "./useApi.js";
import { getPlatos } from "../services/platosService.js";
import { getCategorias } from "../services/categoriasService.js";

const MENU_VACIO = { platos: [], categorias: [] };

async function cargarMenu() {
    const [platos, categorias] = await Promise.all([getPlatos(), getCategorias()]);
    return { platos, categorias };
}

// Platos y categorías desde la API, con estados de carga y error.
export default function useMenu() {
    const { datos, setDatos, cargando, error, recargar } = useApi(cargarMenu, MENU_VACIO);

    // Permite actualizar la lista de platos sin volver a pedirla (después de crear, editar o borrar).
    const setPlatos = useCallback(actualizar => {
        setDatos(prev => ({
            ...prev,
            platos: typeof actualizar === "function" ? actualizar(prev.platos) : actualizar
        }));
    }, [setDatos]);

    return { platos: datos.platos, setPlatos, categorias: datos.categorias, cargando, error, recargar };
}
