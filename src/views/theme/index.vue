<template>
    <div class="app-container">
        <el-card class="box-card">
            <div slot="header">
                <a class="link-type link-title" target="_blank"
                    href="https://panjiachen.github.io/vue-element-admin-site/guide/advanced/theme.html">
                    Theme documentation
                </a>
            </div>
            <div class="box-item">
                <span class="field-label">Change Theme : </span>
                <el-switch v-model="theme" />
                <aside style="margin-top:15px;">
                    Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with
                    different application scenarios. Refer to the documentation for details.
                </aside>
            </div>
        </el-card>

        <div class="block">
            <el-button type="primary">
                Primary
            </el-button>
            <el-button type="success">
                Success
            </el-button>
            <el-button type="info">
                Info
            </el-button>
            <el-button type="warning">
                Warning
            </el-button>
            <el-button type="danger">
                Danger
            </el-button>
        </div>

        <div class="block">
            <el-button type="primary" :icon="Edit" />
            <el-button type="primary" :icon="Search" />
            <el-button type="primary" :icon="Share" />
            <el-button type="primary" :icon="Delete">
                Search
            </el-button>
            <el-button type="primary">
                <span>Upload</span>
                <span class="iconify el-icon el-icon-right" data-icon="ep:upload-filled"></span>
            </el-button>
        </div>

        <div class="block">
            <el-tag v-for="tag in tags" :key="tag.type" :type="tag.type" class="tag-item">
                {{ tag.name }}
            </el-tag>
        </div>

        <div class="block">
            <el-radio-group v-model="radio">
                <el-radio :label="3">
                    Option A
                </el-radio>
                <el-radio :label="6">
                    Option B
                </el-radio>
                <el-radio :label="9">
                    Option C
                </el-radio>
            </el-radio-group>
        </div>

        <div class="block">
            <el-slider v-model="slideValue" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { toggleClass } from '@/utils'
// import '@/assets/custom-theme/index.css' // the theme changed version element-ui css
import "element-plus/theme-chalk/dark/css-vars.css";
import { reactive, watch, toRefs } from 'vue'
import { Delete, Edit, Search, Share } from '@element-plus/icons-vue'
import type { TagProps } from 'element-plus'

const data = reactive({
    theme: false,
    tags: [
        { name: 'Tag One', type: '' },
        { name: 'Tag Two', type: 'info' },
        { name: 'Tag Three', type: 'success' },
        { name: 'Tag Four', type: 'warning' },
        { name: 'Tag Five', type: 'danger' }
    ] as { name: string; type: TagProps['type'] }[],
    slideValue: 50,
    radio: 3
})
const { tags, slideValue, radio, theme } = toRefs(data)
watch(() => data.theme, () => {
    // toggleClass(document.body, 'custom-theme')
    toggleClass(document.body.parentElement as HTMLElement, 'dark')
})
</script>

<style scoped>
.field-label {
    vertical-align: middle;
}

.box-card {
    width: 400px;
    max-width: 100%;
    margin: 20px auto;
}

.block {
    padding: 30px 24px;
}

.tag-item {
    margin-right: 15px;
}

.el-icon-right {
    margin-left: 5px;
}
</style>
