<template>
    <div class="box has-text-weight-bold">
        <slot></slot>
    </div>
</template>

<style scoped>

.box {
    color: var(--bg-primary);
    background-color: var(--text-primary);
}

</style>