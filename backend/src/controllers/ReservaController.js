import reservaService from "../services/ReservaService.js";
import { success } from "../responses/ApiResponse.js";

class ReservaController {
    getAll(req, res, next){
        try {
            const reservas = reservaService.getAll();
            success(res, reservas);
        } catch (err) {
            next(err);
        }
    }

    getById(req, res, next){
        try {
            const reserva = reservaService.getById(Number(req.params.id));
            success(res, reserva);
        } catch (err) {
            next(err);
        }
    }

    create(req, res, next){
        try {
            const reserva = reservaService.create(req.body);
            success(res, reserva, 201);
        } catch (err) {
            next(err);
        }
    }

    cambiarEstado(req, res, next){
        try {
            const reserva = reservaService.cambiarEstado(Number(req.params.id), req.body.estado);
            success(res, reserva);
        } catch (err) {
            next(err);
        }
    }

    delete(req, res, next){
        try {
            reservaService.delete(Number(req.params.id));
            success(res, null);
        } catch (err) {
            next(err);
        }
    }
}

export default new ReservaController();
