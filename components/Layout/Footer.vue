<template>
  <footer class="footer p-4 bg-transparent/25 text-neutral-content">
    <aside class="items-center grid-flow-col h-full">
      <variable-icon class="h-6 w-6"/>
      <p>Copyright © {{ new Date().getFullYear()}} - All right reserved</p>
    </aside>
    <nav class="w-full grid-flow-col gap-4 justify-end md:place-self-center md:justify-self-end">
      <SwitchLanguage drop-up/>

      <SwitchTheme/>
    </nav>
  </footer>
</template>

<script setup lang="ts">
import {VariableIcon} from "@heroicons/vue/24/solid";
import SwitchLanguage from "~/components/Layout/SwitchLanguage.vue";
import SwitchTheme from "~/components/Layout/SwitchTheme.vue";
</script>