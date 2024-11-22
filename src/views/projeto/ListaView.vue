<template>
    <section>
        <RouterLink to="/projetos/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus" />
            </span>
            <span>Novo Projeto</span>
        </RouterLink>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>
                    <td>
                        <RouterLink :to="`/projetos/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt" />
                            </span>
                        </RouterLink>
                        <button class="button ml-2 is-danger" @click="excluirProjeto(projeto.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash" />
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts" setup>

import { computed } from 'vue'
import { useStore } from '@/store'
import { OBETER_PROJETOS, REMOVER_PROJETOS } from '@/store/type-actions'
import { TipoNotificacao } from '@/interfaces/INotificacao'
import { notificarMixin } from '@/mixins/notificar'

const store = useStore()
store.dispatch(OBETER_PROJETOS)

const projetos = computed(() => store.state.projeto.projetos)

function excluirProjeto(id: string) {
    store.dispatch(REMOVER_PROJETOS, id)
        .then(() => notificarMixin.notificar('Projeto Removido', 'O projeto foi removido!', TipoNotificacao.ATENCAO))
}

</script>
