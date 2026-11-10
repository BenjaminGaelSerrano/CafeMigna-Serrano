import "./Estados.css";

export default function Loader({ texto = "Cargando…" }) {
    return (
        <div className="estado estado--cargando" role="status">
            <span className="loader" aria-hidden="true" />
            <p>{texto}</p>
        </div>
    );
}
