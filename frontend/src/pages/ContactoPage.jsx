import PageLayout from "../components/layout/PageLayout.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";
import FormField from "../components/ui/FormField.jsx";
import Button from "../components/ui/Button.jsx";
import useFormulario from "../hooks/useFormulario.js";
import useToast from "../hooks/useToast.js";
import useTituloPagina from "../hooks/useTituloPagina.js";
import { validarContacto } from "../utils/validaciones.js";
import { abrirWhatsApp, mensajeConsulta } from "../utils/whatsapp.js";
import { NEGOCIO } from "../utils/negocio.js";
import "./ContactoPage.css";

const VALORES_INICIALES = { nombre: "", email: "", mensaje: "" };

export default function ContactoPage() {
    useTituloPagina("Contacto");
    const { notificarExito } = useToast();
    const { valores, errores, manejarCambio, validarTodo, reiniciar } = useFormulario(
        VALORES_INICIALES,
        validarContacto,
        "contacto"
    );

    function manejarEnvio(evento) {
        evento.preventDefault();
        if (!validarTodo()) return;

        abrirWhatsApp(mensajeConsulta(valores));
        notificarExito("Mensaje listo. Envialo desde WhatsApp y te respondemos por ahí.");
        reiniciar();
    }

    return (
        <PageLayout cta={{ to: "/pedido", texto: "Pedí online" }}>
            <PageHeader
                titulo="Contactanos"
                bajada="¿Tenés alguna duda o querés dejarnos un mensaje? Escribinos."
            />

            <div className="contenedor seccion contacto">
                <div className="contacto__info">
                    <section aria-labelledby="contacto-ubicacion">
                        <h2 id="contacto-ubicacion" className="contacto__subtitulo">Dónde estamos</h2>
                        <address className="contacto__texto">
                            {NEGOCIO.direccion}<br />
                            {NEGOCIO.ciudad}
                        </address>
                    </section>

                    <section aria-labelledby="contacto-comunicate">
                        <h2 id="contacto-comunicate" className="contacto__subtitulo">Comunicate</h2>
                        <p className="contacto__texto">
                            Teléfono: <a href={NEGOCIO.telefonoLink}>{NEGOCIO.telefono}</a><br />
                            {NEGOCIO.dias}, {NEGOCIO.horario}
                        </p>
                    </section>

                    <iframe
                        className="contacto__mapa"
                        src={NEGOCIO.mapsEmbedUrl}
                        title={`Mapa de Google con la ubicación de ${NEGOCIO.nombre}`}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

                <form className="contacto__form" onSubmit={manejarEnvio} noValidate aria-label="Enviar una consulta">
                    <FormField
                        id="contacto-nombre"
                        name="nombre"
                        label="Nombre"
                        value={valores.nombre}
                        onChange={manejarCambio}
                        error={errores.nombre}
                        autoComplete="name"
                    />
                    <FormField
                        id="contacto-email"
                        name="email"
                        label="Email"
                        type="email"
                        value={valores.email}
                        onChange={manejarCambio}
                        error={errores.email}
                        autoComplete="email"
                    />
                    <FormField
                        id="contacto-mensaje"
                        name="mensaje"
                        label="Mensaje"
                        as="textarea"
                        rows={6}
                        value={valores.mensaje}
                        onChange={manejarCambio}
                        error={errores.mensaje}
                    />
                    <Button type="submit" variante="secundario" tamano="bloque">Enviar mensaje</Button>
                    <p className="contacto__nota">Tu consulta se envía por WhatsApp al local.</p>
                </form>
            </div>
        </PageLayout>
    );
}
