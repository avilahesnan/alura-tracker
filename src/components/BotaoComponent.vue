<template>
    <button
        class="button"
        :disabled="props.desabilitado"
        @click="clicado">
            <span class="icon">
                <i :class="props.icone"></i>
            </span>
            <span>{{ props.texto }}</span>
    </button>
</template>

<script lang="ts" setup>

import { defineEmits, defineProps } from 'vue'

const props = defineProps({
    desabilitado: Boolean,
    icone: String,
    texto: String
})
const emit = defineEmits(['clicado'])

function clicado() {
    emit('clicado')
}

</script>

<style scoped>

button {
    color: var(--text-primary);
    background-color: var(--bg-primary);
}

</style>