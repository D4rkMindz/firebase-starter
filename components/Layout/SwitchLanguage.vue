<template>
  <div class="dropdown dropdown-end mr-2" :class="{'dropdown-top': dropUp }">
    <label tabindex="0" class="btn btn-ghost">
      <LanguageIcon class="icon"/>
      <span class="hidden lg:block">
        <ChevronDownIcon class="icon" v-if="!dropUp"/>
        <ChevronUpIcon class="icon" v-if="dropUp"/>
      </span>
    </label>
    <ul tabindex="0"
        class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 text-base-content rounded-box w-52">
      <li v-for="locale in locales" :key="locale.code">
        <NuxtLink :to="switchLocalePath(locale.code)">
          {{ locale.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {ChevronDownIcon, ChevronUpIcon, LanguageIcon} from "@heroicons/vue/24/solid";

const switchLocalePath = useSwitchLocalePath();
const {locales} = useI18n();

defineComponent({
  name: 'SwitchLanguage',
});
defineProps({
  dropUp: {
    type: Boolean,
    default: false,
  }
})
</script>

<style scoped>
.icon {
  @apply w-6 h-6 stroke-current;
}
</style>