<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="Logo">
        </h1>
        <button class="button" @click="alterarTema">
            {{ textoBotao() }}
        </button>
    </header>    
</template>

<script setup lang="ts">

import { defineEmits, ref } from 'vue'

const modoEscuroAtivo = ref(false)
const emit = defineEmits(['aoTemaAlterado'])

function textoBotao() {
    if(modoEscuroAtivo.value) {
        return 'Desativar modo escuro'
    }
    return 'Ativar modo escuro'
}

function alterarTema() {
    modoEscuroAtivo.value = !modoEscuroAtivo.value
    emit('aoTemaAlterado', modoEscuroAtivo.value)
}

</script>

<style scoped>

header {
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    padding: 1rem;
    text-align: center;
}

@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}

</style>