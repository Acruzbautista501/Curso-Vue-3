import type { CrearCliente, EditarCliente } from "@/interfaces/Clientes";
import api from "@/lib/axios";

export default {
    /**
     * Obtiene todos los clientes
     * @returns Promise con el listado de clientes
     */
    obtnerClientes() {
        return api.get('/clientes')
    },

    /**
     * Agrega un nuevo cliente
     * @param data - Datos del cliente a crear
     * @returns Promise con la respuesta del servidor
     */
    agregarCliente(data: CrearCliente) {
        return api.post('/clientes', data)
    },

    /**
     * Obtiene un cliente por su ID
     * @param id - Identificador del cliente
     * @returns Promise con los datos del cliente
     */
    obtnerCliente(id: string) {
        return api.get(`/clientes/${id}`)
    },

    /**
     * Actualiza un cliente existente
     * @param id - Identificador del cliente
     * @param data - Datos a actualizar
     * @returns Promise con la respuesta del servidor
     */
    actualizarCliente(id: string, data: EditarCliente) {
        return api.patch(`/clientes/${id}`, data)
    },

    /**
     * Cambia el estado de un cliente (activo/inactivo)
     * @param id - Identificador del cliente
     * @param estado - Nuevo estado del cliente
     * @returns Promise con la respuesta del servidor
     */
    cambiarEstado(id: string, estado: number) {
        return api.patch(`/clientes/${id}`, { estado })
    },

    /**
     * Elimina un cliente por su ID
     * @param id - Identificador del cliente a eliminar
     * @returns Promise con la respuesta del servidor
     */
    eliminarCliente(id:string) {
        return api.delete(`/clientes/${id}`)
    }
}
