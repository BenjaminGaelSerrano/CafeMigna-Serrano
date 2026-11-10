import categoriaRepository from "../repositories/CategoriaRepository.js";
import { NotFoundError } from "../exceptions/AppError.js";
import { Messages } from "../enums/Messages.js";

class CategoriaService {
    getAll(){
        return categoriaRepository.findAll();
    }

    getById(id){
        const categoria = categoriaRepository.findById(id);
        if(!categoria) throw new NotFoundError(Messages.CATEGORIA_NOT_FOUND);
        return categoria;
    }
}

export default new CategoriaService();
