import { a as useI18n, u as useHead } from '../server.mjs';
import { useCurrentUser } from 'vuefire';
import { unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useHead({
      title: t("Home")
    });
    const user = useCurrentUser();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(user)) {
        _push(`<p${ssrRenderAttrs(_attrs)}>Hello ${ssrInterpolate(unref(user).displayName)}</p>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Ex_Ma53v.mjs.map
