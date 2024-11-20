import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONAR_PROJETO, ADICIONAR_TAREFA, ALTERAR_PROJETO, ALTERAR_TAREFA, DEFINIR_PROJETOS, DEFINIR_TAREFAS, EXCLUIR_PROJETO, EXCLUIR_TAREFA, NOTIFICAR } from "./type-mutations";
import ITarefa from "@/interfaces/ITarefa";
import INoticiacao from "@/interfaces/INotificacao";
import { CADASTRAR_PROJETOS, CADASTRAR_TAREFA, EDITAR_PROJETOS, EDITAR_TAREFA, OBETER_PROJETOS, OBETER_TAREFAS, REMOVER_PROJETOS, REMOVER_TAREFA } from "./type-actions";
import clienteHttp from "@/http";

interface Estado {
    projetos: IProjeto[],
    tarefas: ITarefa[],
    notificacoes: INoticiacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes: []
    },
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [ADICIONAR_TAREFA](state, tarefa: ITarefa) { 
            state.tarefas.push(tarefa)
        },
        [ALTERAR_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(p => p.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
        [EXCLUIR_TAREFA](state, id: string) {
            state.tarefas = state.tarefas.filter(p => p.id != id)
        },
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
        },
        [NOTIFICAR](state, novaNotificacao: INoticiacao) {
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(noti => noti.id != novaNotificacao.id)
            }, 3000)
        }
    },
    actions: {
        [OBETER_PROJETOS]({ commit}) {
            clienteHttp.get('projetos')
                .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
        },
        [CADASTRAR_PROJETOS]({ commit }, nomeDoProjeto: string) {
            return clienteHttp.post('projetos', {
                nome: nomeDoProjeto
            })
                .then(resposta => commit(ADICIONAR_PROJETO, resposta.data))
        },
        [EDITAR_PROJETOS](state, projeto: IProjeto) {
            return clienteHttp.put(`projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETOS]({ commit }, id: string) {
            return clienteHttp.delete(`projetos/${id}`)
                .then(() => commit(EXCLUIR_PROJETO, id))
        },
        [OBETER_TAREFAS]({ commit}) {
            clienteHttp.get('tarefas')
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return clienteHttp.post('tarefas', tarefa)
                .then(resposta => commit(ADICIONAR_TAREFA, resposta.data))
        },
        [EDITAR_TAREFA](state, tarefa: ITarefa) {
            return clienteHttp.put(`tarefas/${tarefa.id}`, tarefa)
        },
        [REMOVER_TAREFA]({ commit }, id: string) {
            return clienteHttp.delete(`tarefas/${id}`)
                .then(() => commit(EXCLUIR_TAREFA, id))
        },
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}
