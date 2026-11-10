import { useEffect, useId, useRef } from "react";
import Button from "./Button.jsx";
import "./ConfirmDialog.css";

// Diálogo de confirmación con <dialog> nativo: bloquea el fondo, atrapa el foco y se cierra con Escape.
export default function ConfirmDialog({
    abierto,
    titulo,
    mensaje,
    textoConfirmar = "Confirmar",
    textoCancelar = "Cancelar",
    textoProcesando = "Procesando…",
    procesando = false,
    onConfirmar,
    onCancelar
}) {
    const dialogoRef = useRef(null);
    const idTitulo = useId();
    const idMensaje = useId();

    useEffect(() => {
        const dialogo = dialogoRef.current;
        if (!dialogo) return;
        if (abierto && !dialogo.open) dialogo.showModal();
        if (!abierto && dialogo.open) dialogo.close();
    }, [abierto]);

    function cancelar() {
        if (!procesando) onCancelar();
    }

    return (
        <dialog
            ref={dialogoRef}
            className="dialogo"
            aria-labelledby={idTitulo}
            aria-describedby={idMensaje}
            onCancel={evento => {
                evento.preventDefault();
                cancelar();
            }}
            onClick={evento => {
                // Click en el fondo oscuro (fuera del contenido) = cancelar.
                if (evento.target === dialogoRef.current) cancelar();
            }}
        >
            {abierto && (
                <div className="dialogo__contenido">
                    <h2 id={idTitulo} className="dialogo__titulo">{titulo}</h2>
                    <p id={idMensaje} className="dialogo__mensaje">{mensaje}</p>
                    <div className="dialogo__acciones">
                        {/* El foco inicial va a "Cancelar" para evitar borrados accidentales. */}
                        <Button variante="secundario" onClick={cancelar} disabled={procesando} autoFocus>
                            {textoCancelar}
                        </Button>
                        <Button variante="peligro" onClick={onConfirmar} disabled={procesando}>
                            {procesando ? textoProcesando : textoConfirmar}
                        </Button>
                    </div>
                </div>
            )}
        </dialog>
    );
}
