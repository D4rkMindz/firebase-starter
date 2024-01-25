<template>
  <p>{{ $t('Logging you out') }}...</p>
</template>

<script setup lang="ts">
const {t} = useI18n();

const auth = useFirebaseAuth();
auth?.signOut();

useHead({
  title: t('Logout'),
});
</script>