// Cliente HTTP base: único lugar donde se usa fetch.
// Los servicios de cada recurso (platosService, categoriasService) se apoyan en esta función.

export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

const MENSAJE_SIN_CONEXION = "No se pudo conectar con el servidor. Revisá que el backend esté en marcha en el puerto 3000.";

export async function request(ruta, { metodo = "GET", body } = {}) {
    let response;

    try {
        response = await fetch(`${API_URL}${ruta}`, {
            method: metodo,
            headers: body ? { "Content-Type": "application/json" } : undefined,
            body: body ? JSON.stringify(body) : undefined
        });
    } catch {
        // fetch solo falla así cuando no hay respuesta (servidor apagado, sin red, CORS).
        throw new Error(MENSAJE_SIN_CONEXION);
    }

    // El backend responde { success, data } o { success: false, message }.
    const contenido = await response.json().catch(() => null);

    if (!response.ok || !contenido?.success) {
        throw new Error(contenido?.message ?? `El servidor respondió con un error (${response.status}).`);
    }

    return contenido.data;
}
