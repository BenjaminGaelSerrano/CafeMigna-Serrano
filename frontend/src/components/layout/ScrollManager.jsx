import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Al cambiar de pantalla: vuelve arriba y mueve el foco al contenido principal
// (así un lector de pantalla anuncia la nueva página). Si hay #ancla, va a esa sección.
export default function ScrollManager() {
    const { pathname, hash } = useLocation();
    const primeraCarga = useRef(true);

    useEffect(() => {
        if (hash) {
            const destino = document.getElementById(decodeURIComponent(hash.slice(1)));
            if (destino) {
                destino.scrollIntoView();
                destino.focus({ preventScroll: true });
                return;
            }
        }

        window.scrollTo(0, 0);

        if (primeraCarga.current) {
            primeraCarga.current = false;
            return;
        }
        document.getElementById("contenido")?.focus({ preventScroll: true });
    }, [pathname, hash]);

    return null;
}
