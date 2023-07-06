<template>
    <div :class="{ fullscreen: fullscreen }" class="tinymce-container" :style="{ width: containerWidth }">
        <textarea :id="tinymceId" class="tinymce-textarea" />
        <div class="editor-custom-btn-container">
            <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
import { ElMessage } from "element-plus";
import editorImage from "./components/EditorImage.vue";
import config from './config'
import load from "./dynamicLoadScript";
import { computed, nextTick, onActivated, onDeactivated, onMounted, onUnmounted, onUpdated, reactive, toRefs, watch } from "vue";
import dyload from "@/utils/loadDymoicScipt"

// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
const tinymceCDN =
    "https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/tinymce/5.10.3/tinymce.min.js";
// "https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js";

const props = defineProps({
    id: {
        type: String,
        default: function () {
            return (
                "vue-tinymce-" +
                +new Date() +
                ((Math.random() * 1000).toFixed(0) + "")
            );
        },
    },
    modelValue: {
        type: String,
        default: "",
    },
    toolbar: {
        type: Array,
        required: false,
        default() {
            return [];
        },
    },
    menubar: {
        type: String,
        default: "file edit insert view format table",
    },
    height: {
        type: [Number, String],
        required: false,
        default: 360,
    },
    width: {
        type: [Number, String],
        required: false,
        default: "auto",
    },
})

const data = reactive({
    hasChange: false,
    hasInit: false,
    tinymceId: props.id,
    fullscreen: false,
    languageTypeList: {
        en: "en",
        zh: "zh_CN",
        es: "es_MX",
        ja: "ja",
    },
})

const containerWidth = computed(() => {
    const width = props.width;
    if (/^[\d]+(\.[\d]+)?$/.test(width + '')) {
        // matches `100`, `'100'`
        return `${width}px`;
    }
    return width;
})
const emit = defineEmits(['update:modelValue'])

const { fullscreen, tinymceId } = toRefs(data)
watch(() => props.modelValue, (val) => {
    if (!data.hasChange && data.hasInit) {
        nextTick(() =>
            (<any>window).window.tinymce.get(data.tinymceId).setContent(val || "")
        );
    }
})

onMounted(() => {
    init();
})
onUpdated(() => {
    if ((<any>window).window.tinymce) {
        initTinymce();
    }
}
)
onActivated(() => {
    if ((<any>window).window.tinymce) {
        initTinymce();
    }
})

onDeactivated(() => {
    destroyTinymce();
})

onUnmounted(() => {
    destroyTinymce();
})

function init() {
    // dynamic load tinymce from cdn
    dyload((<any>window).window.tinymce, tinymceCDN, (err: any) => {
        if (err) {
            ElMessage.error(err.message);
            return;
        }

        initTinymce();
    })
    // load(tinymceCDN, (err: any) => {
    //     if (err) {
    //         ElMessage.error(err.message);
    //         return;
    //     }
    //     initTinymce();
    // })
}
function initTinymce() {
    (<any>window).window.tinymce.init({
        selector: `#${data.tinymceId}`,
        ...config,
        body_class: "panel-body ",
        powerpaste_word_import: "clean",
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: "square",
        advlist_number_styles: "default",
        default_link_target: "_blank",
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        //图片上传
        images_upload_handler: async (blobInfo: any, success: any, failure: any) => {
            console.log("images_upload_handler:", blobInfo);
            const isAccord =
                blobInfo.blob().type === "image/jpeg" ||
                blobInfo.blob().type === "image/png" ||
                blobInfo.blob().type === "image/gif" ||
                blobInfo.blob().type === "image/jpg" ||
                blobInfo.blob().type === "image/bmp";
            if (blobInfo.blob().size / 1024 / 1024 > 5) {
                failure("上传失败，图片大小请控制在 5M 以内");
            } else if (blobInfo.blob().type == isAccord) {
                failure("图片格式错误");
            } else {
                var file = blobInfo.blob();
                var reader = new FileReader();
                reader.onload = function (e: Event) {
                    success((e.target as FileReader).result);
                    //success(e.currentTarget.result)
                };
                reader.readAsDataURL(file);
            }
        },
        init_instance_callback: (editor: any) => {
            if (props.modelValue) {
                editor.setContent(props.modelValue);
            }
            data.hasInit = true;
            editor.on("NodeChange Change KeyUp SetContent", () => {
                data.hasChange = true;
                emit("update:modelValue", editor.getContent());
            });
        },
        setup(editor: any) {
            editor.on("FullscreenStateChanged", (e: any) => {
                data.fullscreen = e.state;
            });
        },
        // it will try to keep these URLs intact
        // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
        // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
        convert_urls: false,
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        // images_upload_handler(blobInfo, success, failure, progress) {
        //   progress(0);
        //   const token = _this.$store.getters.token;
        //   getToken(token).then(response => {
        //     const url = response.data.qiniu_url;
        //     const formData = new FormData();
        //     formData.append('token', response.data.qiniu_token);
        //     formData.append('key', response.data.qiniu_key);
        //     formData.append('file', blobInfo.blob(), url);
        //     upload(formData).then(() => {
        //       success(url);
        //       progress(100);
        //     })
        //   }).catch(err => {
        //     failure('出现未知问题，刷新页面，或者联系程序员')
        //     console.log(err);
        //   });
        // },
    });
}
function destroyTinymce() {
    const tinymce = (<any>window).window.tinymce.get(data.tinymceId);
    if (data.fullscreen) {
        tinymce.execCommand("mceFullScreen");
    }

    if (tinymce) {
        tinymce.destroy();
    }
}
function setContent(value: string) {
    (<any>window).window.tinymce.get(data.tinymceId).setContent(value);
}
function getContent() {
    (<any>window).window.tinymce.get(data.tinymceId).getContent();
}
function imageSuccessCBK(arr: Array<any>) {

    console.log("tinymceCBK:", arr);
    arr.forEach((v) => {
        (<any>window).window.tinymce
            .get(data.tinymceId)
            .insertContent(`<img class="wscnph" src="${v.url}" >`);
    });
}


</script>

<style scoped >
.tinymce-container {
    position: relative;
    line-height: normal;
}

.tinymce-container :deep(.mce-fullscreen) {
    z-index: 10000;
}

.tinymce-textarea {
    visibility: hidden;
    z-index: -1;
}

.editor-custom-btn-container {
    position: absolute;
    right: 4px;
    top: 4px;
    z-index: 2;
}

.fullscreen .editor-custom-btn-container {
    z-index: 10000;
    position: fixed;
}

.editor-upload-btn {
    display: inline-block;
}
</style>
