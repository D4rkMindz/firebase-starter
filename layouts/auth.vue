<template>
  <div class="background bg-base-200 text-base-content min-h-screen flex flex-col">

    <main class="flex-1 p-5 md:flex md:justify-center md:align-center">
      <div class="screen-half">
        <slot/>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Footer from '~/components/Layout/Footer.vue';
import {themeChange} from 'theme-change'

onMounted(function () {
  themeChange(false);
})
const localePath = useLocalePath();
</script>

<style>
html, body {
  min-height: 100vh;
}
</style>
<style scoped>
p {
  white-space: pre-wrap;
}

[data-theme=light] .background {
  background-color: #738bdc;
  background-image: linear-gradient(315deg, #738bdc 0%, #48c3eb 74%);
}

@media screen(md) {
  .screen-half {
    @apply h-fit m-auto;
    width: 80dvw;
  }
}
@media screen(lg) {
  .screen-half {
    width: 60dvw;
  }
}
@media screen(xl) {
  .screen-half {
    width: 40dvw;
  }
}
@media screen("2xl") {
  .screen-half {
    width: 25dvw;
  }
}


.icon {
  @apply w-6 h-6 stroke-current;
}

.logo-header {
  @apply z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 py-2 hidden lg:flex;
}
</style>