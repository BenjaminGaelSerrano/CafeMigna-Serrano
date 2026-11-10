import { useState } from "react";
import PageLayout from "../components/layout/PageLayout.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";
import AdminNav from "../components/admin/AdminNav.jsx";
import Loader from "../components/ui/Loader.jsx";
import EstadoError from "../components/ui/EstadoError.jsx";
import EstadoVacio from "../components/ui/EstadoVacio.jsx";
import ConfirmDialog from "../components/ui/ConfirmDialog.jsx";
import PlatoForm from "../components/platos/PlatoForm.jsx";
import PlatosTabla from "../components/platos/PlatosTabla.jsx";
import useMenu from "../hooks/useMenu.js";
import useToast from "../hooks/useToast.js";
import useTituloPagina from "../hooks/useTituloPagina.js";
import { createPlato, updatePlato, deletePlato } from "../services/platosService.js";
import "./AdminPage.css";

// Gestión del menú: alta, edición y baja de platos contra la API (CRUD de la Entrega 2).
export default function AdminPlatosPage() {
    useTituloPagina("Administrar menú");
    const { platos, setPlatos, categorias, cargando, error, recargar } = useMenu();
    const { notificarExito, notificarError } = useToast();

    const [platoEditando, setPlatoEditando] = useState(null);
    const [platoAEliminar, setPlatoAEliminar] = useState(null);
    const [guardando, setGuardando] = useState(false);
    const [eliminando, setEliminando] = useState(false);

    function editar(plato) {
        setPlatoEditando(plato);
        document.getElementById("plato-form-titulo")?.scrollIntoView({ block: "start" });
        // Se espera al render del formulario con los datos del plato para mover el foco.
        setTimeout(() => document.getElementById("plato-nombre")?.focus(), 0);
    }

    async function guardar(datos) {
        setGuardando(true);
        try {
            if (platoEditando) {
                const actualizado = await updatePlato(platoEditando.id, datos);
                setPlatos(prev => prev.map(plato => plato.id === actualizado.id ? actualizado : plato));
                setPlatoEditando(null);
                notificarExito(`Cambios guardados en «${actualizado.nombre}».`);
            } else {
                const creado = await createPlato(datos);
                setPlatos(prev => [...prev, creado]);
                notificarExito(`Plato «${creado.nombre}» creado.`);
            }
            return true;
        } catch (err) {
            notificarError(err.message);
            return false;
        } finally {
            setGuardando(false);
        }
    }

    async function confirmarEliminacion() {
        const plato = platoAEliminar;
        setEliminando(true);
        try {
            await deletePlato(plato.id);
            setPlatos(prev => prev.filter(item => item.id !== plato.id));
            if (platoEditando?.id === plato.id) setPlatoEditando(null);
            notificarExito(`Plato «${plato.nombre}» eliminado.`);
            setPlatoAEliminar(null);
        } catch (err) {
            notificarError(err.message);
        } finally {
            setEliminando(false);
        }
    }

    return (
        <PageLayout cta={{ to: "/menu", texto: "Ver el menú" }}>
            <PageHeader
                titulo="Administración"
                bajada="Creá, editá o eliminá los platos. Los cambios se ven al instante en el menú y en los pedidos online."
            >
                <AdminNav />
            </PageHeader>

            <div className="contenedor seccion">
                {cargando && <Loader texto="Cargando los platos…" />}

                {!cargando && error && <EstadoError mensaje={error} onReintentar={recargar} />}

                {!cargando && !error && (
                    <div className="admin">
                        <div className="admin__formulario">
                            <PlatoForm
                                key={platoEditando?.id ?? "nuevo"}
                                plato={platoEditando}
                                categorias={categorias}
                                guardando={guardando}
                                onGuardar={guardar}
                                onCancelar={() => setPlatoEditando(null)}
                            />
                        </div>

                        <section className="admin__listado" aria-labelledby="admin-listado-titulo">
                            <h2 id="admin-listado-titulo" className="admin__titulo">
                                Platos cargados <span className="admin__contador">({platos.length})</span>
                            </h2>
                            {platos.length === 0 ? (
                                <EstadoVacio
                                    titulo="Todavía no hay platos"
                                    mensaje="Usá el formulario para crear el primero."
                                />
                            ) : (
                                <PlatosTabla
                                    platos={platos}
                                    categorias={categorias}
                                    platoEditandoId={platoEditando?.id}
                                    onEditar={editar}
                                    onEliminar={setPlatoAEliminar}
                                />
                            )}
                        </section>
                    </div>
                )}
            </div>

            <ConfirmDialog
                abierto={Boolean(platoAEliminar)}
                titulo={`¿Eliminar «${platoAEliminar?.nombre ?? ""}»?`}
                mensaje="El plato deja de aparecer en el menú y en los pedidos online. Esta acción no se puede deshacer."
                textoConfirmar="Eliminar plato"
                textoProcesando="Eliminando…"
                procesando={eliminando}
                onConfirmar={confirmarEliminacion}
                onCancelar={() => setPlatoAEliminar(null)}
            />
        </PageLayout>
    );
}
