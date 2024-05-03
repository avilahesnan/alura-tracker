<template>
    <main class="columns is-gapless is-multiline">
        <div class="column is-one-quarter">
            <BarraLateral />
        </div>
        <div class="column is-three-quarter">
            <Formulario />
        </div>
    </main>
</template>

<script lang="ts" setup>

import BarraLateral from './components/BarraLateral.vue'
import Formulario from './components/FormularioComponent.vue'

</script>
