<template>
  <div>
    <label class="btn btn-ghost swap swap-rotate mr-5">
      <input type="checkbox" data-toggle-theme="light,dark" :checked="selectedTheme === 'light'"/>

      <SunIcon class="swap-on fill-current w-6 h-6"/>
      <MoonIcon class="swap-off fill-current w-6 h-6"/>
    </label>
  </div>
</template>

<script>
import {SunIcon, MoonIcon} from "@heroicons/vue/24/outline";

export default {
  name: "SwitchTheme",
  components: {
    SunIcon,
    MoonIcon,
  },
  data() {
    return {
      selectedTheme: "dark",
      observer: null,
    }
  },
  mounted() {
    const target = document.documentElement;
    this.observer = new MutationObserver(() => {
      const selectedTheme = target.getAttribute('data-theme');
      switch (selectedTheme) {
        case 'dark':
          this.selectedTheme = 'dark';
          break;
        case 'light':
          this.selectedTheme = 'light';
          break;
        default:
          this.selectedTheme = 'dark';
      }
    });
    this.observer.observe(target, {
      attributes: true,
    });
  },
  unmounted() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
</script>

<style scoped>

</style>