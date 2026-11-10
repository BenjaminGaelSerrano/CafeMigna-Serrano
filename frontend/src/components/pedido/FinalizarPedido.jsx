import FormField from "../ui/FormField.jsx";
import Button from "../ui/Button.jsx";
import useFormulario from "../../hooks/useFormulario.js";
import { validarDatosPedido } from "../../utils/validaciones.js";
import "./FinalizarPedido.css";

const VALORES_INICIALES = { nombre: "", direccion: "" };

// Datos de quien pide + las dos opciones del boceto: retiro por el local o delivery.
export default function FinalizarPedido({ deshabilitado, onFinalizar }) {
    const { valores, errores, manejarCambio, validarTodo, reiniciar } = useFormulario(
        VALORES_INICIALES,
        validarDatosPedido,
        "pedido"
    );

    function finalizar(modalidad) {
        if (!validarTodo({ modalidad })) return;
        onFinalizar({ ...valores, modalidad });
        reiniciar();
    }

    return (
        <form className="finalizar-pedido" onSubmit={evento => evento.preventDefault()} noValidate aria-label="Datos para enviar el pedido">
            <FormField
                id="pedido-nombre"
                name="nombre"
                label="Tu nombre"
                value={valores.nombre}
                onChange={manejarCambio}
                error={errores.nombre}
                autoComplete="name"
            />
            <FormField
                id="pedido-direccion"
                name="direccion"
                label="Dirección de entrega"
                value={valores.direccion}
                onChange={manejarCambio}
                error={errores.direccion}
                ayuda="Solo para delivery."
                autoComplete="street-address"
            />

            <div className="finalizar-pedido__acciones">
                <Button variante="secundario" tamano="bloque" disabled={deshabilitado} onClick={() => finalizar("retiro")}>
                    Retiro por el local
                </Button>
                <Button tamano="bloque" disabled={deshabilitado} onClick={() => finalizar("delivery")}>
                    Pedir delivery
                </Button>
            </div>
            <p className="finalizar-pedido__nota">
                Se abre WhatsApp con tu pedido escrito para que lo envíes al local.
            </p>
        </form>
    );
}
