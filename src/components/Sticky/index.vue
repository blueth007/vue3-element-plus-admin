<template>
    <div :style="{ height: height + 'px', zIndex: zIndex }" ref="container">
        <div :class="className" :style="styles">
            <slot>
                <div>sticky</div>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onActivated, onMounted, onUnmounted, reactive, computed, toRefs, CSSProperties, ref, nextTick } from 'vue'

const props = defineProps({
    stickyTop: {
        type: Number,
        default: 0
    },
    zIndex: {
        type: Number,
        default: 1
    },
    className: {
        type: String,
        default: ''
    }
})

const data = reactive({
    active: false,
    position: '',
    width: '',
    height: '',
    isSticky: false
})
const { height } = toRefs(data)
const container = ref()
const styles = computed(() => {
    return { position: data.position, top: (data.isSticky ? props.stickyTop + 'px' : ''), 'z-index': props.zIndex, width: data.width, height: data.height + 'px' } as CSSProperties
});

onMounted(() => {
    nextTick(() => {

        data.height = container.value?.getBoundingClientRect().height
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleResize)
    })
})

onActivated(() => {
    handleScroll()
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
})

function sticky() {
    if (data.active) {
        return
    }
    data.position = 'fixed'
    data.active = true
    data.width = data.width + 'px'
    data.isSticky = true
}

function handleReset() {
    if (!data.active) {
        return
    }
    reset()
}

function reset() {
    data.position = ''
    data.width = 'auto'
    data.active = false
    data.isSticky = false
}

function handleScroll() {
    const width = container.value?.getBoundingClientRect().width
    data.width = width || 'auto'
    const offsetTop = container.value?.getBoundingClientRect().top
    if (offsetTop < props.stickyTop) {
        sticky()
        return
    }
    handleReset()
}

function handleResize() {
    if (data.isSticky) {
        data.width = container.value?.getBoundingClientRect().width + 'px'
    }
}

</script>
