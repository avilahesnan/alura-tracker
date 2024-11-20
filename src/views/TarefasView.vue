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

import { computed } from 'vue'

import Formulario from '@/components/FormularioComponent.vue'
import Tarefa from '@/components/TarefaComponent.vue'
import Box from '@/components/BoxComponent.vue'
import ITarefa from '@/interfaces/ITarefa'
import { useStore } from '@/store'
import { CADASTRAR_TAREFA, OBETER_PROJETOS, OBETER_TAREFAS } from '@/store/type-actions'

const store = useStore()
const tarefas = computed(() => store.state.tarefas)

store.dispatch(OBETER_TAREFAS)
store.dispatch(OBETER_PROJETOS)

function listaVazia() {
    return tarefas.value.length === 0
}

function salvarTarefa(tarefa: ITarefa): void {
    store.dispatch(CADASTRAR_TAREFA, tarefa)
}

</script>

<style scoped>

.lista {
    padding: 1.25rem;
}

</style>
