<template>
    <div class="notificacoes">
        <article
            v-for="notificacao in notificacoes"
            :key="notificacao.id"
            class="message"
            :class="contexto[notificacao.tipo]"
            >
            <div class="message-header">
                {{ notificacao.titulo }}
            </div>
            <div class="message-body">
                {{ notificacao.texto }}
            </div>
        </article>
    </div>
</template>

<script lang="ts" setup>

import { TipoNotificacao } from '@/interfaces/INotificacao'
import { useStore } from '@/store'
import { computed } from 'vue'

const store = useStore()
const notificacoes = computed(() => store.state.notificacoes)
const contexto = {
    [TipoNotificacao.SUCESSO] : 'is-success',
    [TipoNotificacao.FALHA] : 'is-danger',
    [TipoNotificacao.ATENCAO] : 'is-warning'
}

</script>

<style lang="css" scoped>

.notificacoes {
    position: absolute;
    width: 300px;
    padding: 8px;
    right: 0;
    z-index: 2;
}

</style>
