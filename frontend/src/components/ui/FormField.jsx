import "./FormField.css";

// Campo de formulario accesible: el label queda asociado al control (htmlFor / id)
// y el mensaje de error o ayuda se vincula con aria-describedby.
// as: "input" | "textarea" | "select"
export default function FormField({ id, label, error, ayuda, as = "input", className = "", children, ...props }) {
    const Control = as;
    const idAyuda = ayuda ? `${id}-ayuda` : undefined;
    const idError = error ? `${id}-error` : undefined;
    const describedBy = [idAyuda, idError].filter(Boolean).join(" ") || undefined;

    return (
        <div className={`campo ${error ? "campo--error" : ""} ${className}`}>
            <label htmlFor={id} className="campo__label">{label}</label>
            <Control
                id={id}
                className="campo__control"
                aria-invalid={error ? "true" : undefined}
                aria-describedby={describedBy}
                {...props}
            >
                {children}
            </Control>
            {ayuda && <p id={idAyuda} className="campo__ayuda">{ayuda}</p>}
            {error && <p id={idError} className="campo__error">{error}</p>}
        </div>
    );
}
