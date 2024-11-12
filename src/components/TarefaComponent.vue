<template>
    <Box>
        <div class="columns">
            <div class="column is-7">
                {{ props.tarefa?.descricao || 'Tarefa sem descrição'}}
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

import { defineProps } from 'vue'

import Cronometro from './CronometroComponent.vue'
import Box from './BoxComponent.vue'

const props = defineProps({
    tarefa: Object
})

</script>