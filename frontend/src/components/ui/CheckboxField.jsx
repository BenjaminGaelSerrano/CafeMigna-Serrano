import "./FormField.css";

export default function CheckboxField({ id, label, ayuda, ...props }) {
    const idAyuda = ayuda ? `${id}-ayuda` : undefined;

    return (
        <div className="campo campo--checkbox">
            <input id={id} type="checkbox" className="campo__checkbox" aria-describedby={idAyuda} {...props} />
            <label htmlFor={id} className="campo__label">{label}</label>
            {ayuda && <p id={idAyuda} className="campo__ayuda">{ayuda}</p>}
        </div>
    );
}
