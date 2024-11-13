import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONAR_PROJETO, ADICIONAR_TAREFA, ALTERAR_PROJETO, ALTERAR_TAREFA, EXCLUIR_PROJETO, EXCLUIR_TAREFA } from "./type-mutations";
import ITarefa from "@/interfaces/ITarefa";
import INoticiacao, { TipoNotificacao } from "@/interfaces/INotificacao";

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
        notificacoes: [
            {
                id: 1,
                titulo: 'title',
                texto: 'message',
                tipo: TipoNotificacao.SUCESSO
            },
            {
                id: 2,
                titulo: 'title',
                texto: 'message',
                tipo: TipoNotificacao.FALHA
            },
            {
                id: 3,
                titulo: 'title',
                texto: 'message',
                tipo: TipoNotificacao.ATENCAO
            }
        ]
    },
    mutations: {
        [ADICIONAR_TAREFA](state, tarefa: ITarefa) { 
            tarefa.id = new Date().toISOString()
            state.tarefas.push(tarefa)
        },
        [ALTERAR_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(p => p.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
        [EXCLUIR_TAREFA](state, id: string) {
            state.tarefas = state.tarefas.filter(p => p.id != id)
        },
        [ADICIONAR_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERAR_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}