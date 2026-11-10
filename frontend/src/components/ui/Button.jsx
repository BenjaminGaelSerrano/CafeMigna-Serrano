import { Link } from "react-router-dom";
import "./Button.css";

// Botón único de la app. Se renderiza como <Link> (to), <a> (href) o <button>.
// variante: "primario" | "secundario" | "peligro" | "texto"
// tamano: "chico" | "icono" | "bloque"
export default function Button({ to, href, variante = "primario", tamano, className = "", children, ...props }) {
    const clases = ["boton", `boton--${variante}`, tamano && `boton--${tamano}`, className]
        .filter(Boolean)
        .join(" ");

    if (to) {
        return <Link to={to} className={clases} {...props}>{children}</Link>;
    }

    if (href) {
        return <a href={href} className={clases} {...props}>{children}</a>;
    }

    return <button type="button" className={clases} {...props}>{children}</button>;
}
