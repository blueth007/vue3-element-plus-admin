<script setup lang="ts">
defineProps({
    icon: {
        type: String,
        default: "",
    },
    title: {
        type: String,
        default: "",
    },
})

</script>
<template>
    <div style="display: inline-block;">
        <svg-icon :icon-class=icon v-if="icon" />
        <span slot="title" v-if="title">{{ title }}</span>
    </div>
</template>
