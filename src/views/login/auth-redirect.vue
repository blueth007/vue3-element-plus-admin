<template></template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';


onBeforeMount(() => {
    const hash = window.location.search.slice(1)
    if (window.localStorage) {
        window.localStorage.setItem('x-admin-oauth-code', hash)
        window.close()
    }
})
</script>

<style scoped></style>