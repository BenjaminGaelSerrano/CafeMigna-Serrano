import { NEGOCIO } from "./negocio.js";
import { formatearPrecio } from "./formato.js";

// Pedidos y consultas se envían al WhatsApp del local
// (la API todavía no expone esos recursos; las reservas sí se guardan en /api/reservas).

export function abrirWhatsApp(mensaje) {
    const url = `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank", "noopener,noreferrer");
}

export function mensajePedido({ items, total, modalidad, nombre, direccion }) {
    const lineas = items.map(
        ({ plato, cantidad }) => `- ${cantidad} x ${plato.nombre} (${formatearPrecio(plato.precio * cantidad)})`
    );

    return [
        `¡Hola Migna! Quiero hacer un pedido ${modalidad === "delivery" ? "con delivery" : "para retirar por el local"}.`,
        "",
        ...lineas,
        "",
        `Total: ${formatearPrecio(total)}`,
        `Nombre: ${nombre.trim()}`,
        modalidad === "delivery" ? `Dirección: ${direccion.trim()}` : null
    ].filter(linea => linea !== null).join("\n");
}

export function mensajeConsulta({ nombre, email, mensaje }) {
    return [
        `¡Hola Migna! Soy ${nombre.trim()} (${email.trim()}).`,
        "",
        mensaje.trim()
    ].join("\n");
}
