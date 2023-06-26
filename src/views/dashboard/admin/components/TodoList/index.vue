<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <input class="new-todo" autocomplete="off" placeholder="Todo List" @keyup.enter="addTodo" />
    </header>
    <!-- main section -->
    <section v-show="todos.length" class="main">
      <input id="toggle-all" :checked="allChecked" class="toggle-all" type="checkbox" @change="toggleAll({ done: !allChecked })" />
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <todo
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          @toggleTodo="toggleTodo"
          @editTodo="editTodo"
          @deleteTodo="deleteTodo"
        />
      </ul>
    </section>
    <!-- footer -->
    <footer v-show="todos.length" class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ pluralize(remaining, "item") }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in Object.keys(filters)" :key="key">
          <a :class="{ selected: visibility === val }" @click.prevent="visibility = val">{{ capitalize(val) }}</a>
        </li>
      </ul>
      <!-- <button class="clear-completed" v-show="todos.length > remaining" @click="clearCompleted">Clear completed</button> -->
    </footer>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Todo from "./Todo.vue";

const STORAGE_KEY = "todos";
type TTodo = {
  text: string;
  done: boolean;
};
const filtersDefault: any = {
  all: (todos: Array<TTodo>) => todos,
  active: (todos: Array<TTodo>) => todos.filter((todo: TTodo) => !todo.done),
  completed: (todos: Array<TTodo>) => todos.filter((todo: TTodo) => todo.done),
};
const defalutList: Array<TTodo> = [
  { text: "star this repository", done: false },
  { text: "fork this repository", done: false },
  { text: "follow author", done: false },
  { text: "vue-element-admin", done: true },
  { text: "vue", done: true },
  { text: "element-ui", done: true },
  { text: "axios", done: true },
  { text: "webpack", done: true },
];

const visibility = ref("all"),
  filters = ref(filtersDefault),
  todos = ref(defalutList);

const pluralize = (n: number, w: string) => (n === 1 ? w : w + "s");
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const allChecked = computed(() => todos.value.every((todo) => todo.done)),
  filteredTodos = computed(() => filtersDefault[visibility.value](todos.value)),
  remaining = computed(() => todos.value.filter((todo) => !todo.done).length);

function setLocalStorage() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value));
}
function addTodo(e: any) {
  const text = e.target.value;
  if (text.trim()) {
    todos.value.push({
      text,
      done: false,
    });
    setLocalStorage();
  }
  e.target.value = "";
}
function toggleTodo(val: TTodo) {
  val.done = !val.done;
  setLocalStorage();
}
function deleteTodo(todo: TTodo) {
  todos.value.splice(todos.value.indexOf(todo), 1);
  setLocalStorage();
}
function editTodo({ todo, value }: { todo: TTodo; value: string }) {
  todo.text = value;
  setLocalStorage();
}
function clearCompleted() {
  todos.value = todos.value.filter((todo) => !todo.done);
  setLocalStorage();
}
function toggleAll({ done }: { done: boolean }) {
  todos.value.forEach((todo) => {
    todo.done = done;
    setLocalStorage();
  });
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
