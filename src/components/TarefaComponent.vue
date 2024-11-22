<template>
    <Box>
        <div class="columns">
            <div class="column is-4 clicavel" @click="tarefaClicada">
                {{ props.tarefa?.descricao || 'Tarefa sem descrição'}}
            </div>
            <div class="column is-3 clicavel" @click="tarefaClicada">
                {{ props.tarefa?.projeto?.nome || 'N/D'}}
            </div>
            <div class="column">
                <Cronometro
                    icone="fas fa-clock"
                    :tempoEmSegundos="props.tarefa?.duracaoEmSegundos" />
            </div>
            <div class="column">
                <span @click="excluirTarefa(props.tarefa?.id)">
                    <i class="fas fa-trash" />
                </span>
            </div>
        </div>
    </Box>
</template>

<script lang="ts" setup>

import { defineProps, defineEmits } from 'vue'

import Cronometro from './CronometroComponent.vue'
import Box from './BoxComponent.vue'
import { TipoNotificacao } from '@/interfaces/INotificacao'
import { notificarMixin } from '@/mixins/notificar'
import { REMOVER_TAREFA } from '@/store/type-actions'
import { useStore } from '@/store'

const store = useStore()
const props = defineProps({
    tarefa: Object
})
const emit = defineEmits(['tarefaClicada'])

function tarefaClicada(): void {
    emit('tarefaClicada')
}

function excluirTarefa(id: string) {
    store.dispatch(REMOVER_TAREFA, id)
        .then(() => notificarMixin.notificar('Tarefa Removido', 'A tarefa foi removido!', TipoNotificacao.ATENCAO))
}

</script>

<style lang="css" scoped>

.clicavel {
    cursor: pointer;
}

</style>
