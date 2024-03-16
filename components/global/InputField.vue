<template>
    <BaseInput
        :id="id"
        :label="label"
        :value="modelValue"
        type="input"
        v-bind="$attrs"
        @update:model-value="(e) => $emit('update:modelValue', e)"
    />
</template>

<script>
import BaseInput from '~/components/Form/BaseInput.vue';

export default {
    name: 'InputField',
    components: {
        BaseInput,
    },
    props: {
        id: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        modelValue: {
            type: [String, Number],
            default: '',
        },
    },
    emits: ['update:modelValue'],
};
</script>
