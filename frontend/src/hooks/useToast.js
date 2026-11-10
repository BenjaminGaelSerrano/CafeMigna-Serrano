import { useContext } from "react";
import { ToastContext } from "../components/notificaciones/ToastContext.js";

// Acceso al sistema de notificaciones: notificarExito(mensaje) y notificarError(mensaje).
export default function useToast() {
    const contexto = useContext(ToastContext);
    if (!contexto) {
        throw new Error("useToast tiene que usarse dentro de <ToastProvider>.");
    }
    return contexto;
}
