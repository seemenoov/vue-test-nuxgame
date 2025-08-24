<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    id: number | null;
    title: string;
    completed: boolean;
    userId: number | null;
  }>(),
  {
    id: null,
    title: "",
    completed: false,
    userId: null,
  }
);

const fields = computed(() => [
  { label: "ID", value: props.id },
  { label: "Completed", value: props.completed },
  { label: "UserID", value: props.userId },
  { label: "Title", value: props.title },
]);
</script>

<template>
  <div class="todo-item">
    <div
      class="todo-item__row"
      v-for="({ label, value }, index) in fields"
      :key="index"
    >
      <div class="todo-item__label">{{ label }}:</div>
      <div class="todo-item__value">{{ value }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.todo-item {
  font-size: 14px;
  &__row {
    display: flex;
    gap: 8px;
  }

  &__label {
    font-weight: 500;
  }
}
</style>
