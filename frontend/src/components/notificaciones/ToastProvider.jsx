import { useCallback, useMemo, useRef, useState } from "react";
import { ToastContext } from "./ToastContext.js";
import Toast from "./Toast.jsx";
import "./Toast.css";

const DURACION = { exito: 4000, error: 7000 };
const MAXIMO_VISIBLES = 3;

// Sistema único de notificaciones laterales para éxitos y errores de toda la app.
export default function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const siguienteId = useRef(1);

    const cerrar = useCallback(id => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const notificar = useCallback((tipo, mensaje) => {
        const id = siguienteId.current++;
        setToasts(prev => {
            // Evita duplicar el mismo aviso si ya está en pantalla.
            if (prev.some(toast => toast.tipo === tipo && toast.mensaje === mensaje)) return prev;
            return [...prev, { id, tipo, mensaje }].slice(-MAXIMO_VISIBLES);
        });
        setTimeout(() => cerrar(id), DURACION[tipo]);
    }, [cerrar]);

    const valor = useMemo(() => ({
        notificarExito: mensaje => notificar("exito", mensaje),
        notificarError: mensaje => notificar("error", mensaje)
    }), [notificar]);

    const exitos = toasts.filter(toast => toast.tipo === "exito");
    const errores = toasts.filter(toast => toast.tipo === "error");

    return (
        <ToastContext.Provider value={valor}>
            {children}
            <div className="toasts">
                {/* Regiones separadas: los errores se anuncian con prioridad. */}
                <div className="toasts__lista" role="alert" aria-live="assertive" aria-atomic="false">
                    {errores.map(toast => <Toast key={toast.id} {...toast} onCerrar={cerrar} />)}
                </div>
                <div className="toasts__lista" role="status" aria-live="polite" aria-atomic="false">
                    {exitos.map(toast => <Toast key={toast.id} {...toast} onCerrar={cerrar} />)}
                </div>
            </div>
        </ToastContext.Provider>
    );
}
