<template>
    <div>
        <!--error code-->
        {{ a.a }}
        <!--error code-->
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const a = ref({ a: "" })
</script>