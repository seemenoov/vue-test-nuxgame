<script setup lang="ts">
const props = defineProps({
  fullWidth: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button class="button" :class="{ '--full-width': fullWidth }">
    <slot></slot>
  </button>
</template>

<style lang="scss">
.button {
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 24px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  gap: 8px;
  white-space: nowrap;
  background-color: #519945;
  color: #fff;
  font-size: 17px;
  font-weight: 600;
  transition: filter 0.3s ease;

  &.--full-width {
    width: 100%;
  }

  @media (hover: hover) {
    &:hover:enabled {
      filter: brightness(0.9);
    }
  }
}
</style>
