<script setup lang="ts">
import { type Todo } from "@/types/todo";
import TodoItem from "./TodoItem.vue";

const props = withDefaults(
  defineProps<{
    todos?: Todo[];
  }>(),
  {
    todos: () => [],
  }
);
</script>

<template>
  <div class="todos">
    <ul class="todos__list">
      <li v-for="todo in todos" :key="todo.id">
        <TodoItem
          :id="todo.id"
          :completed="todo.completed"
          :title="todo.title"
          :user-id="todo.userId"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.todos {
  &__list {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    color: #000;
    height: 100%;
    max-height: 600px;
    overflow: auto;
  }
}
</style>
