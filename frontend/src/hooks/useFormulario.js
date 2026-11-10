import { useState } from "react";

// Estado y validación reutilizable para todos los formularios.
// - validar(valores, contexto) devuelve { campo: mensaje }.
// - prefijoId se usa para enfocar el primer campo con error (ids del tipo "prefijo-campo").
export default function useFormulario(valoresIniciales, validar, prefijoId) {
    const [valores, setValores] = useState(valoresIniciales);
    const [errores, setErrores] = useState({});

    function manejarCambio(evento) {
        const { name, value, type, checked } = evento.target;
        const nuevoValor = type === "checkbox" ? checked : value;
        const siguientes = { ...valores, [name]: nuevoValor };
        setValores(siguientes);

        // Si el campo ya mostraba un error, se revalida mientras la persona escribe.
        if (errores[name]) {
            setErrores(prev => ({ ...prev, [name]: validar(siguientes, {})[name] }));
        }
    }

    function validarTodo(contexto = {}) {
        const nuevosErrores = validar(valores, contexto);
        setErrores(nuevosErrores);

        const primerCampo = Object.keys(nuevosErrores)[0];
        if (primerCampo) {
            document.getElementById(`${prefijoId}-${primerCampo}`)?.focus();
            return false;
        }
        return true;
    }

    function reiniciar(nuevosValores = valoresIniciales) {
        setValores(nuevosValores);
        setErrores({});
    }

    return { valores, errores, manejarCambio, validarTodo, reiniciar };
}
