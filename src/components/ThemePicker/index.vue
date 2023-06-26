<template>
    <div class="theme-color-picker">
        <el-color-picker v-model="theme"
            :predefine="['#409EFF', '#1890ff', '#304156', '#212121', '#11a983', '#13c2c2', '#6959CD', '#f5222d',]"
            @change="themeChange" class="theme-picker" popper-class="theme-picker-dropdown" />
    </div>
</template>

<script setup lang="ts">
import { version } from 'element-plus/package.json'

import { computed, nextTick, reactive, ref, toRefs, watch } from 'vue'
import { useStore } from '@/store/index'
import { ElMessage, } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
const ORIGINAL_THEME = '#409EFF' // default color
const store = useStore()

const emit = defineEmits(['change'])

const data = reactive({
    chalk: '', // content of theme-chalk css
    theme: ''
})
const { theme } = toRefs(data)

const defaultTheme = computed(() => {
    return store.settings.theme
})

watch(() => defaultTheme.value, (val, oldVal) => {
    data.theme = val
}, {
    immediate: true
})

const themeChange = (color: string) => {
    ElMessage({
        message: '  Compiling the theme',
        customClass: 'theme-message',
        type: 'success',
        duration: 0,
        icon: Loading
    })
    const oldTheme = data.chalk ? data.theme : ORIGINAL_THEME
    if (typeof color !== 'string') return
    const themeCluster = getThemeCluster(color.replace('#', ''))
    const originalCluster = getThemeCluster(oldTheme.replace('#', ''))

    const getHandler = (variable: string, id: string) => {
        return () => {
            const originalCluster = getThemeCluster(ORIGINAL_THEME.replace('#', ''))
            const newStyle = updateStyle(variable, originalCluster, themeCluster)

            let styleTag = document.getElementById(id)
            if (!styleTag) {
                styleTag = document.createElement('style')
                styleTag.setAttribute('id', id)
                document.head.appendChild(styleTag)
            }
            styleTag.innerText = newStyle
        }
    }

    if (!data.chalk) {
        setTimeout(async () => {
            const url = `https://unpkg.com/element-plus@${version}/theme-chalk/index.css`
            await getCSSString(url)
            const chalkHandler = getHandler(data.chalk, 'chalk-style')
            chalkHandler()
            emit('change', color)
            ElMessage.closeAll()

        }, 410)// 410是el-message transaction-fade的过渡时间：0.4s
    } else {
        const chalkHandler = getHandler(data.chalk, 'chalk-style')
        chalkHandler()
        emit('change', color)
        ElMessage.closeAll()
    }

}

watch(() => data.theme, () => { })

// 方法：
function updateStyle(style: string, oldCluster: Array<string>, newCluster: Array<string>) {
    let newStyle = style
    oldCluster.forEach((color: string, index: number) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
    })
    return newStyle
}

function getCSSString(url: string) {
    return new Promise<void>(resolve => {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
                data.chalk = xhr.responseText.replace(/@font-face{[^}]+}/, '')
                resolve()
            }
        }
        xhr.open('GET', url)
        xhr.send()
    })
}

function getThemeCluster(theme: string) {
    type IColor = string | number
    const tintColor = (color: any, tint: number) => {
        let red: IColor = parseInt(color.slice(0, 2), 16)
        let green: IColor = parseInt(color.slice(2, 4), 16)
        let blue: IColor = parseInt(color.slice(4, 6), 16)

        if (tint === 0) { // when primary color is in its rgb space
            return [red, green, blue].join(',')
        } else {
            red = Math.round(tint * (255 - red))
            green = Math.round(tint * (255 - green))
            blue = Math.round(tint * (255 - blue))

            red = red.toString(16)
            green = green.toString(16)
            blue = blue.toString(16)

            return `#${red}${green}${blue}`
        }
    }

    const shadeColor = (color: any, shade: number) => {
        let red: IColor = parseInt(color.slice(0, 2), 16)
        let green: IColor = parseInt(color.slice(2, 4), 16)
        let blue: IColor = parseInt(color.slice(4, 6), 16)

        red = Math.round((1 - shade) * red)
        green = Math.round((1 - shade) * green)
        blue = Math.round((1 - shade) * blue)

        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)

        return `#${red}${green}${blue}`
    }

    const clusters = [theme]
    for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
    }
    clusters.push(shadeColor(theme, 0.1))
    return clusters
}

</script>

<style>
.theme-message,
.theme-picker-dropdown {
    z-index: 99999 !important;
}

.theme-picker .el-color-picker__trigger {
    height: 26px !important;
    width: 26px !important;
    padding: 2px;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
    display: none;
}
</style>
