import PageLayout from "../components/layout/PageLayout.jsx";
import EstadoVacio from "../components/ui/EstadoVacio.jsx";
import Button from "../components/ui/Button.jsx";
import useTituloPagina from "../hooks/useTituloPagina.js";

export default function NotFoundPage() {
    useTituloPagina("Página no encontrada");

    return (
        <PageLayout cta={{ to: "/menu", texto: "Ver el menú" }}>
            <div className="contenedor seccion">
                <h1 className="sr-only">Página no encontrada</h1>
                <EstadoVacio
                    titulo="Esta página no existe"
                    mensaje="Puede que el enlace esté mal escrito o que la página se haya movido."
                >
                    <Button to="/">Volver al inicio</Button>
                </EstadoVacio>
            </div>
        </PageLayout>
    );
}
