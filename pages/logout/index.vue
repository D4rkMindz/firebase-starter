<template>
    <p>{{ $t('Logging you out') }}...</p>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const auth = useFirebaseAuth();
auth?.signOut();

useHead({
    title: t('Logout'),
});
</script>
