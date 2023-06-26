<template>
    <div class="upload-container">
        <el-button :style="{ background: color, borderColor: color }" size="small" type="primary"
            @click=" dialogVisible = true">
            <span class="iconify mx-1" data-icon="ep:upload-filled"></span> upload
        </el-button>
        <el-dialog v-model="dialogVisible">
            <aside>自动上传upload函数和mockjs有冲突，且 <a href="https://github.com/PanJiaChen/vue-element-admin/issues/445">on-progress
                    无法正常监听作者已知 bug</a>，没有进度条动画。重新改写了 http-request 函数</aside>
            <el-upload :multiple="true" ref="uploadRef" :file-list="fileList" list-type="picture-card"
                :show-file-list="true" :auto-upload="true" :on-remove="handleRemove" :on-success="handleSuccess"
                :on-progress="handleProgess" :on-change="handleChange" :before-upload="beforeUpload"
                class="editor-slide-upload" :http-request="uploadRequest" action="https://httpbin.org/post">
                <el-button size="small" type="primary">
                    Click upload
                </el-button>
            </el-upload>
            <el-button @click="dialogVisible = false">
                Cancel
            </el-button>
            <el-button type="primary" @click="handleSubmit">
                Confirm
            </el-button>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
// import { getToken } from 'api/qiniu'
import { ElMessage } from 'element-plus'
import { reactive, ref, toRefs } from 'vue'
import type { UploadProps, UploadUserFile, UploadInstance } from 'element-plus'
import request from '@/utils/request'
import type { } from 'element-plus'
const uploadRef = ref<UploadInstance>()

const props = defineProps({
    color: {
        type: String,
        default: '#1890ff'
    }
})

const emit = defineEmits(['successCBK'])

const data = reactive({
    dialogVisible: false,
    listObj: {} as any,
    fileList: [] as any
})

const files = ref<UploadUserFile[]>([])

const { dialogVisible, fileList } = toRefs(data)
function checkAllSuccess() {
    return Object.keys(data.listObj).every(item => data.listObj[item].hasSuccess)
}
const uploadRequest = (param: any) => {
    const formData = new FormData()
    formData.append('file', param.file)
    data.fileList.some((item: any) => {
        if (item.uid === param.file.uid) {
            item.status = 'uploading'
        }
    })
    request({
        url: param.action, method: param.method, data: formData,
    }).then((response: any) => {
        ElMessage({ type: 'success', message: '上传成功' })
        const uid = param.file.uid
        data.fileList.some((item: any) => {
            if (item.uid === param.file.uid) {
                item.status = 'success'
            }
        })
        const objKeyArr = Object.keys(data.listObj)
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
            if (data.listObj[objKeyArr[i]].uid === uid) {
                data.listObj[objKeyArr[i]].url = response.files.file
                data.listObj[objKeyArr[i]].hasSuccess = true
            }
        }
    })
}

function handleSubmit() {

    // upLoadMyself().// 自定义手动上传
    //     then(() => {
    //         const arr = Object.keys(data.listObj).map(v => data.listObj[v]) //???
    //         emit('successCBK', arr)
    //          console.log("arr:", arr)
    //         data.listObj = {}
    //         data.fileList = []
    //         data.dialogVisible = false
    //     })

    //重新定义后的自动上传
    if (!checkAllSuccess()) {
        ElMessage('Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!')
        return
    }
    const arr = Object.keys(data.listObj).map(v => data.listObj[v]) //???
    emit('successCBK', arr)
    data.listObj = {}
    data.fileList = []
    data.dialogVisible = false
}


const handleSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    //console.log("scuess:", response, uploadFile)
    //重新定义上传函数后失效
}
function handleRemoved(file: any) {
    const uid = file.uid
    const objKeyArr = Object.keys(data.listObj)
    for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (data.listObj[objKeyArr[i]].uid === uid) {
            delete data.listObj[objKeyArr[i]]
            return
        }
    }
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
 
    handleRemoved(uploadFile.raw)
    data.fileList = uploadFiles
}
//blob 转dataUrl
function filetoDataURL(file: File, fn: Function) {
    var reader = new FileReader();
    reader.onloadend = function (e: any) {
        fn(e.target.result);
    };
    reader.readAsDataURL(file);
};
async function upLoadMyself() {
    for (const item of files.value) {
        await new Promise<void>((resolve) => {
            filetoDataURL(item.raw as File, (url: string) => {
                const fileItem = {
                    hasSuccess: "success",
                    name: item.name,
                    uid: item.uid,
                    url,
                };
                data.listObj[item.uid as number] = fileItem;
                data.fileList.push(fileItem);
                resolve();
            });
        });
    }
}
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
     if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    const _URL = window.URL || window.webkitURL
    const fileName = rawFile.uid
    data.listObj[fileName] = {}
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(rawFile)
        img.onload = function () {
            data.listObj[fileName] = {
                hasSuccess: false, uid: rawFile.uid,
                width: img.width,
                height: img.height
            }
        }
        resolve(true)
    })
}

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
 
    data.fileList = uploadFiles
}
const handleProgess: UploadProps['onProgress'] = (event, file, fileList) => {
   // console.log("onProgress:", event, file, fileList)
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
    margin-bottom: 20px;

    :deep(.el-upload-list--picture-card) {
        width: 100%;
    }

    :deep(.el-upload--picture-card) {
        width: 100%;
    }


    :deep(.el-upload-list--picture-card .el-upload-list__item-thumbnail) {
        object-fit: fill;
    }
}
</style>

