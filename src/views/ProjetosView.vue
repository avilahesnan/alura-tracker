<template>
    <section class="projetos">
        <h1 class="title">Projetos</h1>
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
                        <RouterLink :to="`/projeto/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts" setup>

import { computed } from 'vue';
import { useStore } from '@/store';

const store = useStore()
const projetos = computed(() => store.state.projetos)

</script>

<style lang="css" scoped>

.projetos {
    padding: 1.25rem;
}

</style>