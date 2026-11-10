import "./PageHeader.css";

// Encabezado centrado de las pantallas internas (Menú, Contacto, Administración).
// "children" permite sumar contenido debajo, como las pestañas de administración.
export default function PageHeader({ titulo, bajada, children }) {
    return (
        <header className="encabezado-pagina">
            <div className="contenedor">
                <h1>{titulo}</h1>
                {bajada && <p>{bajada}</p>}
                {children}
            </div>
        </header>
    );
}
