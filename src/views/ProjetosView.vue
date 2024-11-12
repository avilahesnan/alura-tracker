<template>
    <section class="projetos">
        <h1 class="title">Projetos</h1>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input
                    type="text"
                    class="input"
                    v-model="nomeDoProjeto"
                    id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import IProjeto from '@/interfaces/IProjeto';

const nomeDoProjeto = ref<string>('')
const projetos = ref<IProjeto[]>([])

function salvar() {
    const projeto: IProjeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto.value
    }
    projetos.value.push(projeto)
    nomeDoProjeto.value = ''
}

</script>

<style lang="css" scoped>

.projetos {
    padding: 1.25rem;
}

</style>