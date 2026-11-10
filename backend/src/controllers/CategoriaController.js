import categoriaService from "../services/CategoriaService.js";
import { success } from "../responses/ApiResponse.js";

class CategoriaController {
    getAll(req, res, next){
        try {
            const categorias = categoriaService.getAll();
            success(res, categorias);
        } catch (err) {
            next(err);
        }
    }

    getById(req, res, next){
        try {
            const categoria = categoriaService.getById(Number(req.params.id));
            success(res, categoria);
        } catch (err) {
            next(err);
        }
    }
}

export default new CategoriaController();
