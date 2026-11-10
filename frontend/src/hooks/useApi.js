import { useCallback, useEffect, useState } from "react";
import useToast from "./useToast.js";

// Carga datos con una función de services/ y expone los estados de carga y error.
// "cargarDatos" tiene que ser una función estable (definida fuera del componente).
export default function useApi(cargarDatos, valorInicial) {
    const [datos, setDatos] = useState(valorInicial);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const { notificarError } = useToast();

    const cargar = useCallback(async () => {
        setCargando(true);
        setError(null);
        try {
            setDatos(await cargarDatos());
        } catch (err) {
            setError(err.message);
            notificarError(err.message);
        } finally {
            setCargando(false);
        }
    }, [cargarDatos, notificarError]);

    useEffect(() => {
        cargar();
    }, [cargar]);

    return { datos, setDatos, cargando, error, recargar: cargar };
}
