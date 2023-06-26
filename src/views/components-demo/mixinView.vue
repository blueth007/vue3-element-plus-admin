<template>
    <div class="mixin-components-container">
        <el-row>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span>Buttons</span>
                    </div>
                </template>
                <div style="margin-bottom:50px;">
                    <el-row>
                        <el-col :span="4" class="text-center">
                            <router-link class="pan-btn blue-btn" to="/documentation/index">
                                Documentation
                            </router-link>
                        </el-col>
                        <el-col :span="4" class="text-center">
                            <router-link class="pan-btn light-blue-btn" to="/icon/index">
                                Icons
                            </router-link>
                        </el-col>
                        <el-col :span="4" class="text-center">
                            <router-link class="pan-btn pink-btn" to="/excel/export-excel">
                                Excel
                            </router-link>
                        </el-col>
                        <el-col :span="4" class="text-center">
                            <router-link class="pan-btn green-btn" to="/table/complex-table">
                                Table
                            </router-link>
                        </el-col>
                        <el-col :span="4" class="text-center">
                            <router-link class="pan-btn tiffany-btn" to="/example/create">
                                Form
                            </router-link>
                        </el-col>
                        <el-col :span="4" class="text-center">
                            <router-link class="pan-btn yellow-btn" to="/theme/index">
                                Theme
                            </router-link>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </el-row>

        <el-row :gutter="20" style="margin-top:50px;">
            <el-col :span="6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Material Design 的input</span>
                    </div>
                    <div style="height:100px;">
                        <el-form :model="demo" :rules="demoRules">
                            <el-form-item prop="title">
                                <MDinput v-model="demo.title" name="title" placeholder="输入标题">
                                    <span class="iconify el-icon" data-icon="ep:search"></span> <span>标题</span>
                                </MDinput>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>图片hover效果</span>
                    </div>
                    <div class="component-item">
                        <pan-thumb width="100px" height="100px"
                            image="https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191">
                            vue-element-admin
                        </pan-thumb>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>水波纹 waves v-directive</span>
                    </div>
                    <div class="component-item">
                        <el-button v-waves type="primary">
                            水波纹效果
                        </el-button>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>hover text</span>
                    </div>
                    <div class="component-item">
                        <mallki class-name="mallki-text" text="vue-element-admin" />
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top:50px;">
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Share</span>
                    </div>
                    <div class="component-item" style="height:420px;">
                        <dropdown-menu :items="articleList" style="margin:0 auto;" title="系列文章" />
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import vWaves from "@/directive/waves/index"// 水波纹指令

import { reactive, ref, toRefs } from 'vue'
const validate = (rule: any, value: any, callback: Function) => {
    if (value.length !== 6) {
        callback(new Error('请输入六个字符'))
    } else {
        callback()
    }
}

const data = reactive({
    demo: {
        title: ''
    },
    demoRules: {
        title: [{ required: true, trigger: 'change', validator: validate }]
    },
    articleList: [
        { title: '基础篇', href: 'https://juejin.im/post/59097cd7a22b9d0065fb61d2' },
        { title: '登录权限篇', href: 'https://juejin.im/post/591aa14f570c35006961acac' },
        { title: '实战篇', href: 'https://juejin.im/post/593121aa0ce4630057f70d35' },
        { title: 'vue-admin-template 篇', href: 'https://juejin.im/post/595b4d776fb9a06bbe7dba56' },
        { title: 'v4.0 篇', href: 'https://juejin.im/post/5c92ff94f265da6128275a85' },
        { title: '优雅的使用 icon', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' }
    ]
})
const { demo, demoRules, articleList } = toRefs(data)

</script>

<style scoped lang="scss">
.mixin-components-container {
    background-color: #f0f2f5;
    padding: 30px;
    min-height: calc(100vh - 84px);

    .box-card {
        width: 100%;
    }
}

.component-item {
    min-height: 100px;
}
</style>
