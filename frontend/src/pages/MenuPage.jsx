import PageLayout from "../components/layout/PageLayout.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";
import Loader from "../components/ui/Loader.jsx";
import EstadoError from "../components/ui/EstadoError.jsx";
import EstadoVacio from "../components/ui/EstadoVacio.jsx";
import Button from "../components/ui/Button.jsx";
import MenuCategoria from "../components/platos/MenuCategoria.jsx";
import useMenu from "../hooks/useMenu.js";
import useTituloPagina from "../hooks/useTituloPagina.js";
import { agruparPorCategoria, soloDisponibles } from "../utils/platos.js";
import "./MenuPage.css";

export default function MenuPage() {
    useTituloPagina("Menú");
    const { platos, categorias, cargando, error, recargar } = useMenu();
    const grupos = agruparPorCategoria(soloDisponibles(platos), categorias);

    return (
        <PageLayout cta={{ to: "/reservar", texto: "Reservar mesa" }}>
            <PageHeader
                titulo="Nuestro menú"
                bajada="De la cafetería al bodegón. Elegí lo que más te guste."
            />

            <div className="contenedor seccion">
                {cargando && <Loader texto="Cargando el menú…" />}

                {!cargando && error && <EstadoError mensaje={error} onReintentar={recargar} />}

                {!cargando && !error && grupos.length === 0 && (
                    <EstadoVacio
                        titulo="El menú está vacío"
                        mensaje="No hay platos disponibles en este momento. Cargalos desde Administrar menú."
                    >
                        <Button to="/admin/platos" variante="secundario" tamano="chico">Administrar menú</Button>
                    </EstadoVacio>
                )}

                {!cargando && !error && grupos.map(grupo => (
                    <MenuCategoria key={grupo.categoria.id} categoria={grupo.categoria} platos={grupo.platos} />
                ))}

                {!cargando && !error && grupos.length > 0 && (
                    <aside className="menu-cierre" aria-label="Pedido online">
                        <p>¿Ya elegiste? Armá tu pedido y retiralo por el local o pedilo con delivery.</p>
                        <Button to="/pedido">Armar mi pedido</Button>
                    </aside>
                )}
            </div>
        </PageLayout>
    );
}
