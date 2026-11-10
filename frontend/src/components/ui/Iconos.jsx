// Íconos SVG decorativos (aria-hidden): el texto accesible lo aporta el botón o el contenido que los acompaña.

function IconoBase({ children, className = "" }) {
    return (
        <svg
            className={`icono ${className}`}
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            {children}
        </svg>
    );
}

export function IconoMas(props) {
    return <IconoBase {...props}><path d="M12 5v14M5 12h14" /></IconoBase>;
}

export function IconoMenos(props) {
    return <IconoBase {...props}><path d="M5 12h14" /></IconoBase>;
}

export function IconoCerrar(props) {
    return <IconoBase {...props}><path d="M6 6l12 12M18 6L6 18" /></IconoBase>;
}

export function IconoCheck(props) {
    return <IconoBase {...props}><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9.5" /></IconoBase>;
}

export function IconoAlerta(props) {
    return <IconoBase {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.5v.01" /></IconoBase>;
}

export function IconoMenu(props) {
    return <IconoBase {...props}><path d="M4 7h16M4 12h16M4 17h16" /></IconoBase>;
}
