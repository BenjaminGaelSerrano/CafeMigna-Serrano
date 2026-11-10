export function soloDisponibles(platos) {
    return platos.filter(plato => plato.disponible);
}

// Devuelve [{ categoria, platos }] respetando el orden de las categorías y omitiendo las vacías.
export function agruparPorCategoria(platos, categorias) {
    return categorias
        .map(categoria => ({
            categoria,
            platos: platos.filter(plato => plato.categoriaId === categoria.id)
        }))
        .filter(grupo => grupo.platos.length > 0);
}

// Especiales de la portada: platos disponibles con foto; si no alcanzan, se completan con el resto.
export function obtenerEspeciales(platos, cantidad = 3) {
    const disponibles = soloDisponibles(platos);
    const conFoto = disponibles.filter(plato => plato.imagenUrl);
    const sinFoto = disponibles.filter(plato => !plato.imagenUrl);
    return [...conFoto, ...sinFoto].slice(0, cantidad);
}

export function nombreCategoria(categorias, categoriaId) {
    return categorias.find(categoria => categoria.id === categoriaId)?.nombre ?? "Sin categoría";
}
