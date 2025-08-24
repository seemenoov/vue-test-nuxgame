<script setup lang="ts">
import { ref, onMounted, computed, watch, reactive } from "vue";
import { useFetch } from "@/composables/useFetch";
import { useRoute, useRouter } from "vue-router";
import { type User } from "@/types/user";
import { type Todo } from "@/types/todo";
import BaseInput from "@/components/Base/BaseInput.vue";
import BaseButton from "@/components/Base/BaseButton.vue";
import BaseModal from "@/components/Base/BaseModal.vue";

import TodoList from "@/components/Todo/TodoList.vue";

type Status = "all" | "completed" | "uncompleted" | "favorites";
type SelectedUser = "all" | number;

const route = useRoute();

const id: number = +route.query?.id!;

const { data: users, fetchData: getUsers } = useFetch<User[]>();
const { data: todos, fetchData: getTodos } = useFetch<Todo[]>();
const { data: response, fetchData: postTodo } = useFetch<any>();

const search = ref<string>("");
const selectedStatus = ref<Status>("all");
const selectedUser = ref<SelectedUser>("all");
const showModal = ref<boolean>(false);
const todo = reactive({
  title: "",
  userId: "",
});

const statusList: Status[] = ["all", "completed", "uncompleted", "favorites"];

onMounted(async () => {
  await Promise.all([getUsers("/users"), getTodos("/todos")]);
});

const formatAddress = (user: User): string =>
  `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;

const targetUser = computed<User | null>(
  () => (users.value ?? []).find((user) => user.id === id) ?? null
);

const allUsers = computed<number[] | []>(() => {
  const ids = [...new Set(todos.value?.map((todo) => todo.userId))];

  return ids;
});

const list = computed<Todo[]>(() => {
  switch (selectedStatus.value) {
    case "completed":
      return todos.value?.filter((todo) => todo.completed);
    case "uncompleted":
      return todos.value?.filter((todo) => !todo.completed);
    case "favorites":
      return todos.value?.filter((todo) => !todo.completed);

    default:
      return todos.value;
  }
});

const filteredTodos = computed<Todo[] | []>(() => {
  if (!list.value?.length) return [];

  let filteredArr = list.value;

  if (selectedUser.value !== "all") {
    const uid = +selectedUser.value;
    filteredArr = list.value.filter((t) => t.userId === uid);
  }

  const query = search.value?.trim().toLowerCase();

  if (query.length < 2) return filteredArr;

  return filteredArr.filter((todo) =>
    todo?.title.toLowerCase().includes(query)
  );
});

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

const createTodo = async (title: string, userId: string): Promise<void> => {
  try {
    await postTodo("/todos", {
      method: "POST",
      body: JSON.stringify({ userId, title }),
    });

    if (response.value?.id) {
      const data: Todo = {
        id: todos.value?.length + 1,
        completed: false,
        title,
        userId: +userId,
      };

      todos.value?.push(data);
    }
  } catch (e) {
    console.log(e);
  } finally {
    closeModal();
  }
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<template>
  <div class="info-page">
    <div class="container">
      <div class="info-page__content">
        <div class="info-page__section">
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
        <div class="info-page__section">
          <div class="info-page__filter">
            <select v-model="selectedStatus">
              <option
                :value="option"
                v-for="(option, i) in statusList"
                :key="i"
              >
                {{ option }}
              </option>
            </select>
            <select v-model="selectedUser">
              <option value="all">All Users</option>
              <option :value="user" v-for="(user, i) in allUsers" :key="i">
                {{ user }}
              </option>
            </select>
            <BaseButton
              @click="showModal = !showModal"
              class="info-page__create"
            >
              Create ToDo
            </BaseButton>
          </div>
          <div class="info-page__search">
            <BaseInput
              class="info-page__input"
              v-model="search"
              type="search"
              placeholder="Search title"
            />
          </div>
          <div class="info-pages-todos" v-if="filteredTodos?.length">
            <TodoList :todos="filteredTodos" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <BaseModal :show="showModal" @close="closeModal">
    <form
      @submit.prevent="createTodo(todo.title, todo.userId)"
      class="modal-form"
    >
      <h2>Create ToDo</h2>
      <BaseInput required v-model="todo.title" placeholder="Title"></BaseInput>
      <BaseInput
        :filter="/\D+/g"
        required
        v-model="todo.userId"
        placeholder="UserId"
      ></BaseInput>
      <BaseButton full-width type="submit"> Submit </BaseButton>
    </form>
  </BaseModal>
</template>

<style lang="scss">
.info-page {
  &__content {
    max-width: 750px;
    width: 100%;

    margin: 0 auto;
  }

  &__section {
    border-radius: 5px;
    background: #fff;
    padding: 16px;
    color: #000;

    & + & {
      margin-top: 12px;
    }
  }

  &-profile {
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

  &__filter {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 16px;

    select {
      flex: 1 1 25%;
      appearance: none;
      border: none;
      border: 1px solid grey;
      border-radius: 5px;
      padding: 14px 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      background-color: #fff;
      background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
    }

    .button {
      flex: 1 1 33%;
    }
  }

  &__search {
    margin-bottom: 16px;
  }

  &__input {
    padding: 10px 14px;
    font-size: 14px;
    border: 1px solid grey;
  }
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 12px;

  h2 {
    margin-bottom: 8px;
  }

  .input {
    border-color: grey;
  }
}
</style>
