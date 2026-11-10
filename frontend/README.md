# Frontend - CafeMigna Serrano

Interfaz en React + Vite que consume la API de la Entrega 2 (`backend/`).

## Ejecución

Primero levantar el backend (`cd backend && npm start`, puerto 3000). Después:

```bash
cd frontend
npm install
npm run dev
```

Abrir http://localhost:5173.

La URL de la API se configura con la variable `VITE_API_URL` (ver `.env.example`). Si no se define, se usa `http://localhost:3000/api`.

## Pantallas

Cada pantalla sigue el boceto de "Armado de diseño sobre el negocio dado".

| Ruta            | Pantalla               | Datos                                     |
|-----------------|------------------------|-------------------------------------------|
| `/`             | Inicio (boceto A)      | Especiales desde `GET /api/platos`        |
| `/menu`         | Menú digital (boceto B)| Platos y categorías desde la API          |
| `/pedido`       | Armá tu pedido (boceto D) | Platos desde la API, carrito local     |
| `/reservar`     | Reservá tu mesa (boceto C) | Formulario validado, `POST /api/reservas` |
| `/contacto`     | Contactanos (boceto E) | Formulario validado + mapa                |
| `/admin/platos` | Administración: platos | CRUD completo de platos contra la API     |
| `/admin/reservas` | Administración: reservas | Listar, confirmar, cancelar y eliminar reservas |

Los pedidos y las consultas se envían al WhatsApp del local con el mensaje ya escrito, porque la API todavía no tiene esos recursos.

## Organización de `src/`

```
src/
├── assets/          Fotos del local (fachada, salón)
├── components/
│   ├── layout/      Navbar, Footer, Logo, PageLayout, ScrollManager
│   ├── ui/          Button, FormField, CheckboxField, Etiqueta, Loader, EstadoError, EstadoVacio,
│   │                ConfirmDialog, PageHeader, SectionTitle, Iconos, Tabla.css
│   ├── platos/      PlatoCard, PlatoImagen, MenuCategoria, PlatoForm, PlatosTabla
│   ├── reservas/    ReservasTabla
│   ├── pedido/      Carrito, FinalizarPedido
│   ├── admin/       AdminNav (pestañas de administración)
│   └── notificaciones/  ToastProvider, Toast (sistema único de avisos)
├── hooks/           useApi (carga genérica), useMenu, useFormulario, useCarrito, useToast, useTituloPagina
├── pages/           Una pantalla por archivo
├── services/        api.js (único fetch) + platosService, categoriasService, reservasService
├── utils/           Formato de precios y fechas, validaciones, datos del local, WhatsApp
├── styles/          variables.css (paleta y tipografías del boceto), base.css
├── App.jsx          Rutas de la aplicación
└── main.jsx         Punto de entrada
```

Las fotos de los platos están en `public/img/platos/` porque el backend las referencia por URL (`imagenUrl`).

## Criterios aplicados

- **Servicios centralizados:** `services/api.js` es el único lugar con `fetch`. Arma la URL, procesa `{ success, data }`, detecta respuestas incorrectas y lanza un `Error` con el mensaje del backend (o uno claro si el servidor está apagado).
- **Notificaciones:** éxitos y errores pasan por el mismo `ToastProvider` (avisos laterales, sin `alert()`).
- **Estados:** cada pantalla con datos muestra carga (`Loader`), error con botón "Reintentar" (`EstadoError`) y vacío (`EstadoVacio`).
- **Formularios:** validación propia en `utils/validaciones.js`, mensajes debajo de cada campo y foco en el primer campo con error.
- **Eliminar:** se pide confirmación en un `<dialog>` nativo antes de borrar un plato o una reserva.
- **Accesibilidad:** `label` asociado a cada campo (`htmlFor`/`id`), errores vinculados con `aria-describedby`, botones semánticos con nombre accesible, textos alternativos en fotos, enlace "Saltar al contenido", foco visible, título por pantalla y movimiento reducido respetado.
- **Diseño:** paleta (crema #FDFBF7, marrón #4A3B32, terracota #D96C4A) y tipografías (Playfair Display + Lato) del documento de diseño. El terracota de los botones se oscureció a #B4532F para cumplir el contraste AA con texto blanco.
