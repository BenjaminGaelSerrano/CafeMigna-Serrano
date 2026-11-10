import FormField from "../ui/FormField.jsx";
import CheckboxField from "../ui/CheckboxField.jsx";
import Button from "../ui/Button.jsx";
import useFormulario from "../../hooks/useFormulario.js";
import { validarPlato } from "../../utils/validaciones.js";
import "./PlatoForm.css";

const VALORES_VACIOS = {
    nombre: "",
    descripcion: "",
    precio: "",
    categoriaId: "",
    disponible: true,
    imagenUrl: ""
};

function valoresDesdePlato(plato) {
    if (!plato) return VALORES_VACIOS;
    return {
        nombre: plato.nombre,
        descripcion: plato.descripcion ?? "",
        precio: String(plato.precio),
        categoriaId: String(plato.categoriaId),
        disponible: Boolean(plato.disponible),
        imagenUrl: plato.imagenUrl ?? ""
    };
}

// Formulario de alta y edición de platos. El padre le pasa key={plato?.id ?? "nuevo"}
// para que se reinicie al cambiar de plato.
export default function PlatoForm({ plato, categorias, guardando, onGuardar, onCancelar }) {
    const editando = Boolean(plato);
    const { valores, errores, manejarCambio, validarTodo, reiniciar } = useFormulario(
        valoresDesdePlato(plato),
        validarPlato,
        "plato"
    );

    async function manejarEnvio(evento) {
        evento.preventDefault();
        if (!validarTodo()) return;

        const datos = {
            nombre: valores.nombre.trim(),
            descripcion: valores.descripcion.trim(),
            precio: Number(valores.precio),
            categoriaId: Number(valores.categoriaId),
            disponible: valores.disponible,
            imagenUrl: valores.imagenUrl.trim()
        };

        const ok = await onGuardar(datos);
        if (ok && !editando) reiniciar(VALORES_VACIOS);
    }

    return (
        <form className="plato-form" onSubmit={manejarEnvio} noValidate aria-labelledby="plato-form-titulo">
            <h2 id="plato-form-titulo" className="plato-form__titulo">
                {editando ? `Editar «${plato.nombre}»` : "Nuevo plato"}
            </h2>

            <FormField
                id="plato-nombre"
                name="nombre"
                label="Nombre"
                value={valores.nombre}
                onChange={manejarCambio}
                error={errores.nombre}
                maxLength={60}
                autoComplete="off"
            />

            <FormField
                id="plato-descripcion"
                name="descripcion"
                label="Descripción"
                as="textarea"
                rows={3}
                value={valores.descripcion}
                onChange={manejarCambio}
                error={errores.descripcion}
                ayuda="Opcional. Se muestra debajo del nombre en el menú."
                maxLength={160}
            />

            <div className="plato-form__fila">
                <FormField
                    id="plato-precio"
                    name="precio"
                    label="Precio (en pesos)"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    step="1"
                    value={valores.precio}
                    onChange={manejarCambio}
                    error={errores.precio}
                />

                <FormField
                    id="plato-categoriaId"
                    name="categoriaId"
                    label="Categoría"
                    as="select"
                    value={valores.categoriaId}
                    onChange={manejarCambio}
                    error={errores.categoriaId}
                >
                    <option value="">Elegí una categoría</option>
                    {categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                    ))}
                </FormField>
            </div>

            <FormField
                id="plato-imagenUrl"
                name="imagenUrl"
                label="Dirección de la foto"
                type="text"
                inputMode="url"
                value={valores.imagenUrl}
                onChange={manejarCambio}
                error={errores.imagenUrl}
                ayuda="Opcional. Por ejemplo: /img/platos/lemon-pie.jpg o un enlace https://"
                autoComplete="off"
            />

            <CheckboxField
                id="plato-disponible"
                name="disponible"
                label="Disponible para pedir"
                checked={valores.disponible}
                onChange={manejarCambio}
                ayuda="Si lo desmarcás, el plato deja de mostrarse en el menú y en los pedidos."
            />

            <div className="plato-form__acciones">
                <Button type="submit" disabled={guardando}>
                    {guardando ? "Guardando…" : editando ? "Guardar cambios" : "Crear plato"}
                </Button>
                {editando && (
                    <Button variante="texto" onClick={onCancelar} disabled={guardando}>
                        Cancelar edición
                    </Button>
                )}
            </div>
        </form>
    );
}
