<template>
    <section>
        <strong class="display">
            <span>
                <i :class="props.icone"></i>
            </span>
            {{ tempoDecorrido() }}
        </strong>
    </section>
</template>

<script lang="ts" setup>

import { defineProps } from 'vue'

const props = defineProps({
    tempoEmSegundos: { type: Number, default: 0 },
    icone: String
})
const tempoDecorrido = () => new Date(props.tempoEmSegundos * 1000).toISOString().substr(11,8)

</script>

<style scoped>

.display {
    color: var(--bg-primary);
}

</style>