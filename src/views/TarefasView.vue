<template>
    <Formulario 
        @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Box v-if="listaVazia()">
            Você não está muito produtivo hoje.
        </Box>
        <Tarefa 
            v-for="tarefa, index in tarefas"
            :key="index"
            :tarefa="tarefa"
        />
    </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

import Formulario from '@/components/FormularioComponent.vue'
import Tarefa from '@/components/TarefaComponent.vue'
import Box from '@/components/BoxComponent.vue'
import ITarefa from '@/interfaces/ITarefa'

const tarefas = ref<ITarefa[]>([])

function listaVazia() {
    return tarefas.value.length === 0
}

function salvarTarefa(tarefa: ITarefa) {
    tarefas.value.push(tarefa)
}

</script>

<style scoped>

.lista {
    padding: 1.25rem;
}

</style>
