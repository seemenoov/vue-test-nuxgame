<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useFetch } from "@/composables/useFetch";
import { useRoute, useRouter } from "vue-router";
import { type User } from "@/types/user";

const router = useRouter();
const route = useRoute();

const id: number = +route.query.id;

const { data: users, fetchData } = useFetch<User[]>();

onMounted(async () => {
  await fetchData("/users");
});

const formatAddress = (user: User): string =>
  `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;

const targetUser = computed<User | null>(
  () => (users.value ?? []).find((user) => user.id === id) ?? null
);

const profileItems = computed(() => {
  const user = targetUser.value;
  if (!user) return [];
  return [
    { label: "Full name", value: user.name },
    { label: "Email address", value: user.email },
    { label: "Phone number", value: user.phone },
    { label: "Address", value: formatAddress(user) },
  ];
});
</script>

<template>
  <div class="info-page">
    <div class="container">
      <div class="info-page__content">
        <div class="info-page-profile" v-if="targetUser">
          <div class="info-page-profile__headline">
            <h2 class="info-page-profile__title">User Profile</h2>
            <p class="info-page-profile__text">
              This is some information about the user.
            </p>
          </div>
          <ul class="info-page-profile__list">
            <li
              class="info-page-profile__item"
              v-for="(item, index) in profileItems"
              :key="index"
            >
              <div class="info-page-profile__label">{{ item.label }}:</div>
              <div class="info-page-profile__value">{{ item.value }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.info-page {
  &__content {
    max-width: 650px;
    width: 100%;

    margin: 0 auto;

    background: #fff;
    border-radius: 5px;
    padding: 16px;
  }

  &-profile {
    color: #000;

    &__headline {
      margin-bottom: 16px;
    }

    &__title {
      font-size: 20px;
      line-height: 1.5;
    }

    &__text {
      font-size: 14px;
    }

    &__item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
    }

    &__label {
      font-weight: 500;
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
  }
}
</style>
