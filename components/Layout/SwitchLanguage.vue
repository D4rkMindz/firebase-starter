<template>
    <div :class="{ 'dropdown-top': dropUp }" class="dropdown dropdown-end mr-2">
        <label class="btn btn-ghost" tabindex="0">
            <LanguageIcon class="icon" />
            <span class="hidden lg:block">
                <ChevronDownIcon v-if="!dropUp" class="icon" />
                <ChevronUpIcon v-if="dropUp" class="icon" />
            </span>
        </label>
        <ul
            class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 text-base-content"
            tabindex="0"
        >
            <li v-for="locale in locales" :key="locale.code">
                <NuxtLink :to="switchLocalePath(locale.code)">
                    {{ locale.name }}
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup>
import {
    ChevronDownIcon,
    ChevronUpIcon,
    LanguageIcon,
} from '@heroicons/vue/24/solid';

const switchLocalePath = useSwitchLocalePath();
const { locales } = useI18n();

defineComponent({
    name: 'SwitchLanguage',
});
defineProps({
    dropUp: {
        type: Boolean,
        default: false,
    },
});
</script>

<style scoped>
.icon {
    @apply w-6 h-6 stroke-current;
}
</style>
