<script setup lang="ts"></script>

<template>
  <main class="layout">
    <div class="layout__content">
      <Router-View />
    </div>
  </main>
</template>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  justify-content: center;

  &__content {
    width: 100%;
    padding: 24px 0;
  }
}
</style>
