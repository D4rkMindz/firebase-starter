<template>
  <BaseInput :id="id"
             :label="label"
             type="password"
             :value="modelValue"
             @update:modelValue="(e) => $emit('update:modelValue', e)"
             v-bind="$attrs" />
</template>

<script>
import BaseInput from "~/components/Form/BaseInput.vue";

export default {
  name: "InputField",
  components: {
    BaseInput
  },
  props: {
    id: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
  },
}
</script>