<template>
    <main class="columns is-gapless is-multiline">
        <div class="column is-one-quarter">
            <BarraLateral />
        </div>
        <div class="column is-three-quarter">
            <Formulario 
                @aoSalvarTarefa="salvarTarefa" />
            <div class="lista">
                <Tarefa 
                    v-for="tarefa, index in tarefas"
                    :key="index"
                    :tarefa="tarefa" />
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

import BarraLateral from './components/BarraLateral.vue'
import Formulario from './components/FormularioComponent.vue'
import Tarefa from './components/TarefaComponent.vue'
import ITarefa from './interfaces/ITarefa';

const tarefas = ref<ITarefa[]>([])

function salvarTarefa(tarefa: ITarefa) {
    tarefas.value.push(tarefa)
}

</script>

<style scoped>

.lista {
    padding: 1.25rem;
}

</style>