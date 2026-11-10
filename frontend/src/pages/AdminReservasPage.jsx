import { useState } from "react";
import PageLayout from "../components/layout/PageLayout.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";
import AdminNav from "../components/admin/AdminNav.jsx";
import Loader from "../components/ui/Loader.jsx";
import EstadoError from "../components/ui/EstadoError.jsx";
import EstadoVacio from "../components/ui/EstadoVacio.jsx";
import Button from "../components/ui/Button.jsx";
import ConfirmDialog from "../components/ui/ConfirmDialog.jsx";
import ReservasTabla from "../components/reservas/ReservasTabla.jsx";
import useApi from "../hooks/useApi.js";
import useToast from "../hooks/useToast.js";
import useTituloPagina from "../hooks/useTituloPagina.js";
import { getReservas, cambiarEstadoReserva, deleteReserva } from "../services/reservasService.js";
import { contarPorEstado } from "../utils/reservas.js";
import "./AdminPage.css";

const MENSAJE_ESTADO = {
    confirmada: nombre => `Reserva de ${nombre} confirmada.`,
    cancelada: nombre => `Reserva de ${nombre} cancelada.`
};

// Reservas recibidas desde el formulario público (CRUD contra /api/reservas).
export default function AdminReservasPage() {
    useTituloPagina("Reservas");
    const { datos: reservas, setDatos: setReservas, cargando, error, recargar } = useApi(getReservas, []);
    const { notificarExito, notificarError } = useToast();

    const [procesandoId, setProcesandoId] = useState(null);
    const [reservaAEliminar, setReservaAEliminar] = useState(null);
    const [eliminando, setEliminando] = useState(false);

    const pendientes = contarPorEstado(reservas, "pendiente");

    async function cambiarEstado(reserva, estado) {
        setProcesandoId(reserva.id);
        try {
            const actualizada = await cambiarEstadoReserva(reserva.id, estado);
            setReservas(prev => prev.map(item => item.id === actualizada.id ? actualizada : item));
            notificarExito(MENSAJE_ESTADO[estado](actualizada.cliente?.nombre ?? "cliente"));
        } catch (err) {
            notificarError(err.message);
        } finally {
            setProcesandoId(null);
        }
    }

    async function confirmarEliminacion() {
        const reserva = reservaAEliminar;
        setEliminando(true);
        try {
            await deleteReserva(reserva.id);
            setReservas(prev => prev.filter(item => item.id !== reserva.id));
            notificarExito(`Reserva de ${reserva.cliente?.nombre ?? "cliente"} eliminada.`);
            setReservaAEliminar(null);
        } catch (err) {
            notificarError(err.message);
        } finally {
            setEliminando(false);
        }
    }

    return (
        <PageLayout cta={{ to: "/reservar", texto: "Reservar mesa" }}>
            <PageHeader
                titulo="Administración"
                bajada="Confirmá o cancelá las reservas que llegan desde la web. Llamá al cliente antes de confirmar."
            >
                <AdminNav />
            </PageHeader>

            <div className="contenedor seccion">
                {cargando && <Loader texto="Cargando las reservas…" />}

                {!cargando && error && <EstadoError mensaje={error} onReintentar={recargar} />}

                {!cargando && !error && (
                    <section aria-labelledby="reservas-titulo">
                        <div className="admin__encabezado">
                            <h2 id="reservas-titulo" className="admin__titulo">
                                Reservas <span className="admin__contador">({pendientes} {pendientes === 1 ? "pendiente" : "pendientes"})</span>
                            </h2>
                            <Button variante="texto" onClick={recargar}>Actualizar lista</Button>
                        </div>

                        {reservas.length === 0 ? (
                            <EstadoVacio
                                titulo="Todavía no hay reservas"
                                mensaje="Las reservas que se hagan desde la página Reservá tu mesa aparecen acá."
                            >
                                <Button to="/reservar" variante="secundario" tamano="chico">Ir a Reservá tu mesa</Button>
                            </EstadoVacio>
                        ) : (
                            <ReservasTabla
                                reservas={reservas}
                                procesandoId={procesandoId}
                                onCambiarEstado={cambiarEstado}
                                onEliminar={setReservaAEliminar}
                            />
                        )}
                    </section>
                )}
            </div>

            <ConfirmDialog
                abierto={Boolean(reservaAEliminar)}
                titulo={`¿Eliminar la reserva de ${reservaAEliminar?.cliente?.nombre ?? "este cliente"}?`}
                mensaje="La reserva se borra del sistema y no se puede recuperar. Si el cliente avisó que no viene, conviene marcarla como cancelada para conservar el registro."
                textoConfirmar="Eliminar reserva"
                textoCancelar="No eliminar"
                textoProcesando="Eliminando…"
                procesando={eliminando}
                onConfirmar={confirmarEliminacion}
                onCancelar={() => setReservaAEliminar(null)}
            />
        </PageLayout>
    );
}
