const formateadorPrecio = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
});

export function formatearPrecio(valor) {
    return formateadorPrecio.format(Number(valor) || 0);
}

// "1139575971" -> "11 3957-5971" (números de 10 dígitos de Argentina); otros quedan igual.
export function formatearTelefono(telefono) {
    const digitos = String(telefono ?? "").replace(/\D/g, "");
    if (digitos.length !== 10) return telefono;
    return `${digitos.slice(0, 2)} ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
}

// Fecha local en formato yyyy-mm-dd (el que usan los <input type="date">).
export function hoyISO(fecha = new Date()) {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
}

export function horaActual(fecha = new Date()) {
    const horas = String(fecha.getHours()).padStart(2, "0");
    const minutos = String(fecha.getMinutes()).padStart(2, "0");
    return `${horas}:${minutos}`;
}

// "2026-11-14" -> "sábado 14 de noviembre"
export function formatearFecha(fechaISO) {
    return new Date(`${fechaISO}T00:00`)
        .toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" })
        .replace(",", "");
}
