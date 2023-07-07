<template>
  <div class="components-container">
    <aside>
      Rich text is a core feature of the management backend, but at the same time it is a place with lots of pits. In the
      process of selecting rich
      texts, I also took a lot of detours. The common rich texts on the market have been basically used, and I finally
      chose Tinymce. See the more
      detailed rich text comparison and introduction.
      <a target="_blank" class="link-type"
        href="https://panjiachen.github.io/vue-element-admin-site/component/rich-editor.html">Documentation</a>
      <p>this project base on <strong> tinymce@5.x </strong> and add some plugins in plublic file</p>
      <p><strong>this is dynamicLoadScript Vue Component . if you want to importWord/exportWord ,please open link <a
            href="#/example/create">create Article</a></strong></p>
    </aside>
    <div>
      <tinymce v-model="content" :height="600" @getContent="getContent" />
    </div>
    <div class="editor-content" v-html="content"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import Tinymce from "@/components/Tinymce/dyIndex.vue";

const content = ref(
  `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`
);
const getContent = (v: string) => {
  content.value = v;
};
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>
