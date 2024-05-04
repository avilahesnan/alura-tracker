<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input
                    type="text"
                    class="input"
                    placeholder="Qual tarefa você deseja iniciar?"
                    v-model="descricao"
                    :disabled="iniciouTarefa">
            </div>
            <div class="column">
                <Temporizador
                    @temporizadorFinalizado="finalizarTarefa"
                    @iniciouTarefa="inputDesabilitado" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

import Temporizador from './TemporizadorComponent.vue'

const descricao = ref('')
const iniciouTarefa = ref(false)
function finalizarTarefa(tempoDecorrido: number) {
    descricao.value = ''
    iniciouTarefa.value = false
}
function inputDesabilitado() {
    iniciouTarefa.value = true
}

</script>
