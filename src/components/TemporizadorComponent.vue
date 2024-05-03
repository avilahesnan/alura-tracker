<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro 
            :tempoEmSegundos="tempoEmSegundos" />
        <button
            class="button"
            :disabled="clicadoPlay"
            @click="iniciar">
                <span class="icon">
                    <i class="fas fa-play"></i>
                </span>
                <span>play</span>
        </button>
        <button
            class="button"
            :disabled="clicadoStop"
            @click="finalizar">
                <span class="icon">
                    <i class="fas fa-stop"></i>
                </span>
                <span>stop</span>
        </button>
    </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

import Cronometro from './CronometroComponent.vue'

const tempoEmSegundos = ref(0)
const cronometro = ref(0)
const clicadoPlay = ref(false)
const clicadoStop = ref(true)
function iniciar() {
    clicadoPlay.value = true
    clicadoStop.value = false
    tempoEmSegundos.value = 0
    cronometro.value = setInterval(() => {
        tempoEmSegundos.value++
    }, 1000)
}
function finalizar() {
    clicadoPlay.value = false
    clicadoStop.value = true
    clearInterval(cronometro.value)
}

</script>
