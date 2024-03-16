<template>
    <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
    </NuxtLayout>
    <div :class="{ hidden: !loading }" class="loading-screen">
        <div class="center">
            <div class="loader"></div>
            <p class="h1">{{ $t('Getting ready') }}...</p>
        </div>
    </div>
</template>

<script setup>
const loading = ref(true);

const nuxtApp = useNuxtApp();

nuxtApp.hook('page:finish', () => {
    setTimeout(() => (loading.value = false), 200);
});
useHead({
    titleTemplate: (title) => {
        return title ? `${title} - Home` : 'Home';
    },
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [{ name: 'description', content: 'My home.' }],
});
</script>

<style lang="scss">
.loading-screen {
    @apply bg-primary-content fixed top-0 z-10 overflow-hidden h-screen w-screen grid;
    & > * {
        margin: auto;
    }

    &.hidden {
        visibility: hidden;
        opacity: 0;
        transition:
            visibility 0s 0.2s,
            opacity 0.2s linear;
    }
}

/* HTML: <div class="loader"></div> */
.loader {
    width: 80px;
    height: 70px;
    border: 5px solid #000;
    padding: 0 8px;
    box-sizing: border-box;
    background:
        linear-gradient(#fff 0 0) 0 0/8px 20px,
        linear-gradient(#fff 0 0) 100% 0/8px 20px,
        radial-gradient(farthest-side, #fff 90%, #0000) 0 5px/8px 8px content-box,
        #000;
    background-repeat: no-repeat;
    animation: l3 2s infinite linear;
}

@keyframes l3 {
    25% {
        background-position:
            0 0,
            100% 100%,
            100% calc(100% - 5px);
    }
    50% {
        background-position:
            0 100%,
            100% 100%,
            0 calc(100% - 5px);
    }
    75% {
        background-position:
            0 100%,
            100% 0,
            100% 5px;
    }
}
</style>
