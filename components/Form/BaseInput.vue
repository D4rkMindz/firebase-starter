<template>
  <div class="form-control w-full mb-2">
    <label v-if="label" class="label" :for="id">
      <span class="label-text">{{ label }}</span>
    </label>

    <Field :name="id"
           :type="type"
           class="input input-bordered w-full"
           :value="modelValue"
           @input.prevent.stop="updateInput"
           v-bind="$attrs"
    />

    <ErrorMessage :name="id" class="text-error text-xs mt-2 mb-2"/>
  </div>
</template>

<script>
import {Field, ErrorMessage} from "vee-validate";

export default {
  name: "BaseInput",
  components: {
    Field,
    ErrorMessage,
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
    type: {
      type: String,
      default: "text",
    }
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  }
};
</script>