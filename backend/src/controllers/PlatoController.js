import platoService from "../services/PlatoService.js";
import { success } from "../responses/ApiResponse.js";

class PlatoController {
    getAll(req, res, next){
        try {
            const platos = platoService.getAll();
            success(res, platos);
        } catch (err) {
            next(err);
        }
    }

    getById(req, res, next){
        try {
            const plato = platoService.getById(Number(req.params.id));
            success(res, plato);
        } catch (err) {
            next(err);
        }
    }

    create(req, res, next){
        try {
            const plato = platoService.create(req.body);
            success(res, plato, 201);
        } catch (err) {
            next(err);
        }
    }

    update(req, res, next){
        try {
            const plato = platoService.update(Number(req.params.id), req.body);
            success(res, plato);
        } catch (err) {
            next(err);
        }
    }

    delete(req, res, next){
        try {
            platoService.delete(Number(req.params.id));
            success(res, null);
        } catch (err) {
            next(err);
        }
    }
}

export default new PlatoController();
