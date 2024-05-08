<template>
    <div class="box has-text-weight-bold">
        <div class="columns">
            <div class="column is-7">
                {{ props.tarefa?.descricao }}
            </div>
            <div class="column">
                <Cronometro 
                    :tempoEmSegundos="props.tarefa?.duracaoEmSegundos" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { defineProps } from 'vue'

import Cronometro from './CronometroComponent.vue'

const props = defineProps({
    tarefa: Object
})
</script>

<style scoped>

.box {
    background: #252525;
}

</style>