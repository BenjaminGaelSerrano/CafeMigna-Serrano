import { Routes, Route, Navigate } from "react-router-dom";
import ScrollManager from "./components/layout/ScrollManager.jsx";
import InicioPage from "./pages/InicioPage.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import PedidoPage from "./pages/PedidoPage.jsx";
import ReservaPage from "./pages/ReservaPage.jsx";
import ContactoPage from "./pages/ContactoPage.jsx";
import AdminPlatosPage from "./pages/AdminPlatosPage.jsx";
import AdminReservasPage from "./pages/AdminReservasPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
    return (
        <>
            <ScrollManager />
            <Routes>
                <Route path="/" element={<InicioPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/pedido" element={<PedidoPage />} />
                <Route path="/reservar" element={<ReservaPage />} />
                <Route path="/contacto" element={<ContactoPage />} />
                <Route path="/admin" element={<Navigate to="/admin/platos" replace />} />
                <Route path="/admin/platos" element={<AdminPlatosPage />} />
                <Route path="/admin/reservas" element={<AdminReservasPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default App;
