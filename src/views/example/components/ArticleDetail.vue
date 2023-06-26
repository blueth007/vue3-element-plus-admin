<template>
    <div class="createPost-container">
        <el-form ref="postFormRef" :model="postForm" :rules="rules" class="form-container">

            <sticky :z-index="10" :class-name="'sub-navbar ' + postForm.status">
                <CommentDropdown v-model="postForm.comment_disabled" />
                <PlatformDropdown v-model="postForm.platforms" />
                <SourceUrlDropdown v-model="postForm.source_url" />
                <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
                    Publish
                </el-button>
                <el-button v-loading="loading" type="warning" @click="draftForm">
                    Draft
                </el-button>
            </sticky>

            <div class="createPost-main-container">
                <el-row>
                    <Warning />
                    <el-col :span="24">
                        <el-form-item style="margin-bottom: 40px;" prop="title" label="">
                            <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                                Title
                            </MDinput>
                        </el-form-item>

                        <div class="postInfo-container">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label-width="60px" label="Author:" class="postInfo-container-item">
                                        <el-select v-model="postForm.author" :remote-method="getRemoteUserList" filterable
                                            default-first-option remote placeholder="Search user">
                                            <el-option v-for="(item, index) in userListOptions" :key="item + index"
                                                :label="item" :value="item" />
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="10">
                                    <el-form-item label-width="120px" label="Publish Time:" class="postInfo-container-item">
                                        <el-date-picker v-model="displayTime" type="datetime" format="YYYY-MM-DD HH:mm:ss"
                                            placeholder="Select date and time" />
                                    </el-form-item>
                                </el-col>

                                <el-col :span="6">
                                    <el-form-item label-width="90px" label="Importance:" class="postInfo-container-item">
                                        <el-rate v-model="postForm.importance" :max="3"
                                            :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :low-threshold="1"
                                            :high-threshold="3" style="display:inline-block" />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>

                <el-form-item style="margin-bottom: 40px;" label-width="70px" label="Summary:">
                    <el-input v-model="postForm.content_short" :rows="1" type="textarea" class="article-textarea" autosize
                        placeholder="Please enter the content" />
                    <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
                </el-form-item>

                <el-form-item prop="content" style="margin-bottom: 30px;" label="">
                    <!-- <Tinymce ref="editor" v-model="postForm.content" :height="400" /> -->
                    <tinymce ref="editor" v-model="postForm.content" :height="400" />
                </el-form-item>

                <el-form-item prop="image_uri" style="margin-bottom: 30px;" label="">
                    <Upload v-model="postForm.image_uri" />
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import Tinymce from '@/components/Tinymce/index.vue';
import Upload from '@/components/Upload/SingleImage3.vue';
import MDinput from '@/components/MDinput/index.vue';
import Sticky from '@/components/Sticky/index.vue' // 粘性header组件
import { validURL } from '@/utils/validate';
import { fetchArticle } from '@/api/article';
import { searchUser } from '@/api/remote-search';
import Warning from './Warning.vue'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'
import { computed, onBeforeMount, reactive, ref, toRefs } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useRoute } from 'vue-router'
import { useTagsViewStore } from '@/store/tagsView'

const route = useRoute();
const tagsViewStore = useTagsViewStore();
const defaultForm = {
    status: 'draft',
    title: '', // 文章题目
    content: '', // 文章内容
    content_short: '', // 文章摘要
    source_url: '', // 文章外链
    image_uri: '', // 文章图片
    display_time: '' as string | Date, // 前台展示时间
    id: -1,
    platforms: ['a-platform'],
    comment_disabled: false,
    importance: 0,
    author: ""
}

const props = defineProps({
    isEdit: {
        type: Boolean,
        default: false
    }
})

const postFormRef = ref<FormInstance>()

const validateRequire = (rule: any, value: any, callback: Function) => {
    if (value === '') {
        ElMessage({
            message: rule.field + '为必传项',
            type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
    } else {
        callback()
    }
}
const validateSourceUrl = (rule: any, value: any, callback: Function) => {
    if (value) {
        if (validURL(value)) {
            callback()
        } else {
            ElMessage({
                message: '外链url填写不正确',
                type: 'error'
            })
            callback(new Error('外链url填写不正确'))
        }
    } else {
        callback()
    }
}
const data = reactive({
    postForm: Object.assign({}, defaultForm),
    loading: false,
    userListOptions: [],
    rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_url: [{ validator: validateSourceUrl, trigger: 'blur' }]
    },
    tempRoute: {}
})
const { postForm, loading, rules, userListOptions } = toRefs(data)
const contentShortLength = computed(() => {
    return data.postForm.content_short?.length
})

const displayTime = computed({
    // set and get is useful when the data
    // returned by the back end api is different from the front end
    // back end return => "2013-06-25 06:59:25"
    // front end need timestamp => 1372114765000
    get() {
        return (+new Date(data.postForm.display_time))
    },
    set(val) {
        data.postForm.display_time = new Date(val)
    }
})

onBeforeMount(() => {
    if (props.isEdit) {
        const id = route.params && route.params.id
        fetchData(id as string)
    }
    data.tempRoute = Object.assign({}, route)
})

function fetchData(id: number | string) {
    fetchArticle(id).then(response => {
        data.postForm = response.data

        // just for test
        data.postForm.title += `   Article Id:${data.postForm.id}`
        data.postForm.content_short += `   Article Id:${data.postForm.id}`

        // set tagsview title
        setTagsViewTitle()

        // set page title
        setPageTitle()
    }).catch(err => {
        console.log(err)
    })
}

function setTagsViewTitle() {
    const title = 'Edit Article'
    const route = Object.assign({}, data.tempRoute, { title: `${title}-${data.postForm.id}` })
    // store.dispatch('tagsView/updateVisitedView', route)
    tagsViewStore.updateVisitedView(route)
}

function setPageTitle() {
    const title = 'Edit Article'
    document.title = `${title} - ${data.postForm.id}`
}

function submitForm() {
    // console.log("发布文章：",data.postForm)
    postFormRef.value?.validate((valid: any) => {
        if (valid) {
            data.loading = true
            // new promise  post form
            ElNotification({
                title: '成功',
                message: '发布文章成功',
                type: 'success',
                duration: 2000
            })
            data.postForm.status = 'published'
            data.loading = false
        } else {
            console.log('error submit!!')
            return false
        }
    })
}

function draftForm() {
    if (data.postForm.content.length === 0 || data.postForm.title.length === 0) {

        ElMessage({
            message: '请填写必要的标题和内容',
            type: 'warning'
        })
        return
    }

    ElMessage({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
    })
    data.postForm.status = 'draft'
}

function getRemoteUserList(query: any) {
    searchUser(query).then(response => {
        if (!response.data.items) return
        data.userListOptions = response.data.items.map((v: any) => v.name)
    })
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";

.createPost-container {
    position: relative;

    .createPost-main-container {
        padding: 40px 45px 20px 50px;

        .postInfo-container {
            position: relative;
            @include clearfix;
            margin-bottom: 10px;

            .postInfo-container-item {
                float: left;
            }
        }
    }

    .word-counter {
        width: 40px;
        position: absolute;
        right: 10px;
        top: 0px;
    }
}

.article-textarea {
    :deep(textarea) {
        padding-right: 40px;
        resize: none;
        border: none;
        border-radius: 0px;
        border-bottom: 1px solid #bfcbd9;
    }
}

.sub-navbar>div {
    margin: 10px;
}
</style>
