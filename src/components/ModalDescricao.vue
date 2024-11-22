<template>
    <div class="modal" :class="{ 'is-active': props.show }" v-if="props.show">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <slot name="header" />
            </header>
            <section class="modal-card-body">
                <slot name="body" />
            </section>
            <footer class="modal-card-foot">
                <slot name="footer" />
            </footer>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { defineProps } from 'vue'

const props = defineProps({
    show: Boolean
})

</script>
