import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

// Estructura común de todas las pantallas: enlace para saltar, barra, contenido y pie.
export default function PageLayout({ variante = "interna", cta, children }) {
    return (
        <>
            <a href="#contenido" className="saltar-contenido">Saltar al contenido</a>
            <Navbar variante={variante} cta={cta} />
            <main id="contenido" tabIndex={-1}>
                {children}
            </main>
            <Footer />
        </>
    );
}
