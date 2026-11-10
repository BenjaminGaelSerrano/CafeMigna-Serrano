import { useState } from "react";
import "./PlatoImagen.css";

// Foto del plato. Si no tiene imagen (o no carga) muestra un recuadro con la inicial,
// que es decorativo porque el nombre del plato ya aparece al lado.
export default function PlatoImagen({ plato, className = "" }) {
    const [fallo, setFallo] = useState(false);

    if (!plato.imagenUrl || fallo) {
        return (
            <div className={`plato-imagen plato-imagen--vacia ${className}`} aria-hidden="true">
                <span>{plato.nombre.charAt(0)}</span>
            </div>
        );
    }

    return (
        <img
            className={`plato-imagen ${className}`}
            src={plato.imagenUrl}
            alt={plato.nombre}
            loading="lazy"
            onError={() => setFallo(true)}
        />
    );
}
