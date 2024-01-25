import { a as useI18n, u as useHead } from '../server.mjs';
import { useFirebaseAuth } from 'vuefire';
import { defineComponent, useSSRContext } from 'vue';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const auth = useFirebaseAuth();
    auth == null ? void 0 : auth.signOut();
    useHead({
      title: t("Logout")
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${ssrRenderAttrs(_attrs)}>${ssrInterpolate(_ctx.$t("Logging you out"))}...</p>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/logout/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-mV-AJEo_.mjs.map