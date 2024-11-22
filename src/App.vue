<template>
    <main class="columns is-gapless is-multiline" :class="{ 'modo-claro': modoEscuroAtivo }">
        <div class="column is-one-quarter">
            <BarraLateral 
                @aoTemaAlterado="trocarTema" />
        </div>
        <div class="column is-three-quarter conteudo">
            <Notificacoes />
            <RouterView />
        </div>
    </main>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

import BarraLateral from './components/BarraLateral.vue'
import Notificacoes from './components/NotificacoesComponent.vue'

const modoEscuroAtivo = ref(false)

function trocarTema(ativo: boolean) {
    modoEscuroAtivo.value = ativo
}

</script>

<style lang="css" scoped>

main {
    --bg-primary: #2b2d42;
    --text-primary: #DDDDDD;
}

main.modo-claro {
    --bg-primary: #FFFFFF;
    --text-primary: #000000;
}

.conteudo {
    background-color: var(--bg-primary);
}

</style>
