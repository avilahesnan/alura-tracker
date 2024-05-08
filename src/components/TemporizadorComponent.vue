<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro 
            :tempoEmSegundos="tempoEmSegundos" />
        <Botao
            @clicado="iniciar"
            icone="fas fa-play"
            texto="play"
            :desabilitado="cronometroRodando" />
        <Botao
            @clicado="finalizar"
            icone="fas fa-stop"
            texto="stop"
            :desabilitado="!cronometroRodando" />
    </div>
</template>

<script lang="ts" setup>

import { ref, defineEmits } from 'vue'

import Cronometro from './CronometroComponent.vue'
import Botao from './BotaoComponent.vue'

const emit = defineEmits(['temporizadorFinalizado', 'iniciouTarefa'])
const tempoEmSegundos = ref(0)
const cronometro = ref(0)
const cronometroRodando = ref(false)

function iniciar() {
    cronometroRodando.value = true
    cronometro.value = setInterval(() => {
        tempoEmSegundos.value++
    }, 1000)
    emit('iniciouTarefa', cronometroRodando.value)
}

function finalizar() {
    cronometroRodando.value = false
    clearInterval(cronometro.value)
    emit('temporizadorFinalizado', tempoEmSegundos.value)
    tempoEmSegundos.value = 0
}

</script>