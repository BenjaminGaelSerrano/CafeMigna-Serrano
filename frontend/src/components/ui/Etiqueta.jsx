import "./Etiqueta.css";

// Etiqueta de estado (disponible, pendiente, confirmada...). tono: "exito" | "alerta" | "neutro"
export default function Etiqueta({ tono = "neutro", children }) {
    return <span className={`etiqueta etiqueta--${tono}`}>{children}</span>;
}
