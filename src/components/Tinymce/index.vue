<template>
  <div :class="{ fullscreen: fullscreen }" class="tinymce-container" :style="{ width: containerWidth }">
    <Editor v-model="myValue" :init="init" :disabled="disabled" :id="tinymceId" data-version="tinymce5.10.6"></Editor>
    <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div>
  </div>
</template>

<script setup lang="ts">
//JS部分
//在js中引入所需的主题和组件
import tinymce from "tinymce/tinymce";
import "tinymce/skins/content/default/content.css";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
import "tinymce/themes/silver/theme";
import "tinymce/icons/default"; //引入编辑器图标icon，不引入则不显示对应图标
// import "tinymce/models/dom";
//在TinyMce.vue中接着引入相关插件
import "tinymce/icons/default/icons";

// 引入编辑器插件（基本免费插件都在这儿了）
import config from "./config";
import "./config/plugins";

import { reactive, ref, onMounted, watch, computed, nextTick } from "vue";

const emits = defineEmits(["getContent", 'update:modelValue']);
//这里我选择将数据定义在props里面，方便在不同的页面也可以配置出不同的编辑器，当然也可以直接在组件中直接定义
const props = defineProps({

  baseUrl: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: function () {
      return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
    }
  },
  modelValue: {
    type: String,
    default: ''
  },
  toolbar: {
    type: Array,
    required: false,
    default() {
      return []
    }
  },
  menubar: {
    type: String,
    default: 'file edit insert view format table'
  },
  height: {
    type: [Number, String],
    required: false,
    default: 360
  },
  width: {
    type: [Number, String],
    required: false,
    default: 'auto'
  }
});
//用于接收外部传递进来的富文本
const myValue = ref(props.modelValue);
const tinymceId = ref<string>(props.id);

const fullscreen = ref(false)
//定义一个对象 init初始化
const init = reactive({
  selector: "#" + tinymceId.value, //富文本编辑器的id,
  ...config,
  //图片上传
  images_upload_credentials: true,
  // visualblocks_default_state: true,
  automatic_uploads: true, //false 会转为本地base64
  content_css: ["/tinymce/skins/content/document/content.min.css"], //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
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
 
  // // 文件上传
  // file_picker_callback: (callback: any, value: any, meta: any) => {
  //     // Provide file and text for the link dialog
  //     if (meta.filetype == 'file') {
  //         callback('mypage.html', { text: 'My text' });
  //     }

  //     // Provide image and alt text for the image dialog
  //     if (meta.filetype == 'image') {
  //         callback('myimage.jpg', { alt: 'My alt text' });
  //     }

  //     // Provide alternative source and posted for the media dialog
  //     if (meta.filetype == 'media') {
  //         callback('movie.mp4', { source2: 'alt.ogg', poster: 'image.jpg' });
  //     }
  // }
});

//监听外部传递进来的的数据变化
watch(
  () => props.modelValue,
  () => {
    myValue.value = props.modelValue;
    emits("getContent", myValue.value);
  }
);
//监听富文本中的数据变化
watch(
  () => myValue.value,
  () => {
    emits("update:modelValue", myValue.value);
  }
);
const containerWidth = computed(() => {
  const width = props.width
  if (/^[\d]+(\.[\d]+)?$/.test(width + '')) { // matches `100`, `'100'`
    return `${width}px`
  }
  return width
})
//在onMounted中初始化编辑器
onMounted(() => {
  tinymce.init({});
  //delete localStorage tinymce-autosave*
  var regex = new RegExp("^tinymce-autosave");
  for (var key in localStorage) {
    if (regex.test(key)) {
      localStorage.removeItem(key);
    }
  }
});

const imageSuccessCBK = (arr: Array<any>) => {
  // 获取编辑器实例
  var editor = tinymce.get(tinymceId.value);
  arr.forEach(v => {
    // 插入图像标签
    editor.insertContent('<img src="' + v.url + '">');
    // window.tinymce.get( tinymceId.value).insertContent(`<img class="wscnph" src="${v.url}" >`)
  })
}

</script>

<style scoped>
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
  z-index: 1
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>

