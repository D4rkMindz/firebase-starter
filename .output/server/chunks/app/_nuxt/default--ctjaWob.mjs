import { defineComponent, ref, createElementBlock, useSSRContext, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createElementVNode } from 'vue';
import { _ as __nuxt_component_0$1 } from './nuxt-link-an_5vACD.mjs';
import { b as useLocalePath, f as useRouter, d as useRoute } from '../server.mjs';
import { useCurrentUser } from 'vuefire';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { S as SwitchLanguage, a as SwitchTheme } from './SwitchLanguage-Y9Qvlgwl.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-yVxbj29m.mjs';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'firebase/firestore';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'vuefire/server';
import 'firebase/app';
import 'consola/core';
import '@posva/lru-cache';
import 'firebase/auth';
import 'firebase-admin/auth';

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
      d: "M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z",
      "clip-rule": "evenodd"
    })
  ]);
}
const __nuxt_component_0 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  // eslint-disable-next-line vue/require-prop-types
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const localePath = useLocalePath();
    useRouter();
    useRoute();
    useCurrentUser();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-base-200 text-base-content" }, _attrs))} data-v-de1d3832><div class="drawer" data-v-de1d3832><input id="sidebar" type="checkbox" class="drawer-toggle" data-v-de1d3832><div class="drawer-content flex flex-col min-h-screen w-full" data-v-de1d3832><header class="flex-none navbar bg-transparent sticky top-0" data-v-de1d3832><div class="flex-none" data-v-de1d3832><label for="sidebar" class="btn btn-square btn-ghost" data-v-de1d3832>`);
      _push(ssrRenderComponent(unref(render), { class: "inline-block icon" }, null, _parent));
      _push(`</label></div><div class="flex-1 normal-case text-xl" data-v-de1d3832></div><div class="flex-none" data-v-de1d3832>`);
      _push(ssrRenderComponent(SwitchLanguage, null, null, _parent));
      _push(ssrRenderComponent(SwitchTheme, null, null, _parent));
      _push(`<div class="dropdown dropdown-end" data-v-de1d3832><label tabindex="0" class="btn btn-ghost btn-circle avatar" data-v-de1d3832><div class="w-10 rounded-full" data-v-de1d3832>`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`</div></label><ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 text-base-content rounded-box w-52" data-v-de1d3832><li data-v-de1d3832>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/user/profile")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("Profile"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("Profile")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-de1d3832>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/logout")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("Logout"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("Logout")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div></div></header><main class="flex-1 overflow-y-auto p-5" data-v-de1d3832>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div><div class="drawer-side" data-v-de1d3832><label for="sidebar" class="drawer-overlay" data-v-de1d3832></label><ul class="menu p-4 overflow-y-auto w-80 bg-base-200" data-v-de1d3832><div class="logo-header" data-v-de1d3832>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/"),
        "aria-current": "page",
        "aria-label": "Homepage",
        class: "flex-0 btn btn-ghost px-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl" data-v-de1d3832${_scopeId}><span class="lowercase" data-v-de1d3832${_scopeId}>Cevi</span> <span class="text-base-content uppercase" data-v-de1d3832${_scopeId}>E</span></div>`);
          } else {
            return [
              createVNode("div", { class: "font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl" }, [
                createVNode("span", { class: "lowercase" }, "Cevi"),
                createTextVNode(),
                createVNode("span", { class: "text-base-content uppercase" }, "E")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/docs/changelog"),
        class: "link link-hover font-mono text-xs text-opacity-50"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-tip="Changelog" class="tooltip tooltip-bottom" data-v-de1d3832${_scopeId}>1.0.1</div>`);
          } else {
            return [
              createVNode("div", {
                "data-tip": "Changelog",
                class: "tooltip tooltip-bottom"
              }, "1.0.1")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="h-4" data-v-de1d3832></div><li data-v-de1d3832><a data-set-theme="dark" data-v-de1d3832>${ssrInterpolate(_ctx.$t("Dark"))}</a></li><li data-v-de1d3832><a data-set-theme="light" data-v-de1d3832>${ssrInterpolate(_ctx.$t("Light"))}</a></li><li data-v-de1d3832><a data-set-theme="cyberpunk" data-v-de1d3832>${ssrInterpolate(_ctx.$t("Cyberpunk"))}</a></li></ul></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-de1d3832"]]);

export { _default as default };
//# sourceMappingURL=default--ctjaWob.mjs.map
