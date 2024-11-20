<template>
    <section>
        <RouterLink to="/projetos/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
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
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </RouterLink>
                        <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts" setup>

import { computed } from 'vue';
import { useStore } from '@/store';
import { OBETER_PROJETOS, REMOVER_PROJETOS } from '@/store/type-actions';

const store = useStore()
const projetos = computed(() => store.state.projetos)

store.dispatch(OBETER_PROJETOS)

function excluir(id: string) {
    store.dispatch(REMOVER_PROJETOS, id)
}

</script>
