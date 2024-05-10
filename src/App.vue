<template>
    <main class="columns is-gapless is-multiline" :class="{ 'modo-claro': modoEscuroAtivo }">
        <div class="column is-one-quarter">
            <BarraLateral 
                @aoTemaAlterado="trocarTema" />
        </div>
        <div class="column is-three-quarter conteudo">
            <Formulario 
                @aoSalvarTarefa="salvarTarefa" />
            <div class="lista">
                <Tarefa 
                    v-for="tarefa, index in tarefas"
                    :key="index"
                    :tarefa="tarefa" />
                    <Box v-if="listaVazia()">
                        Você não está muito produtivo hoje.
                    </Box>
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>

import { reactive, ref } from 'vue'

import BarraLateral from './components/BarraLateral.vue'
import Formulario from './components/FormularioComponent.vue'
import Tarefa from './components/TarefaComponent.vue'
import Box from './components/BoxComponent.vue'
import ITarefa from './interfaces/ITarefa'

const tarefas = ref<ITarefa[]>([])
const modoEscuroAtivo = ref(false)

function listaVazia() {
    return tarefas.value.length === 0
}

function salvarTarefa(tarefa: ITarefa) {
    tarefas.value.push(tarefa)
}

function trocarTema(ativo: boolean) {
    modoEscuroAtivo.value = ativo
}

</script>

<style scoped>

.lista {
    padding: 1.25rem;
}

main {
    --bg-primary: #000000;
    --text-primary: #FFFFFF;
}

main.modo-claro {
    --bg-primary: #FFFFFF;
    --text-primary: #000000;
}

.conteudo {
    background-color: var(--bg-primary);
}

</style>