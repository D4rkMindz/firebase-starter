<template>
  <p v-if="user">Hello {{ user.displayName }}</p>
</template>

<script setup>
const {t} = useI18n();

useHead({
  title: t('Home'),
});
const user = useCurrentUser();
</script>