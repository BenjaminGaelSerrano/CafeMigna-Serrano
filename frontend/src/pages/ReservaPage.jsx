import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout.jsx";
import FormField from "../components/ui/FormField.jsx";
import Button from "../components/ui/Button.jsx";
import useFormulario from "../hooks/useFormulario.js";
import useToast from "../hooks/useToast.js";
import useTituloPagina from "../hooks/useTituloPagina.js";
import { createReserva } from "../services/reservasService.js";
import { validarReserva } from "../utils/validaciones.js";
import { hoyISO, formatearFecha } from "../utils/formato.js";
import fotoSalon from "../assets/img/torre-milanesas.jpg";
import "./ReservaPage.css";

const VALORES_INICIALES = { nombre: "", telefono: "", fecha: "", hora: "", personas: "2" };

export default function ReservaPage() {
    useTituloPagina("Reservá tu mesa");
    const { notificarExito, notificarError } = useToast();
    const [enviando, setEnviando] = useState(false);
    const { valores, errores, manejarCambio, validarTodo, reiniciar } = useFormulario(
        VALORES_INICIALES,
        validarReserva,
        "reserva"
    );

    async function manejarEnvio(evento) {
        evento.preventDefault();
        if (!validarTodo()) return;

        setEnviando(true);
        try {
            const reserva = await createReserva({
                nombre: valores.nombre.trim(),
                telefono: valores.telefono.trim(),
                fecha: valores.fecha,
                hora: valores.hora,
                cantidadPersonas: Number(valores.personas)
            });
            notificarExito(
                `Reserva recibida para el ${formatearFecha(reserva.fecha)} a las ${reserva.hora}. Te llamamos para confirmarla.`
            );
            reiniciar();
        } catch (err) {
            notificarError(err.message);
        } finally {
            setEnviando(false);
        }
    }

    return (
        <PageLayout cta={{ to: "/menu", texto: "Ver el menú" }}>
            <div className="reserva">
                <section className="reserva__formulario" aria-labelledby="reserva-titulo">
                    <h1 id="reserva-titulo" className="reserva__titulo">Reservá tu mesa</h1>
                    <p className="reserva__bajada">Completá los datos y te confirmamos a la brevedad.</p>

                    <form onSubmit={manejarEnvio} noValidate className="reserva__form">
                        <FormField
                            id="reserva-nombre"
                            name="nombre"
                            label="Nombre completo"
                            value={valores.nombre}
                            onChange={manejarCambio}
                            error={errores.nombre}
                            autoComplete="name"
                        />

                        <FormField
                            id="reserva-telefono"
                            name="telefono"
                            label="Teléfono"
                            type="tel"
                            value={valores.telefono}
                            onChange={manejarCambio}
                            error={errores.telefono}
                            ayuda="Te llamamos a este número para confirmar la reserva."
                            autoComplete="tel"
                        />

                        <div className="reserva__fila">
                            <FormField
                                id="reserva-fecha"
                                name="fecha"
                                label="Fecha"
                                type="date"
                                min={hoyISO()}
                                value={valores.fecha}
                                onChange={manejarCambio}
                                error={errores.fecha}
                            />
                            <FormField
                                id="reserva-hora"
                                name="hora"
                                label="Hora"
                                type="time"
                                step="900"
                                value={valores.hora}
                                onChange={manejarCambio}
                                error={errores.hora}
                            />
                        </div>

                        <FormField
                            id="reserva-personas"
                            name="personas"
                            label="Cantidad de personas"
                            type="number"
                            inputMode="numeric"
                            min="1"
                            max="20"
                            value={valores.personas}
                            onChange={manejarCambio}
                            error={errores.personas}
                        />

                        <Button type="submit" tamano="bloque" disabled={enviando}>
                            {enviando ? "Enviando reserva…" : "Confirmar reserva"}
                        </Button>
                    </form>

                    <Link to="/" className="reserva__volver">Volver al inicio</Link>
                </section>

                <div className="reserva__foto">
                    <img
                        src={fotoSalon}
                        alt="Mesa del salón de Migna con una torre de milanesas y porciones de papas fritas"
                        width="555"
                        height="736"
                        loading="lazy"
                    />
                </div>
            </div>
        </PageLayout>
    );
}
