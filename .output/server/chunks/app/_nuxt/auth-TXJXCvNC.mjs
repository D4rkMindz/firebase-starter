import { mergeProps, unref, useSSRContext, openBlock, createElementBlock, createElementVNode } from 'vue';
import { b as useLocalePath } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent } from 'vue/server-renderer';
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
import 'vuefire';
import 'firebase-admin/auth';
import './nuxt-link-an_5vACD.mjs';

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
      d: "M19.253 2.292a.75.75 0 0 1 .955.461A28.123 28.123 0 0 1 21.75 12c0 3.266-.547 6.388-1.542 9.247a.75.75 0 1 1-1.416-.494c.94-2.7 1.458-5.654 1.458-8.753s-.519-6.054-1.458-8.754a.75.75 0 0 1 .461-.954Zm-14.227.013a.75.75 0 0 1 .414.976A23.183 23.183 0 0 0 3.75 12c0 3.085.6 6.027 1.69 8.718a.75.75 0 0 1-1.39.563c-1.161-2.867-1.8-6-1.8-9.281 0-3.28.639-6.414 1.8-9.281a.75.75 0 0 1 .976-.414Zm4.275 5.052a1.5 1.5 0 0 1 2.21.803l.716 2.148L13.6 8.246a2.438 2.438 0 0 1 2.978-.892l.213.09a.75.75 0 1 1-.584 1.381l-.214-.09a.937.937 0 0 0-1.145.343l-2.021 3.033 1.084 3.255 1.445-.89a.75.75 0 1 1 .786 1.278l-1.444.889a1.5 1.5 0 0 1-2.21-.803l-.716-2.148-1.374 2.062a2.437 2.437 0 0 1-2.978.892l-.213-.09a.75.75 0 0 1 .584-1.381l.214.09a.938.938 0 0 0 1.145-.344l2.021-3.032-1.084-3.255-1.445.89a.75.75 0 1 1-.786-1.278l1.444-.89Z",
      "clip-rule": "evenodd"
    })
  ]);
}
const _sfc_main = {
  __name: "auth",
  __ssrInlineRender: true,
  setup(__props) {
    useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "background bg-base-200 text-base-content min-h-screen flex flex-col" }, _attrs))} data-v-d5b167bb><main class="flex-1 p-5 md:flex md:justify-center md:align-center" data-v-d5b167bb><div class="screen-half" data-v-d5b167bb>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main><footer class="footer p-4 bg-transparent/25 text-neutral-content" data-v-d5b167bb><aside class="items-center grid-flow-col" data-v-d5b167bb>`);
      _push(ssrRenderComponent(unref(render), null, null, _parent));
      _push(`<p data-v-d5b167bb>Copyright \xA9 2023 - All right reserved</p></aside><nav class="w-full grid-flow-col gap-4 justify-end md:place-self-center md:justify-self-end" data-v-d5b167bb>`);
      _push(ssrRenderComponent(SwitchLanguage, { "drop-up": "" }, null, _parent));
      _push(ssrRenderComponent(SwitchTheme, null, null, _parent));
      _push(`</nav></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/auth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const auth = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d5b167bb"]]);

export { auth as default };
//# sourceMappingURL=auth-TXJXCvNC.mjs.map
