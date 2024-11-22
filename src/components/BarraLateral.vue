<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="Logo">
        </h1>
        <button class="button" @click="alterarTema">
            {{ textoBotao() }}
        </button>
        <nav class="panel mt-5">
            <ul>
                <li>
                    <RouterLink to="/" class="link">
                        <i class="fas fa-tasks"></i>
                        Tarefas
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/Projetos" class="link">
                        <i class="fas fa-project-diagram"></i>
                        Projetos
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>    
</template>

<script setup lang="ts">

import { defineEmits, ref } from 'vue'

const modoEscuroAtivo = ref(false)
const emit = defineEmits(['aoTemaAlterado'])

function textoBotao() {
    if(modoEscuroAtivo.value) {
        return 'Desativar modo claro'
    }
    return 'Ativar modo claro'
}

function alterarTema() {
    modoEscuroAtivo.value = !modoEscuroAtivo.value
    emit('aoTemaAlterado', modoEscuroAtivo.value)
}

</script>

<style lang="css" scoped>

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

.panel li {
    margin: 8px 0;
}

.link {
    color: #FFFFFF;
}

.link:hover {
    color: #FAF0CA;
}

.link.router-link-active {
    color: #FAF0CA;
}

</style>
