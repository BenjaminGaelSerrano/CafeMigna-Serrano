import "./SectionTitle.css";

// Título de sección con el subrayado del boceto. "as" permite elegir el nivel de encabezado.
export default function SectionTitle({ as: Etiqueta = "h2", id, centrado = false, children }) {
    return (
        <Etiqueta id={id} className={`titulo-seccion ${centrado ? "titulo-seccion--centrado" : ""}`}>
            <span>{children}</span>
        </Etiqueta>
    );
}
