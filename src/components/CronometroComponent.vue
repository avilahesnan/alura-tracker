<template>
    <section>
        <strong class="display">{{ tempoDecorrido() }}</strong>
    </section>
</template>

<script lang="ts" setup>

import { defineProps } from 'vue'

const props = defineProps({
    tempoEmSegundos: { type: Number, default: 0 }
})
const tempoDecorrido = () => new Date(props.tempoEmSegundos * 1000).toISOString().substr(11,8)

</script>

<style scoped>

.display {
    color: var(--texto-primary);
}

</style>