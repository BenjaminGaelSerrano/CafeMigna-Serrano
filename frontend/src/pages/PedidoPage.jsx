import PageLayout from "../components/layout/PageLayout.jsx";
import SectionTitle from "../components/ui/SectionTitle.jsx";
import Loader from "../components/ui/Loader.jsx";
import EstadoError from "../components/ui/EstadoError.jsx";
import EstadoVacio from "../components/ui/EstadoVacio.jsx";
import Button from "../components/ui/Button.jsx";
import { IconoMas } from "../components/ui/Iconos.jsx";
import PlatoCard from "../components/platos/PlatoCard.jsx";
import Carrito from "../components/pedido/Carrito.jsx";
import FinalizarPedido from "../components/pedido/FinalizarPedido.jsx";
import useMenu from "../hooks/useMenu.js";
import useCarrito from "../hooks/useCarrito.js";
import useToast from "../hooks/useToast.js";
import useTituloPagina from "../hooks/useTituloPagina.js";
import { agruparPorCategoria, soloDisponibles } from "../utils/platos.js";
import { abrirWhatsApp, mensajePedido } from "../utils/whatsapp.js";
import "./PedidoPage.css";

export default function PedidoPage() {
    useTituloPagina("Armá tu pedido");
    const { platos, categorias, cargando, error, recargar } = useMenu();
    const carrito = useCarrito();
    const { notificarExito } = useToast();
    const grupos = agruparPorCategoria(soloDisponibles(platos), categorias);

    function agregar(plato) {
        carrito.agregar(plato);
        notificarExito(`${plato.nombre} se agregó al carrito.`);
    }

    function finalizar({ modalidad, nombre, direccion }) {
        abrirWhatsApp(mensajePedido({ items: carrito.items, total: carrito.total, modalidad, nombre, direccion }));
        carrito.vaciar();
        notificarExito("Pedido armado. Envialo desde WhatsApp para que el local lo confirme.");
    }

    return (
        <PageLayout>
            <div className="pedido">
                <section className="pedido__platos" aria-labelledby="pedido-titulo">
                    <SectionTitle as="h1" id="pedido-titulo">Armá tu pedido</SectionTitle>

                    {cargando && <Loader texto="Cargando los platos…" />}

                    {!cargando && error && <EstadoError mensaje={error} onReintentar={recargar} />}

                    {!cargando && !error && grupos.length === 0 && (
                        <EstadoVacio
                            titulo="No hay platos disponibles"
                            mensaje="En este momento no se pueden hacer pedidos online. Probá más tarde o llamanos."
                        />
                    )}

                    {!cargando && !error && grupos.map(grupo => (
                        <section key={grupo.categoria.id} className="pedido__grupo" aria-labelledby={`pedido-cat-${grupo.categoria.id}`}>
                            <h2 id={`pedido-cat-${grupo.categoria.id}`} className="pedido__categoria">{grupo.categoria.nombre}</h2>
                            <ul className="pedido__lista">
                                {grupo.platos.map(plato => (
                                    <li key={plato.id}>
                                        <PlatoCard
                                            plato={plato}
                                            variante="horizontal"
                                            accion={
                                                <Button
                                                    variante="secundario"
                                                    tamano="icono"
                                                    onClick={() => agregar(plato)}
                                                    aria-label={`Agregar ${plato.nombre} al carrito`}
                                                >
                                                    <IconoMas />
                                                </Button>
                                            }
                                        />
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </section>

                <aside className="pedido__carrito" aria-label="Carrito">
                    <div className="pedido__carrito-interior">
                        <Carrito
                            items={carrito.items}
                            total={carrito.total}
                            cantidadTotal={carrito.cantidadTotal}
                            onCambiarCantidad={carrito.cambiarCantidad}
                        />
                        <FinalizarPedido deshabilitado={carrito.items.length === 0} onFinalizar={finalizar} />
                    </div>
                </aside>
            </div>
        </PageLayout>
    );
}
