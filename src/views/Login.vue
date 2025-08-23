<script setup lang="ts">
import { ref, onMounted } from "vue";
import BaseInput from "@/components/Base/BaseInput.vue";
import BaseButton from "@/components/Base/BaseButton.vue";
import { useFetch } from "@/composables/useFetch";
import { useRouter } from "vue-router";

const router = useRouter();

const { data, fetchData } = useFetch<any[]>();

const username = ref("Clementine Bauch");
const phone = ref("1-463-123-4447");
const error = ref("");

const login = async () => {
  error.value = "";
  if (!username.value.length && !phone.value.length) return;

  await fetchData("/users");

  const targetUser = data.value?.find((user) => {
    if (username.value === user?.name && phone.value === user?.phone) {
      return user;
    }
  });

  if (!targetUser) {
    error.value = "Login Invalid";
    setTimeout(() => {
      error.value = "";
    }, 5000);
    return;
  }

  router.push("/info");
};
</script>

<template>
  <div class="login-page">
    <div class="container">
      <div class="login-page__form">
        <div class="login-page__content">
          <div class="login-page__head">Description</div>
          <div class="login-page__data">
            <form @submit.prevent="login">
              <div class="login-page__label">description</div>
              <div class="login-page__field">
                <BaseInput
                  required
                  type="text"
                  placeholder="Username"
                  :filter="/[^A-Za-zА-Яа-яЁё\s]/g"
                  v-model="username"
                />
              </div>
              <div class="login-page__field">
                <BaseInput
                  required
                  type="tel"
                  placeholder="Phone Number"
                  :filter="/[^0-9+\-().\s]/g"
                  v-model="phone"
                />
              </div>
              <div class="login-page__field">
                <BaseButton full-width> Login </BaseButton>
              </div>
              <div v-if="error">{{ error }}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.login-page {
  &__form {
    max-width: 447px;
    width: 100%;

    margin: 0 auto;
  }

  &__content {
    border-radius: 5px;
    overflow: hidden;
  }

  &__head {
    padding: 12px 0;

    font-size: 17px;
    line-height: 21px;
    text-align: center;
    background: #a5a5a5;
  }

  &__label {
    margin-bottom: 14px;
  }

  &__data {
    padding: 8px 16px;
    background: #c3c3c3;
  }

  &__field {
    & + & {
      margin-top: 14px;
    }
  }
}
</style>
