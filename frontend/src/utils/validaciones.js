import { hoyISO, horaActual } from "./formato.js";

// Cada función recibe los valores del formulario y devuelve un objeto { campo: mensaje }.
// Si el objeto está vacío, el formulario es válido.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function textoRequerido(valor, minimo, etiqueta) {
    const texto = (valor ?? "").trim();
    if (!texto) return `Completá ${etiqueta}.`;
    if (texto.length < minimo) return `Tiene que tener al menos ${minimo} caracteres.`;
    return null;
}

function limpiar(errores) {
    return Object.fromEntries(Object.entries(errores).filter(([, mensaje]) => mensaje));
}

export function validarPlato(valores) {
    const precio = Number(valores.precio);
    const imagen = (valores.imagenUrl ?? "").trim();

    return limpiar({
        nombre: textoRequerido(valores.nombre, 3, "el nombre del plato")
            ?? (valores.nombre.trim().length > 60 ? "Usá 60 caracteres como máximo." : null),
        descripcion: (valores.descripcion ?? "").length > 160 ? "Usá 160 caracteres como máximo." : null,
        precio: valores.precio === "" ? "Completá el precio."
            : !Number.isFinite(precio) || precio <= 0 ? "El precio tiene que ser un número mayor a 0."
            : null,
        categoriaId: valores.categoriaId ? null : "Elegí una categoría.",
        imagenUrl: imagen && !/^(https?:\/\/|\/)/.test(imagen)
            ? "La dirección tiene que empezar con http://, https:// o /."
            : null
    });
}

// Se reserva entre las 8:00 y las 0:30 (el local cierra a la 1:00).
function horaDentroDelHorario(hora) {
    return hora >= "08:00" || hora <= "00:30";
}

export function validarReserva(valores) {
    const personas = Number(valores.personas);
    const hoy = hoyISO();

    let errorHora = null;
    if (!valores.hora) errorHora = "Elegí un horario.";
    else if (!horaDentroDelHorario(valores.hora)) errorHora = "Tomamos reservas de 8:00 a 0:30.";
    else if (valores.fecha === hoy && valores.hora >= "08:00" && valores.hora <= horaActual()) {
        errorHora = "Ese horario ya pasó. Elegí uno más tarde.";
    }

    const digitosTelefono = (valores.telefono ?? "").replace(/\D/g, "");

    return limpiar({
        nombre: textoRequerido(valores.nombre, 3, "tu nombre completo"),
        telefono: !digitosTelefono ? "Completá tu teléfono para que podamos confirmarte la mesa."
            : digitosTelefono.length < 8 || digitosTelefono.length > 15
                ? "Ingresá el teléfono con código de área, por ejemplo 11 3957-5971."
                : null,
        fecha: !valores.fecha ? "Elegí una fecha."
            : valores.fecha < hoy ? "La fecha no puede ser anterior a hoy."
            : null,
        hora: errorHora,
        personas: valores.personas === "" ? "Indicá cuántas personas vienen."
            : !Number.isInteger(personas) || personas < 1 || personas > 20
                ? "Ingresá un número entero entre 1 y 20. Para grupos más grandes, llamanos."
                : null
    });
}

export function validarContacto(valores) {
    const email = (valores.email ?? "").trim();

    return limpiar({
        nombre: textoRequerido(valores.nombre, 2, "tu nombre"),
        email: !email ? "Completá tu email."
            : !EMAIL_REGEX.test(email) ? "Revisá el email: tiene que ser del tipo nombre@correo.com."
            : null,
        mensaje: textoRequerido(valores.mensaje, 10, "tu mensaje")
    });
}

export function validarDatosPedido(valores, { modalidad }) {
    return limpiar({
        nombre: textoRequerido(valores.nombre, 2, "tu nombre"),
        direccion: modalidad === "delivery"
            ? textoRequerido(valores.direccion, 5, "la dirección de entrega")
            : null
    });
}
