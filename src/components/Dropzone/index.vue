<template>
    <div :id="id" :ref="id" :action="url" class="dropzone">
        <input type="file" name="file">
    </div>
</template>

<script setup lang="ts">
import Dropzone from "dropzone"
import 'dropzone/dist/dropzone.css'
// import { getToken } from 'api/qiniu';
import { onMounted, onUnmounted, reactive, watch } from 'vue'

const props = defineProps({
    id: {
        type: String,
        required: true,
        default: 'myZone'
    },
    url: {
        type: String,
        required: true
    },
    clickable: {
        type: Boolean,
        default: true
    },
    defaultMsg: {
        type: String,
        default: '上传图片'
    },
    acceptedFiles: {
        type: String,
        default: ''
    },
    thumbnailHeight: {
        type: Number,
        default: 200
    },
    thumbnailWidth: {
        type: Number,
        default: 200
    },
    showRemoveLink: {
        type: Boolean,
        default: true
    },
    maxFilesize: {
        type: Number,
        default: 2
    },
    maxFiles: {
        type: Number,
        default: 3
    },
    autoProcessQueue: {
        type: Boolean,
        default: true
    },
    useCustomDropzoneOptions: {
        type: Boolean,
        default: false
    },
    defaultImg: {
        default: '',
        type: [String, Array<string>]
    },
    couldPaste: {
        type: Boolean,
        default: false
    }
})

const data = reactive<{ dropzone: Dropzone | null, initOnce: Boolean }>({
    dropzone: null,
    initOnce: true
})

watch(() => props.defaultImg, (val) => {
    if (val.length === 0) {
        data.initOnce = false
        return
    }
    if (!data.initOnce) return
    initImages(data.dropzone as Dropzone, val)
    data.initOnce = false
})

onMounted(() => {
    initZone()
    bindFuncion()
})

onUnmounted(() => {
    document.removeEventListener('paste', pasteImg)
    data.dropzone?.destroy()
})

function removeAllFiles() {
    data.dropzone?.removeAllFiles(true)
}

function processQueue() {
    data.dropzone?.processQueue()
}

function pasteImg(event: any) {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items
    if (items[0].kind === 'file') {
        data.dropzone?.addFile(items[0].getAsFile())
    }
}
//不知函数作用 没有找到相应的 mockfile 和previewElement作用
function initImages(myDropzone: Dropzone, val = props.defaultImg) {
    if (!val) return
    if (Array.isArray(val)) {
        if (val.length === 0) return
        val.map((v: string, i: number) => {
            let mockFile = { name: "Filename", size: 12345 };
            let callback = undefined; // Optional callback when it's done
            let crossOrigin = undefined; // Added to the `img` tag for crossOrigin handling
            let resizeThumbnail = false; // Tells Dropzone whether it should resize the image first
            myDropzone.displayExistingFile(mockFile, v, callback, crossOrigin, resizeThumbnail);

        })
        myDropzone.options.maxFiles = props.maxFiles - val.length;
        data.initOnce = false
        return true
    } else {
        if (props.defaultImg) {
            let mockFile = { name: "Filename", size: 12345 };
            let callback = undefined; // Optional callback when it's done
            let crossOrigin = undefined; // Added to the `img` tag for crossOrigin handling
            let resizeThumbnail = false; // Tells Dropzone whether it should resize the image first
            myDropzone.displayExistingFile(mockFile, val, callback, crossOrigin, resizeThumbnail);
            // If you use the maxFiles option, make sure you adjust it to the
            // correct amount:
            let fileCountOnServer = 1; // The number of files already uploaded
            myDropzone.options.maxFiles = props.maxFiles - fileCountOnServer;
        }
        data.initOnce = false
    }

}

const initZone = () => {
    // Dropzone.autoDiscover = false;
    const element = document.getElementById(props.id)
    const {
        clickable,
        thumbnailWidth,
        thumbnailHeight,
        maxFiles,
        maxFilesize,
        showRemoveLink,
        acceptedFiles,
        autoProcessQueue,
        defaultMsg
    } = props
    data.dropzone = new Dropzone(element as HTMLElement, {
        url: "https://httpbin.org/post",
        clickable,
        thumbnailWidth,
        thumbnailHeight,
        maxFiles,
        maxFilesize,
        addRemoveLinks: showRemoveLink,
        acceptedFiles,
        autoProcessQueue,
        dictDefaultMessage: '<i style="margin-top: 3em;display: inline-block" class="material-icons">' + defaultMsg + '</i><br>Drop files here to upload',
        dictMaxFilesExceeded: '最大文件数量：' + maxFiles,
        previewTemplate: '<div class="dz-preview dz-file-preview">  <div class="dz-image" style="width:' + thumbnailWidth + 'px;height:' + thumbnailHeight + 'px" ><img style="width:' + thumbnailWidth + 'px;height:' + thumbnailHeight + 'px" data-dz-thumbnail /></div>  <div class="dz-details"><div class="dz-size"><span data-dz-size></span></div> <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>  <div class="dz-error-message"><span data-dz-errormessage></span></div>  <div class="dz-success-mark"> <i class="material-icons">done</i> </div>  <div class="dz-error-mark"><i class="material-icons">error</i></div></div>',
        dictCancelUpload: "取消上传 / Cancel upload",
        dictRemoveFile: "移除文件 / Remove file",
        init: function () {
            initImages(this)
        },
        accept: (file: Dropzone.DropzoneFile, done: Function) => {
            if (data.dropzone?.getAcceptedFiles().some(item => {
                return item.name == file.name
            })) {
                data.dropzone?.removeFile(file)
            }
            /* 七牛*/
            // const token = this.$store.getters.token;
            // getToken(token).then(response => {
            //   file.token = response.data.qiniu_token;
            //   file.key = response.data.qiniu_key;
            //   file.url = response.data.qiniu_url;
            //   done();
            // })
            done()
        },
        sending: (file, xhr, formData) => {
            // formData.append('token', file.token);
            // formData.append('key', file.key);
            data.initOnce = false
        },

    })
}

const $emit = defineEmits(['dropzone-success', 'dropzone-fileAdded', 'dropzone-removedFile', 'dropzone-error', 'dropzone-successmultiple'])
const bindFuncion = () => {
    if (props.couldPaste) {
        document.addEventListener('paste', pasteImg)
    }

    data.dropzone?.on('success', file => {
        $emit('dropzone-success', file, data.dropzone?.element)
    })
    data.dropzone?.on('addedfile', file => {
        $emit('dropzone-fileAdded', file)
    })
    data.dropzone?.on('removedfile', file => {
        $emit('dropzone-removedFile', file)
    })
    data.dropzone?.on('error', (file: Dropzone.DropzoneFile, error: any, xhr: XMLHttpRequest) => {
        $emit('dropzone-error', file, error, xhr)
    })
    data.dropzone?.on('successmultiple', (file: Dropzone.DropzoneFile, error: any, xhr: XMLHttpRequest) => {
        $emit('dropzone-successmultiple', file, error, xhr)
    })
}
</script>

<style scoped>
.dropzone {
    border: 2px solid #E5E5E5;
    font-family: 'Roboto', sans-serif;
    color: #777;
    transition: background-color .2s linear;
    padding: 5px;
}

.dropzone:hover {
    background-color: #F6F6F6;
}

i {
    color: #CCC;
}

.dropzone .dz-image img {
    width: 100%;
    height: 100%;
}

.dropzone input[name='file'] {
    display: none;
}

.dropzone .dz-preview .dz-image {
    border-radius: 0px;
}

.dropzone .dz-preview:hover .dz-image img {
    transform: none;
    filter: none;
    width: 100%;
    height: 100%;
}

.dropzone .dz-preview .dz-details {
    bottom: 0px;
    top: 0px;
    color: white;
    background-color: rgba(33, 150, 243, 0.8);
    transition: opacity .2s linear;
    text-align: left;
}

.dropzone .dz-preview .dz-details .dz-filename span,
.dropzone .dz-preview .dz-details .dz-size span {
    background-color: transparent;
}

.dropzone .dz-preview .dz-details .dz-filename:not(:hover) span {
    border: none;
}

.dropzone .dz-preview .dz-details .dz-filename:hover span {
    background-color: transparent;
    border: none;
}

.dropzone .dz-preview .dz-remove {
    position: absolute;
    z-index: 30;
    color: white;
    margin-left: 15px;
    padding: 10px;
    top: inherit;
    bottom: 15px;
    border: 2px white solid;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 1.1px;
    opacity: 0;
}

.dropzone .dz-preview:hover .dz-remove {
    opacity: 1;
}

.dropzone .dz-preview .dz-success-mark,
.dropzone .dz-preview .dz-error-mark {
    margin-left: -40px;
    margin-top: -50px;
}

.dropzone .dz-preview .dz-success-mark i,
.dropzone .dz-preview .dz-error-mark i {
    color: white;
    font-size: 5rem;
}
</style>
