import "./Estados.css";

export default function EstadoVacio({ titulo, mensaje, children }) {
    return (
        <div className="estado estado--vacio">
            <p className="estado__titulo">{titulo}</p>
            {mensaje && <p className="estado__mensaje">{mensaje}</p>}
            {children}
        </div>
    );
}
