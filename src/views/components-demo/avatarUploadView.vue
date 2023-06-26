<template>
    <div class="components-container">
        <aside>This is based on
            <a class="link-type" href="//github.com/dai-siki/vue-image-crop-upload"> vue-image-crop-upload</a>.
            Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it
            myself, and if you are going to use it, it is better to use official version.
            <p>vue-split-pane has not version for vue2.so i build myself upload component</p>
        </aside>
        <pan-thumb :image="image" />
        <el-button type="primary" style="position: absolute;bottom: 15px;margin-left: 40px;"
            @click="imagecropperShow = true">
            <span class="iconify el-icon" data-icon="ep:upload"></span>
            <span>Change Avatar</span>
        </el-button>
        <image-cropper v-show="imagecropperShow" :key="imagecropperKey" :width="300" :height="300"
            url="https://httpbin.org/post" lang-type="zh" @close="close" @crop-upload-success="cropSuccess" />
    </div>
</template>

<script setup lang="ts">

import { reactive, toRefs } from 'vue';
// import myUpload from 'vue-image-crop-upload';

const data = reactive({
    imagecropperShow: false,
    imagecropperKey: 0,
    image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
})

const { imagecropperKey, image, imagecropperShow } = toRefs(data)

function cropSuccess(resData: any) {
     data.imagecropperShow = false
    data.imagecropperKey = data.imagecropperKey + 1
    data.image = resData.files.avatar
}
function close() {
    data.imagecropperShow = false
}
const cropFail = (status: any, field: any) => {
    console.log('-------- upload fail --------');
    console.log(status);
    console.log('field: ' + field);
}
</script>

<style scoped></style>