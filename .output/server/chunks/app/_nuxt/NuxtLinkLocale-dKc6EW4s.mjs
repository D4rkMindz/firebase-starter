import { getCurrentUser as getCurrentUser$1 } from 'vuefire';
import { b as useLocalePath, h as hasProtocol, e as useNuxtApp } from '../server.mjs';
import { d as defineNuxtLink } from './nuxt-link-an_5vACD.mjs';
import { defineComponent, computed, h } from 'vue';

const useFirebaseApp = () => useNuxtApp().$firebaseApp;
const getCurrentUser = (name) => (
  // This makes the `getCurrentUser()` function work by default in more places when using the Nuxt module
  getCurrentUser$1(name != null ? name : useFirebaseApp().name)
);
const NuxtLinkLocale = defineNuxtLink({ componentName: "NuxtLinkLocale" });
const __nuxt_component_2 = defineComponent({
  name: "NuxtLinkLocale",
  props: {
    ...NuxtLinkLocale.props,
    locale: {
      type: String,
      default: void 0,
      required: false
    }
  },
  setup(props, { slots }) {
    const localePath = useLocalePath();
    const resolvedPath = computed(() => props.to != null ? localePath(props.to, props.locale) : props.to);
    const isExternal = computed(() => {
      if (props.external) {
        return true;
      }
      if (props.target && props.target !== "_self") {
        return true;
      }
      if (typeof props.to === "object") {
        return false;
      }
      return props.to === "" || props.to == null || hasProtocol(props.to, { acceptRelative: true });
    });
    const getNuxtLinkProps = () => {
      const _props = {
        ...props
      };
      if (!isExternal.value) {
        _props.to = resolvedPath.value;
      }
      delete _props.locale;
      return _props;
    };
    return () => h(NuxtLinkLocale, getNuxtLinkProps(), slots.default);
  }
});

export { __nuxt_component_2 as _, getCurrentUser as g };
//# sourceMappingURL=NuxtLinkLocale-dKc6EW4s.mjs.map
