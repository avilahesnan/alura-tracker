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
            @tarefaClicada="selecionarTarefa(tarefa)"
        />
        <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Editando uma tarefa</p>
                    <button class="delete" aria-label="close" @click="fecharModal"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label for="descricaoDaTarefa" class="label">
                            Descrição
                        </label>
                        <input
                            type="text"
                            class="input"
                            v-model="tarefaSelecionada.descricao"
                            id="descricaoDaTarefa">
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" @click="alterarTarefa">Salvar alterações</button>
                    <button class="button" @click="fecharModal">Cancelar</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { computed, ref } from 'vue'

import Formulario from '@/components/FormularioComponent.vue'
import Tarefa from '@/components/TarefaComponent.vue'
import Box from '@/components/BoxComponent.vue'
import ITarefa from '@/interfaces/ITarefa'
import { useStore } from '@/store'
import { CADASTRAR_TAREFA, EDITAR_TAREFA, OBETER_PROJETOS, OBETER_TAREFAS } from '@/store/type-actions'

const store = useStore()
const tarefas = computed(() => store.state.tarefas)
const tarefaSelecionada = ref<null | ITarefa>()

store.dispatch(OBETER_TAREFAS)
store.dispatch(OBETER_PROJETOS)

function listaVazia() {
    return tarefas.value.length === 0
}

function salvarTarefa(tarefa: ITarefa): void {
    store.dispatch(CADASTRAR_TAREFA, tarefa)
}

function selecionarTarefa(tarefa: ITarefa): void {
    tarefaSelecionada.value = tarefa
}

function fecharModal(): void {
    tarefaSelecionada.value = null
}

function alterarTarefa(): void {
    store.dispatch(EDITAR_TAREFA, tarefaSelecionada.value)
        .then(() => fecharModal())
}

</script>

<style scoped>

.lista {
    padding: 1.25rem;
}

</style>
