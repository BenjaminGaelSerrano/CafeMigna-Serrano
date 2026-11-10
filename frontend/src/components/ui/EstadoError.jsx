import Button from "./Button.jsx";
import { IconoAlerta } from "./Iconos.jsx";
import "./Estados.css";

export default function EstadoError({ titulo = "No pudimos cargar la información", mensaje, onReintentar }) {
    return (
        <div className="estado estado--error">
            <IconoAlerta className="estado__icono" />
            <p className="estado__titulo">{titulo}</p>
            {mensaje && <p className="estado__mensaje">{mensaje}</p>}
            {onReintentar && (
                <Button variante="secundario" tamano="chico" onClick={onReintentar}>
                    Reintentar
                </Button>
            )}
        </div>
    );
}
