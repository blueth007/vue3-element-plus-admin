<template>
    <div class="components-container">
        <aside>
            Based on <a class="link-type" href="https://github.com/rowanwins/vue-dropzone"> dropzone </a>.
            Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose
            encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.
            <p>rebulid component ,it can upload remote url.新增远程图片地址</p>
        </aside>
        <div class="editor-container">
            <dropzone id="myVueDropzone" url="https://httpbin.org/post" @dropzone-removedFile="dropzoneR"
                defaultImg="https://simg.open-open.com/show/dc4e62e2cb7c5d861c890540541930a5.png"
                @dropzone-success="dropzoneS" />
        </div>
    </div>
</template>

<script setup lang="ts">

function dropzoneS(file: any) {
    console.log(file)
    // this.$message({ message: 'Upload success', type: 'success' })
}
function dropzoneR(file: any) {
    console.log(file)
    // this.$message({ message: 'Delete success', type: 'success' })
}
</script>

<style scoped></style>