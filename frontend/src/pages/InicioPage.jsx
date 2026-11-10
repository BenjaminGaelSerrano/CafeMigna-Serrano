import PageLayout from "../components/layout/PageLayout.jsx";
import Button from "../components/ui/Button.jsx";
import SectionTitle from "../components/ui/SectionTitle.jsx";
import Loader from "../components/ui/Loader.jsx";
import EstadoError from "../components/ui/EstadoError.jsx";
import EstadoVacio from "../components/ui/EstadoVacio.jsx";
import PlatoCard from "../components/platos/PlatoCard.jsx";
import useMenu from "../hooks/useMenu.js";
import useTituloPagina from "../hooks/useTituloPagina.js";
import { obtenerEspeciales } from "../utils/platos.js";
import { estaAbierto, textoEstadoLocal } from "../utils/horario.js";
import fotoFachada from "../assets/img/fachada-noche.jpg";
import "./InicioPage.css";

export default function InicioPage() {
    useTituloPagina(null);
    const { platos, cargando, error, recargar } = useMenu();
    const especiales = obtenerEspeciales(platos);
    const abierto = estaAbierto();

    return (
        <PageLayout variante="inicio">
            <section className="hero" aria-labelledby="hero-titulo">
                <div className="contenedor hero__grilla">
                    <div className="hero__texto">
                        <h1 id="hero-titulo" className="hero__titulo">Tu clásico de barrio, a toda hora.</h1>
                        <p className="hero__bajada">
                            Desde el primer café de la mañana hasta la cena con amigos.
                            Disfrutá de nuestro ambiente moderno y relajado.
                        </p>
                        <div className="hero__acciones">
                            <Button to="/menu">Ver el menú</Button>
                            <Button to="/reservar" variante="secundario">Reservar mesa</Button>
                        </div>
                    </div>

                    <figure className="hero__foto">
                        <img
                            src={fotoFachada}
                            alt="Fachada de Migna Café Restó de noche, con el salón iluminado y mesas en la vereda"
                            width="487"
                            height="612"
                        />
                        <figcaption className={`hero__estado ${abierto ? "hero__estado--abierto" : ""}`}>
                            <span className="hero__punto" aria-hidden="true" />
                            {textoEstadoLocal()}
                        </figcaption>
                    </figure>
                </div>
            </section>

            <section id="sobre-nosotros" className="seccion seccion--arena" aria-labelledby="sobre-titulo" tabIndex={-1}>
                <div className="contenedor sobre-nosotros">
                    <SectionTitle id="sobre-titulo" centrado>Sobre nosotros</SectionTitle>
                    <p>
                        Somos el punto de encuentro para vecinos, oficinistas y familias. Un local gastronómico
                        que se adapta a tu día: cafetería tradicional por la mañana, menú ejecutivo al mediodía
                        y bodegón moderno a la noche.
                    </p>
                </div>
            </section>

            <section className="seccion" aria-labelledby="especiales-titulo">
                <div className="contenedor">
                    <SectionTitle id="especiales-titulo" centrado>Nuestros especiales</SectionTitle>

                    {cargando && <Loader texto="Cargando los especiales…" />}

                    {!cargando && error && <EstadoError mensaje={error} onReintentar={recargar} />}

                    {!cargando && !error && especiales.length === 0 && (
                        <EstadoVacio
                            titulo="Todavía no hay platos en el menú"
                            mensaje="Cuando el local cargue sus platos, los especiales aparecen acá."
                        />
                    )}

                    {!cargando && !error && especiales.length > 0 && (
                        <>
                            <ul className="especiales">
                                {especiales.map(plato => (
                                    <li key={plato.id}>
                                        <PlatoCard plato={plato} />
                                    </li>
                                ))}
                            </ul>
                            <div className="especiales__mas">
                                <Button to="/menu" variante="secundario">Ver el menú completo</Button>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </PageLayout>
    );
}
