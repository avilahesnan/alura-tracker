import clienteHttp from "@/http"
import IProjeto from "@/interfaces/IProjeto"
import { Estado } from "@/store"
import { CADASTRAR_PROJETOS, EDITAR_PROJETOS, OBETER_PROJETOS, REMOVER_PROJETOS } from "@/store/type-actions"
import { ADICIONAR_PROJETO, ALTERAR_PROJETO, DEFINIR_PROJETOS, EXCLUIR_PROJETO } from "@/store/type-mutations"
import { Module } from "vuex"

export interface EstadoProjeto {
    projetos: IProjeto[]
}

export const projeto: Module<EstadoProjeto, Estado> = {
    mutations: {
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },
        [ADICIONAR_PROJETO](state, projeto: IProjeto) {
            state.projetos.push(projeto)
        },
        [ALTERAR_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        }
    },
    actions: {
        [OBETER_PROJETOS]({ commit}) {
            clienteHttp.get('projetos')
                .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
        },
        [CADASTRAR_PROJETOS]({ dispatch }, nomeDoProjeto: string) {
            return clienteHttp.post('projetos', {
                nome: nomeDoProjeto
            })
                .then(() => dispatch(OBETER_PROJETOS))
        },
        [EDITAR_PROJETOS](state, projeto: IProjeto) {
            return clienteHttp.put(`projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETOS]({ commit }, id: string) {
            return clienteHttp.delete(`projetos/${id}`)
                .then(() => commit(EXCLUIR_PROJETO, id))
        }
    }
}