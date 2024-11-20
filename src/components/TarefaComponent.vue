<template>
    <Box>
        <div class="columns clicavel" @click="tarefaClicada">
            <div class="column is-4">
                {{ props.tarefa?.descricao || 'Tarefa sem descrição'}}
            </div>
            <div class="column is-3">
                {{ props.tarefa?.projeto?.nome || 'N/D'}}
            </div>
            <div class="column">
                <Cronometro
                    icone="fas fa-clock"
                    :tempoEmSegundos="props.tarefa?.duracaoEmSegundos" />
            </div>
        </div>
    </Box>
</template>

<script lang="ts" setup>

import { defineProps, defineEmits } from 'vue'

import Cronometro from './CronometroComponent.vue'
import Box from './BoxComponent.vue'

const props = defineProps({
    tarefa: Object
})
const emit = defineEmits(['tarefaClicada'])

function tarefaClicada(): void {
    emit('tarefaClicada')
}

</script>

<style lang="css" scoped>

.clicavel {
    cursor: pointer;
}

</style>
