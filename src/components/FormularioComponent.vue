<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input
                    type="text"
                    class="input"
                    placeholder="Qual tarefa você deseja iniciar?"
                    v-model="descricao"
                    :disabled="iniciouTarefa">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione um projeto</option>
                        <option 
                            :value="projeto.id"
                            v-for="projeto in projetos"
                            :key="projeto.id"
                        >
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
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

import { ref, defineEmits, computed } from 'vue'

import Temporizador from './TemporizadorComponent.vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { TipoNotificacao } from '@/interfaces/INotificacao'
import useNotificador from '@/hooks/notificador'

const store = useStore(key)
const notificador = useNotificador()
const descricao = ref('')
const idProjeto = ref('')
const iniciouTarefa = ref(false)
const emit = defineEmits(['aoSalvarTarefa'])

const projetos = computed(() => store.state.projetos)

function finalizarTarefa(tempoDecorrido: number) {
    const projeto = store.state.projetos.find(proj => proj.id == idProjeto.value)
    if (!projeto) {
        notificador.notificar('Ops!', 'Selecione um projeto antes de finalizar a tarefa!', TipoNotificacao.ATENCAO)
        return
    }
    emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricao.value,
        projeto: projetos.value.find(proj => proj.id == idProjeto.value)
    })
    descricao.value = ''
    iniciouTarefa.value = false
}

function inputDesabilitado() {
    iniciouTarefa.value = true
}

</script>

<style scoped>

.formulario {
    color: var(--text-primary);
    background-color: var(--bg-primary);
}

</style>