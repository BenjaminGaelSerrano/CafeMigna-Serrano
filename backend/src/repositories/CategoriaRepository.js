import Categoria from "../models/Categoria.js";
import { categoriasIniciales } from "../data/datosIniciales.js";

class CategoriaRepository {
    constructor(){
        this.categorias = categoriasIniciales.map(
            c => new Categoria(c.id, c.nombre, c.descripcion, c.orden)
        );
    }

    findAll(){
        return [...this.categorias].sort((a, b) => a.orden - b.orden);
    }

    findById(id){
        return this.categorias.find(categoria => categoria.id === id);
    }
}

export default new CategoriaRepository();
