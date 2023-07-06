<template>
    <el-upload :data="dataObj" :multiple="true" :before-upload="beforeUpload" action="https://upload.qbox.me" drag>
        <i class="el-icon-upload" />
        <div class="el-upload__text">
            将文件拖到此处，或<em>点击上传</em>
        </div>
    </el-upload>
</template>

<script setup lang="ts">
import { getToken } from '@/api/qiniu'
// 获取七牛token 后端通过Access Key,Secret Key,bucket等生成token
// 七牛官方sdk https://developer.qiniu.com/sdk#official-sdk
import { reactive, toRefs } from 'vue'
import type { UploadProps } from 'element-plus'

const data = reactive({
    dataObj: { token: '', key: '' },
    image_uri: [],
    fileList: []
})
const { dataObj, image_uri, fileList } = toRefs(data)


const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {



    return new Promise((resolve, reject) => {
        getToken().then(response => {
            const key = response.data.qiniu_key
            const token = response.data.qiniu_token
            data.dataObj.token = token
            data.dataObj.key = key
            resolve(true)
            return true
        }).catch(err => {
            console.log(err)
            reject(false)
            return false
        })
    })
}


</script>
