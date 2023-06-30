export default {
  //selector: "#tinydemo2",
  language_url: "/tinymce/langs/zh_CN.js", //汉化路径是自定义的，一般放在public或static里面
  language: "zh_CN",
  skin_url: "/tinymce/skins/ui/oxide", //皮肤s
  placeholder: "在这里输入文字......",
  branding: false, //隐藏右下角技术支持
  plugins:
    "preview exportWord  searchreplace   quickbars   autolink directionality visualblocks visualchars fullscreen image link media template pagebreak  code  codesample table   nonbreaking anchor insertdatetime letterspacing  advlist lists wordcount  help  autosave   tpImportword print  ",
  toolbar:
    "undo redo restoredraft    |bold italic underline strikethrough  |  fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent  numlist bullist checklist | forecolor backcolor lineheight letterspacing |  table tableprops | blockquote subscript superscript removeformat | \
     cut copy paste pastetextlink anchor    |\
image mediacharmap bdmap|  axupimgs   tpImportword  exportWord   | pagebreak insertdatetime  preview  print  fullscreen code | autosave",

  external_plugins: {
    tpImportword: "/tinymce/plugins/tpImportword/plugin.min.js",
    bdmap: "/tinymce/plugins/bdmap/plugin.js",
    axupimgs: "/tinymce/plugins/axupimgs/plugin.js",
    exportWord: "/tinymce/plugins/exportword/plugin.min.js",
    letterspacing: "/tinymce/plugins/letterspacing/plugin.min.js",
    // powerpaste: "/tinymce/plugins/tinymce-all-in-one-yctmp/plugins/powerpaste/plugin.min.js", //搜tinymce-all-in-one-yctmp 需要flash
  },
  height: 600, //编辑器高度
  min_height: 500,
  /*content_css: [ //可设置编辑区内容展示的css，谨慎使用
  '/static/reset.css',
  '/static/ax.css',
  '/static/css.css',
 ],*/
  //quickbars_selection_toolbar: "", // 'bold italic | link h2 h3 blockquote',  // 快速工具栏
  plugin_preview_width: 375, // 预览宽度
  plugin_preview_height: 668, // 预览宽度
  // 对话框支持拖动
  draggable_modal: true,
  // 开启拖入功能，true：禁止拖入
  paste_block_drop: true,
  block_unsupported_drop: false,
  // 允许粘贴图片
  paste_data_images: true,
  //需要powerpaste插件
  //powerpaste_word_import: "merge", // 参数可以是propmt, merge, clear,下面有函数确认
  powerpaste_html_import: "merge", // propmt, merge, clear
  powerpaste_allow_local_images: true, //允许带图片
  //font_size_formats: "56px 48px 34px 32px 29px 24px 21px 20px 18px 16px 14px 12px 10px 8px 22px",
  //font_size_formats: "12pt 14pt 16pt 18pt 20pt 24pt 36pt",
  fontsize_formats:
    "初号=56px 小初=48px 一号=34px 小一=32px 二号=29px 小二=24px 三号=21px 小三=20px 四号=18px 小四=16px 五号=14px 小五=12px 六号=10px 8px=8px",
  line_height_formats: "1 1.2 1.4 1.6 1.5 2",
  font_family_formats:
    "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;知乎配置=BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;小米配置=Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif",
  font_formats: `
      微软雅黑=微软雅黑;
      宋体=宋体;
      黑体=黑体;
      仿宋=仿宋;
      楷体=楷体;
      华文楷体=华文楷体;
      隶书=隶书;
      幼圆=幼圆;
      Andale Mono=andale mono,times;
      Arial=arial, helvetica,
      sans-serif;
      Arial Black=arial black, avant garde;
      Book Antiqua=book antiqua,palatino;
      Comic Sans MS=comic sans ms,sans-serif;
      Courier New=courier new,courier;
      Georgia=georgia,palatino;
      Helvetica=helvetica;
      Impact=impact,chicago;
      Symbol=symbol;
      Tahoma=tahoma,arial,helvetica,sans-serif;
      Terminal=terminal,monaco;
      Times New Roman=times new roman,times;
      Trebuchet MS=trebuchet ms,geneva;
      Verdana=verdana,geneva;
      Webdings=webdings;
      Wingdings=wingdings,zapf dingbats`,
  //content的css样式：
  content_style: `body { font-family:微软雅黑,Arial,sans-serif; font-size:16px; } 
     `,
  indent_use_margin: true,
  contextmenu: "copy paste |   image inserttable | cell row column deletetable",

  link_list: [
    { title: "预置链接1", value: "http://www.tinymce.com" },
    { title: "预置链接2", value: "http://tinymce.ax-z.cn" },
  ],
  image_list: [
    { title: "预置图片1", value: "https://www.tiny.cloud/images/glyph-tinymce@2x.png" },
    { title: "预置图片2", value: "https://www.baidu.com/img/bd_logo1.png" },
  ],
  image_class_list: [
    { title: "None", value: "" },
    { title: "Some class", value: "class-name" },
  ],
  //importcss_append: true,
  //自定义文件选择器的回调内容
  file_picker_callback: function (callback: any, value: any, meta: any) {
    if (meta.filetype === "file") {
      callback("https://www.baidu.com/img/bd_logo1.png", { text: "My text" });
    }
    if (meta.filetype === "image") {
      callback("https://www.baidu.com/img/bd_logo1.png", { alt: "My alt text" });
    }
    if (meta.filetype === "media") {
      callback("movie.mp4", { source2: "alt.ogg", poster: "https://www.baidu.com/img/bd_logo1.png" });
    }
  },
  //为内容模板插件提供预置模板
  templates: [
    { title: "模板1", description: "介绍文字1", content: "模板内容" },
    {
      title: "模板2",
      description: "介绍文字2",
      content: '<div class="mceTmpl"><span class="cdate">CDATE</span>，<span class="mdate">MDATE</span>，我的内容</div>',
    },
  ],
  bdmap_options: {
    width: 360,
    height: 360,
    //  outputIframe: "https://unpkg.com/@npkg/tinymce-plugins",
    outputIframe: "https://unpkg.com/@npkg/tinymce-plugins/plugins/bdmap/bd.html", //vue 版
    apiKey: "Go9SQWsVYtKy74jrHVsGIwzHTN49kF9T",
    // apiKey: "M7GFlg9ApjGlQDFh8gHDaxxzLu7KfuSc",
  },
  //content_security_policy: "script-src *;",
  extended_valid_elements: "script[src]",
  //
  paste_retain_style_properties: "all",
  paste_word_valid_elements: "*[*]",
  template_cdate_format: "[CDATE: %m/%d/%Y : %H:%M:%S]",
  template_mdate_format: "[MDATE: %m/%d/%Y : %H:%M:%S]",
  //时间预设
  insertdatetime_formats: ["%H点%M分", "%H:%M:%S", "%Y年%m月%d日", "%Y-%m-%d %H:%M", "%Y/%m/%d %H:%M", "%Y-%m-%d %H:%M:%S", "%Y/%m/%d %H:%M:%S"],
  autosave_ask_before_unload: false,
  toolbar_mode: "wrap",
  deprecation_warnings: false,
  default_link_target: "_blank",
  powerpaste_word_import: () =>
    new Promise((resolve) => {
      // use a native confirm dialog to prompt the user to choose between clean and merge
      if (confirm("Would you like to keep formatting?")) {
        resolve("merge");
      } else {
        resolve("clean");
      }
    }),
  // images_upload_base_path: "/upload",
  // images_upload_handler: function (blobInfo, succFun, failFun) {
  //console.log(blobInfo, succFun, failFun);
  //// succFun("/demo/images/img.jpg");
  // },
  //icons: "ax-color",
};
