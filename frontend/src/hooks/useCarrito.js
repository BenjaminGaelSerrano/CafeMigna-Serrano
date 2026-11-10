import { useState } from "react";

// Estado del carrito de "Armá tu pedido". Cada ítem es { plato, cantidad }.
export default function useCarrito() {
    const [items, setItems] = useState([]);

    function agregar(plato) {
        setItems(prev => {
            const existente = prev.find(item => item.plato.id === plato.id);
            if (existente) {
                return prev.map(item =>
                    item.plato.id === plato.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            return [...prev, { plato, cantidad: 1 }];
        });
    }

    function cambiarCantidad(platoId, diferencia) {
        setItems(prev =>
            prev
                .map(item => item.plato.id === platoId ? { ...item, cantidad: item.cantidad + diferencia } : item)
                .filter(item => item.cantidad > 0)
        );
    }

    function vaciar() {
        setItems([]);
    }

    const total = items.reduce((suma, item) => suma + item.plato.precio * item.cantidad, 0);
    const cantidadTotal = items.reduce((suma, item) => suma + item.cantidad, 0);

    return { items, agregar, cambiarCantidad, vaciar, total, cantidadTotal };
}
