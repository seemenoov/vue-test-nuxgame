<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: string | number | null;
    placeholder?: string;
    type?: string;
    required?: boolean;
    filter?: RegExp | null;
  }>(),
  {
    text: "",
    placeholder: "",
    type: "text",
    required: false,
    filter: null,
  }
);
const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | null): void;
}>();

const updateValue = (e: Event) => {
  const el = e.target as HTMLInputElement;
  const raw = el.value;
  const cleaned = props.filter ? raw.replace(props.filter, "") : raw;
  if (cleaned !== raw) el.value = cleaned;
  emit("update:modelValue", cleaned);
};
</script>

<template>
  <input
    class="input"
    :type="type"
    :required="required"
    :placeholder="placeholder"
    :value="props.modelValue"
    @input="updateValue"
  />
</template>

<style lang="scss">
.input {
  padding: 12px 8px;
  width: 100%;
  background-color: #fff;
  color: #353535;
  border: 1px solid transparent;
  border-radius: 5px;
  font-size: 17px;
  transition: 0.3s border-color linear;

  &:focus {
    border-color: #519945;
  }
}
</style>
