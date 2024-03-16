<template>
    <div class="form-control w-full mb-2">
        <label v-if="label" :for="id" class="label">
            <span class="label-text">{{ label }}</span>
        </label>

        <Field :name="id">
            <input
                :id="id"
                :type="type"
                :value="modelValue"
                class="input input-bordered w-full"
                v-bind="$attrs"
                @input.prevent="(e) => updateInput(e)"
            />
        </Field>

        <ErrorMessage :name="id" class="text-error text-xs mt-2 mb-2" />
    </div>
</template>

<script>
import { ErrorMessage, Field } from 'vee-validate';

export default {
    name: 'BaseInput',
    components: {
        Field,
        ErrorMessage,
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
        type: {
            type: String,
            default: 'text',
        },
    },
    emits: ['update:modelValue'],
    watch: {
        modelValue(value) {
            console.log('[Baseinput] watcher:', value);
        },
    },
    methods: {
        updateInput(event) {
            console.log('[Baseinput] updateInput: ', event);
            this.$emit('update:modelValue', event.target.value);
        },
    },
};
</script>
