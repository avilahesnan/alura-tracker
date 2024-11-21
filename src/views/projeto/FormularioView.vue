<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input
                    type="text"
                    class="input"
                    v-model="nomeDoProjeto"
                    id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
        
    </section>
</template>

<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import { useStore } from '@/store';
import router from '@/router';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { notificarMixin } from '@/mixins/notificar';
import { CADASTRAR_PROJETOS, EDITAR_PROJETOS } from '@/store/type-actions';

const store = useStore()
const id = ref(router.currentRoute.value.params.id)
const nomeDoProjeto = ref<string>('')

function salvar() {
    if (id.value) {
        store.dispatch(EDITAR_PROJETOS, {
            id: id.value,
            nome: nomeDoProjeto.value
        })
            .then(() => notificarMixin.notificar('Projeto Alterado', 'O projeto foi alterado!', TipoNotificacao.SUCESSO))
    } else {
        store.dispatch(CADASTRAR_PROJETOS, nomeDoProjeto.value)
            .then(() => notificarMixin.notificar('Projeto Adicionado', 'Um novo projeto foi adicionado!', TipoNotificacao.SUCESSO))
    }
    nomeDoProjeto.value = ''
    router.push('/projetos')
}

onMounted(() => {
    if (id.value) {
        const projeto = store.state.projeto.projetos.find(proj => proj.id == id.value)
        nomeDoProjeto.value = projeto?.nome || ''
    }
})

</script>
