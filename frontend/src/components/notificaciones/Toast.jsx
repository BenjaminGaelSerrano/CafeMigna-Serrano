import { IconoCheck, IconoAlerta, IconoCerrar } from "../ui/Iconos.jsx";

export default function Toast({ id, tipo, mensaje, onCerrar }) {
    const Icono = tipo === "exito" ? IconoCheck : IconoAlerta;

    return (
        <div className={`toast toast--${tipo}`}>
            <Icono className="toast__icono" />
            <p className="toast__mensaje">
                <span className="sr-only">{tipo === "exito" ? "Listo: " : "Error: "}</span>
                {mensaje}
            </p>
            <button type="button" className="toast__cerrar" onClick={() => onCerrar(id)} aria-label="Cerrar notificación">
                <IconoCerrar />
            </button>
        </div>
    );
}
