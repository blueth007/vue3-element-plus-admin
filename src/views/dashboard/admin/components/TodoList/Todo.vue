<template>
  <li :class="{ completed: todo.done, editing: editing }" class="todo">
    <div class="view">
      <input :checked="todo.done" class="toggle" type="checkbox" @change="toggleTodo(todo)" />
      <label @dblclick="editing = true" v-text="todo.text" />
      <button class="destroy" @click="deleteTodo(todo)" />
    </div>
    <input v-show="editing" v-focus="editing" :value="todo.text" class="edit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" @blur="doneEdit" />
  </li>
</template>

<script lang="ts" setup>
import { ref, nextTick } from "vue";
/*
   directives: {
    focus(el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  } */
const vFocus = {
  mounted: (el: any) => {
    if (editing.value) {
      nextTick(() => {
        el.focus();
      });
    }
  },
};
const props = defineProps({
  todo: {
    type: Object,
    default: function () {
      return {};
    },
  },
});
const $emit = defineEmits(["deleteTodo", "editTodo", "toggleTodo"]);
const editing = ref(false);

function deleteTodo(todo: any) {
  $emit("deleteTodo", todo);
}
function editTodo({ todo, value }: { todo: any; value: any }) {
  $emit("editTodo", { todo, value });
}
function toggleTodo(todo: any) {
  $emit("toggleTodo", todo);
}
function doneEdit(e: any) {
  const value = e.target.value.trim();
  const { todo } = props;
  if (!value) {
    deleteTodo({
      todo,
    });
  } else if (editing.value) {
    editTodo({
      todo,
      value,
    });
    editing.value = false;
  }
}
function cancelEdit(e: any) {
  e.target.value = props.todo.text;
  editing.value = false;
}
</script>
