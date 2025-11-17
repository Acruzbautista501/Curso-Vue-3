import type { CrearCliente, EditarCliente } from "@/interfaces/Clientes";
import api from "@/lib/axios";

export default {
    obtnerClientes() {
        return api.get('/clientes')
    },
    agregarCliente(data: CrearCliente) {
        return api.post('/clientes', data)
    },
    obtnerCliente(id: string) {
        return api.get(`/clientes/${id}`)
    },
    actualizarCliente(id: string, data: EditarCliente) {
        return api.patch(`/clientes/${id}`, data)
    },
    cambiarEstado(id: string, estado: number) {
        return api.patch(`/clientes/${id}`, { estado })
    },
    eliminarCliente(id:string) {
        return api.delete(`/clientes/${id}`)
    }
}