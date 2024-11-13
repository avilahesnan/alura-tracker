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
import { ADICIONAR_PROJETO, ALTERAR_PROJETO } from '@/store/type-mutations';

const store = useStore()
const id = ref(router.currentRoute.value.params.id)
const nomeDoProjeto = ref<string>('')

function salvar() {
    if (id.value) {
        store.commit(ALTERAR_PROJETO, {
            id: id.value,
            nome: nomeDoProjeto.value
        })
    } else {
        store.commit(ADICIONAR_PROJETO, nomeDoProjeto.value)
    }
    nomeDoProjeto.value = ''
    router.push('/projetos')
}

onMounted(() => {
    if (id.value) {
        const projeto = store.state.projetos.find(proj => proj.id == id.value)
        nomeDoProjeto.value = projeto?.nome || ''
    }
})

</script>
