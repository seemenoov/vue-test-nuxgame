<script setup lang="ts">
import { computed, ref, onMounted } from "vue";

import { type Todo } from "@/types/todo";
import TodoItem from "./TodoItem.vue";

withDefaults(
  defineProps<{
    todos?: Todo[];
  }>(),
  {
    todos: () => [],
  }
);

const favoritesItems = ref<number[]>([]);

onMounted(() => {
  try {
    const items = JSON.parse(
      localStorage.getItem("favorite") ?? "[]"
    ) as number[];
    if (Array.isArray(items)) {
      favoritesItems.value = items as number[];
    }
  } catch (e) {
    console.log(e);
  }
});

const isFavorite = (id: number): boolean => {
  return favoritesItems.value.includes(id);
};

const toggleFavorite = (id: number): void => {
  favoritesItems.value = isFavorite(id)
    ? favoritesItems.value.filter((el) => el !== id)
    : [...favoritesItems.value, id];
};
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
          :favorite="isFavorite(todo.id)"
          @add="toggleFavorite"
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

    @media (max-width: 767px) {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
}
</style>
