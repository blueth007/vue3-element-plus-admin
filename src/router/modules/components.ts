import Layout from "@/layout/index.vue";

import type { RouterItem } from "../index";
const componentsRouter: RouterItem = {
  path: "/components",
  component: Layout,
  redirect: "noRedirect",
  name: "ComponentDemo",
  meta: {
    title: "Components",
    icon: "component",
  },
  children: [
    {
      path: "tinymce",
      component: () => import("@/views/components-demo/tinymceView.vue"),
      name: "TinymceDemo",
      meta: { title: "Tinymce" },
    },
    {
      path: "markdown",
      component: () => import("@/views/components-demo/markdownView.vue"),
      name: "MarkdownDemo",
      meta: { title: "Markdown" },
    },
    {
      path: "json-editor",
      component: () => import("@/views/components-demo/jsonEditorView.vue"),
      name: "JsonEditorDemo",
      meta: { title: "JSON Editor" },
    },
    {
      path: "split-pane",
      component: () => import("@/views/components-demo/vueSplitpaneView.vue"),
      name: "SplitpaneDemo",
      meta: { title: "SplitPane" },
    },
    {
      path: "avatar-upload",
      component: () => import("@/views/components-demo/avatarUploadView.vue"),
      name: "AvatarUploadDemo",
      meta: { title: "Upload" },
    },
    {
      path: "dropzone",
      component: () => import("@/views/components-demo/dropzoneView.vue"),
      name: "DropzoneDemo",
      meta: { title: "Dropzone" },
    },
    {
      path: "sticky",
      component: () => import("@/views/components-demo/stickyView.vue"),
      name: "StickyDemo",
      meta: { title: "Sticky" },
    },
    {
      path: "count-to",
      component: () => import("@/views/components-demo/countToView.vue"),
      name: "CountToDemo",
      meta: { title: "Count To" },
    },
    {
      path: "mixin",
      component: () => import("@/views/components-demo/mixinView.vue"),
      name: "ComponentMixinDemo",
      meta: { title: "Component Mixin" },
    },
    {
      path: "back-to-top",
      component: () => import("@/views/components-demo/backToTopView.vue"),
      name: "BackToTopDemo",
      meta: { title: "Back To Top" },
    },
    {
      path: "drag-dialog",
      component: () => import("@/views/components-demo/dragDialogView.vue"),
      name: "DragDialogDemo",
      meta: { title: "Drag Dialog" },
    },
    {
      path: "drag-select",
      component: () => import("@/views/components-demo/dragSelectView.vue"),
      name: "DragSelectDemo",
      meta: { title: "Drag Select" },
    },
    {
      path: "dnd-list",
      component: () => import("@/views/components-demo/dndListView.vue"),
      name: "DndListDemo",
      meta: { title: "Dnd List" },
    },
    {
      path: "drag-kanban",
      component: () => import("@/views/components-demo/dragKanbanView.vue"),
      name: "DragKanbanDemo",
      meta: { title: "Drag Kanban" },
    },
  ],
};

export default componentsRouter;
