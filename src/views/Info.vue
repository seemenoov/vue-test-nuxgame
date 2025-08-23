<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFetch } from "@/composables/useFetch";
import { useRouter } from "vue-router";

const router = useRouter();

const { data, fetchData } = useFetch<any[]>();
</script>

<template>
  <div class="info-page">
    <div class="container">INFO</div>
  </div>
</template>

<style lang="scss"></style>
