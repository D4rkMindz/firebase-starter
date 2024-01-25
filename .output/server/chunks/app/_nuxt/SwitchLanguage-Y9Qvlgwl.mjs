import { resolveComponent, useSSRContext, defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, openBlock, createElementBlock, createElementVNode } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-yVxbj29m.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-an_5vACD.mjs';
import { g as useSwitchLocalePath, a as useI18n } from '../server.mjs';

function render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    createElementVNode("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
    })
  ]);
}
function render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    createElementVNode("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    })
  ]);
}
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M9 2.25a.75.75 0 0 1 .75.75v1.506a49.384 49.384 0 0 1 5.343.371.75.75 0 1 1-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 0 1-2.97 6.323c.318.384.65.753 1 1.107a.75.75 0 0 1-1.07 1.052A18.902 18.902 0 0 1 9 13.687a18.823 18.823 0 0 1-5.656 4.482.75.75 0 0 1-.688-1.333 17.323 17.323 0 0 0 5.396-4.353A18.72 18.72 0 0 1 5.89 8.598a.75.75 0 0 1 1.388-.568A17.21 17.21 0 0 0 9 11.224a17.168 17.168 0 0 0 2.391-5.165 48.04 48.04 0 0 0-8.298.307.75.75 0 0 1-.186-1.489 49.159 49.159 0 0 1 5.343-.371V3A.75.75 0 0 1 9 2.25ZM15.75 9a.75.75 0 0 1 .68.433l5.25 11.25a.75.75 0 1 1-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 0 1-1.36-.634l5.25-11.25A.75.75 0 0 1 15.75 9Zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726Z",
      "clip-rule": "evenodd"
    })
  ]);
}
const _sfc_main$1 = {
  name: "SwitchTheme",
  components: {
    SunIcon: render$2,
    MoonIcon: render$3
  },
  data() {
    return {
      selectedTheme: "dark",
      observer: null
    };
  },
  mounted() {
    const target = (void 0).documentElement;
    this.observer = new MutationObserver(() => {
      const selectedTheme = target.getAttribute("data-theme");
      switch (selectedTheme) {
        case "dark":
          this.selectedTheme = "dark";
          break;
        case "light":
          this.selectedTheme = "light";
          break;
        default:
          this.selectedTheme = "dark";
      }
    });
    this.observer.observe(target, {
      attributes: true
    });
  },
  unmounted() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_SunIcon = resolveComponent("SunIcon");
  const _component_MoonIcon = resolveComponent("MoonIcon");
  _push(`<div${ssrRenderAttrs(_attrs)}><label class="btn btn-ghost swap swap-rotate mr-5"><input type="checkbox" data-toggle-theme="light,dark"${ssrIncludeBooleanAttr($data.selectedTheme === "light") ? " checked" : ""}>`);
  _push(ssrRenderComponent(_component_SunIcon, { class: "swap-on fill-current w-6 h-6" }, null, _parent));
  _push(ssrRenderComponent(_component_MoonIcon, { class: "swap-off fill-current w-6 h-6" }, null, _parent));
  _push(`</label></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/SwitchTheme.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SwitchTheme = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "SwitchLanguage",
  __ssrInlineRender: true,
  props: {
    dropUp: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const switchLocalePath = useSwitchLocalePath();
    const { locales } = useI18n();
    defineComponent({
      name: "SwitchLanguage"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["dropdown dropdown-end mr-2", { "dropdown-top": __props.dropUp }]
      }, _attrs))} data-v-fbf7d542><label tabindex="0" class="btn btn-ghost" data-v-fbf7d542>`);
      _push(ssrRenderComponent(unref(render), { class: "icon" }, null, _parent));
      _push(`<span class="hidden lg:block" data-v-fbf7d542>`);
      _push(ssrRenderComponent(unref(render$1), { class: "icon" }, null, _parent));
      _push(`</span></label><ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 text-base-content rounded-box w-52" data-v-fbf7d542><!--[-->`);
      ssrRenderList(unref(locales), (locale) => {
        _push(`<li data-v-fbf7d542>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(switchLocalePath)(locale.code)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(locale.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(locale.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/SwitchLanguage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SwitchLanguage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fbf7d542"]]);

export { SwitchLanguage as S, SwitchTheme as a };
//# sourceMappingURL=SwitchLanguage-Y9Qvlgwl.mjs.map
