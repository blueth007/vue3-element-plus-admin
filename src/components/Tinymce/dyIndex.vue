<template>
    <div  :class="{ fullscreen: fullscreen }" class="tinymce-container" :style="{ width: containerWidth }">
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

import toolbar from "./config/toolbar";
import load from "./dynamicLoadScript";
import { computed, nextTick, onActivated, onDeactivated, onMounted, onUnmounted, onUpdated, reactive, toRefs, watch } from "vue";
const plugins = ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount']

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
    load(tinymceCDN, (err: any) => {
        if (err) {
           ElMessage.error(err.message);
            return;
        }
        initTinymce();
    })
}
function initTinymce() {

    (<any>window).window.tinymce.init({
        selector: `#${data.tinymceId}`,
        language_url: "/tinymce/langs/zh_CN.js",
        language: data.languageTypeList["zh"],
        height: props.height,
        body_class: "panel-body ",
        object_resizing: false,
        toolbar: props.toolbar.length > 0 ? props.toolbar : toolbar,
        menubar: props.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: "clean",
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: "square",
        advlist_number_styles: "default",
        imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
        default_link_target: "_blank",
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
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
