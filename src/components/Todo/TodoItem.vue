<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import FavoriteIcon from "@/assets/svg/favorite.svg";

const props = withDefaults(
  defineProps<{
    id: number;
    title: string;
    completed: boolean;
    userId: number | null;
    favorite?: boolean;
  }>(),
  {
    id: 0,
    title: "",
    completed: false,
    userId: null,
    favorite: false,
  }
);

const emit = defineEmits<{
  (e: "add", id: number): void;
}>();

const getFavorites = (): number[] => {
  const data = localStorage.getItem("favorite");
  if (!data) return [];
  try {
    return JSON.parse(data) as number[];
  } catch {
    return [];
  }
};

const setFavorites = (ids: number[]): void => {
  localStorage.setItem("favorite", JSON.stringify(ids));
};

const fields = computed(() => [
  { label: "ID", value: props.id },
  { label: "Completed", value: props.completed },
  { label: "UserID", value: props.userId },
  { label: "Title", value: props.title },
]);

const addToFavorite = (): void => {
  const ids = new Set<number>(getFavorites());
  props.favorite ? ids.delete(props.id) : ids.add(props.id);
  setFavorites([...ids]);
  emit("add", props.id);
};
</script>

<template>
  <div class="todo-item">
    <button
      class="todo-item__favorite"
      :class="{ '--active': favorite }"
      @click="addToFavorite"
    >
      <FavoriteIcon />
    </button>
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
  position: relative;
  font-size: 14px;

  @media (max-width: 767px) {
    font-size: 16px;
  }

  &__row {
    display: flex;
    gap: 8px;
  }

  &__label {
    font-weight: 500;
  }

  &__favorite {
    position: absolute;
    right: 0;
    top: 2px;
    width: 16px;
    height: 16px;
    margin-left: auto;

    @media (max-width: 767px) {
      right: 24px;
      width: 20px;
      height: 20px;
    }

    &.--active {
      svg path {
        fill: rgb(239, 114, 135);
      }
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
