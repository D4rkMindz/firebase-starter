<template>
  <div class="h-full w-full text-center">
    <h2>{{ $t('Profile') }}</h2>
  </div>
</template>

<script setup>
const {t} = useI18n();

useHead({
  title: t('Profile'),
});
</script>