import clienteHttp from "@/http"
import ITarefa from "@/interfaces/ITarefa"
import { Estado } from "@/store"
import { OBETER_TAREFAS, CADASTRAR_TAREFA, EDITAR_TAREFA, REMOVER_TAREFA } from "@/store/type-actions"
import { DEFINIR_TAREFAS, ADICIONAR_TAREFA, ALTERAR_TAREFA, EXCLUIR_TAREFA } from "@/store/type-mutations"
import { Module } from "vuex"

export interface EstadoTarefa {
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [ADICIONAR_TAREFA](state, tarefa: ITarefa) { 
            state.tarefas.push(tarefa)
        },
        [ALTERAR_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(tare => tare.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
        [EXCLUIR_TAREFA](state, id: string) {
            state.tarefas = state.tarefas.filter(tare => tare.id != id)
        }
    },
    actions: {
        [OBETER_TAREFAS]({ commit }, filtro: string) {
            let url = 'tarefas' 
            if(filtro) {
                url += `?descricao=${filtro}`
            }
            clienteHttp.get(url)
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return clienteHttp.post('tarefas', tarefa)
                .then(resposta => commit(ADICIONAR_TAREFA, resposta.data))
        },
        [EDITAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return clienteHttp.put(`tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERAR_TAREFA, tarefa))
        },
        [REMOVER_TAREFA]({ commit }, id: string) {
            return clienteHttp.delete(`tarefas/${id}`)
                .then(() => commit(EXCLUIR_TAREFA, id))
        }
    }
}