import type { Busqueda } from "@/interfaces/Categorias";
import api from "@/lib/axios";

export default {
    obtenerCategorias() {
        return api.get('/list.php?c=list')
    },
    buscarRecetas({categoria, nombre}: Busqueda) {
        return api.get(`/filter.php?c=${categoria}&i=${nombre}`)
    },
    buscarReceta(id: string) {
        return api.get(`/lookup.php?i=${id}`)
    }
}