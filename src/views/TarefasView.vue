<template>
    <Formulario 
        @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Box v-if="listaVazia()">
            Você não está muito produtivo hoje.
        </Box>
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input type="text" class="input" placeholder="Digite para filtrar" v-model="filtro" />
                <span class="icon is-small is-left">
                    <i class="fas fa-search" />
                </span>
            </p>
        </div>
        <Tarefa 
            v-for="tarefa, index in tarefas"
            :key="index"
            :tarefa="tarefa"
            @tarefaClicada="selecionarTarefa(tarefa)"
        />
        <ModalDescricao :show="tarefaSelecionada != null">
            <template v-slot:header>
                <p class="modal-card-title">Editando uma tarefa</p>
                <button class="delete" aria-label="close" @click="fecharModal" />
            </template>
            <template v-slot:body>
                <div class="field" v-if="tarefaSelecionada">
                    <label for="descricaoDaTarefa" class="label">
                        Descrição
                    </label>
                    <input
                        type="text"
                        class="input"
                        v-model="tarefaSelecionada.descricao"
                        id="descricaoDaTarefa"
                    />
                </div>
            </template>
            <template v-slot:footer>
                <button class="button is-success" @click="alterarTarefa">Salvar alterações</button>
                <button class="button" @click="fecharModal">Cancelar</button>
            </template>
        </ModalDescricao>
    </div>
</template>

<script lang="ts" setup>

import { computed, ref, watch } from 'vue'

import Formulario from '@/components/FormularioComponent.vue'
import Tarefa from '@/components/TarefaComponent.vue'
import Box from '@/components/BoxComponent.vue'
import ITarefa from '@/interfaces/ITarefa'
import ModalDescricao from '@/components/ModalDescricao.vue'
import { useStore } from '@/store'
import { CADASTRAR_TAREFA, EDITAR_TAREFA, OBETER_PROJETOS, OBETER_TAREFAS } from '@/store/type-actions'
import { TipoNotificacao } from '@/interfaces/INotificacao'
import { notificarMixin } from '@/mixins/notificar'

const store = useStore()

store.dispatch(OBETER_TAREFAS)
store.dispatch(OBETER_PROJETOS)

const tarefas = computed(() => store.state.tarefa.tarefas)
const tarefaSelecionada = ref<null | ITarefa>()
const filtro = ref<string>('')

function listaVazia() {
    if(tarefas.value) {
        return tarefas.value.length === 0
    }
}

function salvarTarefa(tarefa: ITarefa): void {
    store.dispatch(CADASTRAR_TAREFA, tarefa)
        .then(() => notificarMixin.notificar('Tarefa Adicionado', 'Uma nova tarefa foi adicionada!', TipoNotificacao.SUCESSO))
}

function alterarTarefa(): void {
    store.dispatch(EDITAR_TAREFA, tarefaSelecionada.value)
        .then(() => fecharModal())
        .then(() => notificarMixin.notificar('Tarefa Alterado', 'A tarefa foi alterada!', TipoNotificacao.SUCESSO))
}

function selecionarTarefa(tarefa: ITarefa): void {
    tarefaSelecionada.value = tarefa
}

function fecharModal(): void {
    tarefaSelecionada.value = null
}

watch(filtro, (newVal, oldVal) => {
  store.dispatch(OBETER_TAREFAS, newVal)
})

</script>

<style lang="css" scoped>

.lista {
    padding: 1.25rem;
}

</style>
