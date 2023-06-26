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
    <svg-icon :icon-class=icon v-if="icon" />
    <span slot="title" v-if="title">{{ title }}</span>
</template>
